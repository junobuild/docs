---
description: Learn how to integrate Passkeys (WebAuthn) authentication with Juno for secure, passwordless user identification.
keywords: [passkeys, webauthn, passwordless authentication, sign in, sign up]
---

# Passkeys

Passkeys let your users authenticate without passwords - using their device's built-in security features such as Face ID, Touch ID, or device unlock.

They are built on WebAuthn, providing strong cryptographic security while offering a frictionless, Web2-like user experience.

When users sign in with a passkey, their private key never leaves the device. Your Satellite uses only a cryptographic signature to confirm their identity, ensuring authentication is secure and privacy-preserving by default.

---

## How It Works

1. When a user signs up, your project creates a passkey on their device that's tied to your domain.
2. The passkey is stored securely by the device or its manager (e.g. iCloud Keychain, Google Password Manager).
3. On sign-in, the user proves ownership of the passkey by signing twice with their device's authenticator.
4. The identity is verified on the frontend through these signatures, and the resulting public key (the user's identity) is stored in your Satellite.
5. Whenever the user interacts with your app, the Satellite checks that the caller's public key matches the stored one, ensuring the request comes from the legitimate user.

:::note

Passkeys are **domain-scoped**: a passkey created on `hello.com` will work on its subdomains (like `www.hello.com`), but not on different domains (like `world.com`).

You can change this behavior during setup if you want to use a higher-level domain as the passkey origin, but not a completely different one.

:::

---

## Sign-up

With Passkeys, your users need to sign up to create an identity that grants them access to your application.

During this process, the user will be asked to use their authenticator twice: once to generate the passkey, and once more to sign their new identity which is then used to interact securely with your satellite.

```typescript
import { signUp } from "@junobuild/core";

await signUp({
  webauthn: {}
});
```

:::note

Returning users don't need to go through sign-up again. They can simply use [sign-in](#passkeys-1) with their existing passkey to authenticate.

:::

### Options

Passkey sign-up can be customized with a handful of options. These let you control how long a session lasts, how the passkey is displayed to the user, and whether you want to track progress in your own UI.

| Option                        | Type                   | Default     | Description                                                                                                                                                  |
| ----------------------------- | ---------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `maxTimeToLiveInMilliseconds` | `number`               | **4 hours** | Maximum lifetime of the user's session in **milliseconds**. Once expired, the session cannot be extended.                                                    |
| `onProgress`                  | `(progress) => void`   |             | Callback fired at each step of the sign-up flow (e.g., creating credential, validating, signing). Useful if you want to show progress indicators in your UI. |
| `passkey`                     | `CreatePasskeyOptions` |             | Options for how the passkey should be created.                                                                                                               |

The `passkey` option accepts the following fields:

| Option             | Type     | Default                | Description                                                                                                      |
| ------------------ | -------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `appId.id`         | `string` | Current URL `hostname` | Domain your passkeys are tied to (e.g., `example.com` or `login.example.com`). Subdomains are supported.         |
| `user.displayName` | `string` | `document.title`       | Friendly name for the account (e.g., `"Maria Sanchez"`). Helps the user recognize which passkey belongs to them. |
| `user.name`        | `string` | `displayName`          | User-recognizable account identifier (e.g., email, username, or phone number). Distinguishes between accounts.   |

Example with options:

```typescript
import { signUp } from "@junobuild/core";

await signUp({
  webauthn: {
    options: {
      maxTimeToLiveInMilliseconds: 1000 * 60 * 60, // 1 hour
      onProgress: ({ step, state }) => {
        console.log("Step:", step, "State:", state);
      },
      passkey: {
        displayName: "My Cool App" // or user input
      }
    }
  }
});
```

:::tip

It's common to let the user choose a nickname during sign-up.

This nickname can be passed as the `displayName` in the `passkey` option so the passkey is easy to recognize the next time they sign in (e.g. in iCloud Keychain or Google Password Manager).

:::

---

## Sign-in

Returning users sign in using the digital key previously created on their device — for example in the browser, iCloud Keychain, Google Password Manager, etc.

The user will be asked to use their authenticator to prove possession of the passkey and re-establish a valid session with your satellite.

```typescript
import { signIn } from "@junobuild/core";

await signIn({
  webauthn: {}
});
```

:::note

New users must first go through [sign-up](#passkeys) to create a passkey before they can sign in.

:::

### Options

Passkey sign-in can also be customized with options similar to sign-up. These let you control how long a session lasts and whether you want to track progress in your own UI.

| Option                        | Type                 | Default     | Description                                                                                                                    |
| ----------------------------- | -------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `maxTimeToLiveInMilliseconds` | `number`             | **4 hours** | Maximum lifetime of the user's session in **milliseconds**. Once expired, the session cannot be extended.                      |
| `onProgress`                  | `(progress) => void` |             | Callback fired at each step of the sign-up flow (e.g., fetching credential, validating, signing). Useful to customize your UI. |

Example with options:

```typescript
import { signIn } from "@junobuild/core";

await signIn({
  webauthn: {
    options: {
      maxTimeToLiveInMilliseconds: 1000 * 60 * 60, // 1 hour
      onProgress: ({ step, state }) => {
        console.log("Step:", step, "State:", state);
      }
    }
  }
});
```

---

## Checking Availability

Not every browser or device supports Passkeys. You can check availability before showing a sign-up or sign-in button with:

```typescript
import { isWebAuthnAvailable } from "@junobuild/core";

if (await isWebAuthnAvailable()) {
  // Show Passkey sign-up option
}
```

---

## Recommendations

- Passkeys work best for users who expect a simple, device-native login experience.
- Always check for WebAuthn support before showing a Passkey option.
- Combine Passkeys with other providers (like [Google](google.mdx) or [Internet Identity](internet-identity.mdx)) to cover both mainstream and decentralized use cases.
- Avoid changing your app's domain setup after users have registered, as identities are tied to the original domain scope.
