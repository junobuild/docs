# Development

This page provides an overview of how to integrate authentication features with the Juno SDK, including sign-in, sign-out, and user session subscription within your app.

:::note

The Juno SDK must be [installed](../../setup-the-sdk.mdx) and initialized in your app to use the authentication features.

:::

---

## Sign-up

If your app provides features that require authentication, your users need to sign up to create an identity that grants them access to your application.

### Passkeys

With Passkeys, sign-up creates a digital key that lives on the user's device — for example in the browser, iCloud Keychain, Google Password Manager, etc.

During sign-up, the user will be asked to use their authenticator twice: once to generate the passkey, and once more to sign their new identity which is then used to interact securely with your satellite.

```typescript
import { signUp } from "@junobuild/core";

await signUp({
  webauthn: {}
});
```

:::note

Returning users don't need to go through sign-up again. They can simply use [sign-in](#passkeys-1) with their existing passkey to authenticate.

:::

#### Options

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

#### Checking Availability

Not every browser or device supports Passkeys. You can check availability before showing a sign-up button with:

```typescript
import { isWebAuthnAvailable } from "@junobuild/core";

if (await isWebAuthnAvailable()) {
  // Show Passkey sign-up option
}
```

### Internet Identity / NFID

With Internet Identity and NFID there is no separate sign-up step. Users always go through sign-in, and if it's their first time, that flow will automatically create their identity.

In practice, your UI could simply show a button like "Continue with Internet Identity" or "Continue with NFID".

---

## Sign-in

If your app provides features that require authentication, your users need to sign in to access their identity and continue using your application securely.

### Passkeys

With Passkeys, returning users sign in using the digital key previously created on their device — for example in the browser, iCloud Keychain, Google Password Manager, etc.

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

#### Options

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

### Internet Identity

When a user signs in with Internet Identity, they log in with the provider to confirm their identity. If successful, a session is created and the user can interact with your satellite. There's no separate sign-up step — the account in your satellite is created automatically the first time they sign in, so the user can access your services right away.

```typescript
import { signIn } from "@junobuild/core";

await signIn({
  ii: {}
});
```

#### Options

Internet Identity sign-in can be customized with options that let you control session lifetime, provider configuration, or track progress during the flow.

| Option                       | Type                                       | Default                | Description                                                                                                                                                                                                                                                         |
| ---------------------------- | ------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `maxTimeToLiveInNanoseconds` | `BigInt(4 * 60 * 60 * 1000 * 1000 * 1000)` | **4 hours**            | Maximum lifetime of the user's session in **nanoseconds**. Once expired, the session cannot be extended.                                                                                                                                                            |
| `windowed`                   | `boolean`                                  | `true`                 | By default, the authentication flow is presented in a popup window on desktop that is automatically centered on the browser. This behavior can be turned off by setting the option to `false`, causing the authentication flow to happen in a separate tab instead. |
| `derivationOrigin`           | `string` or `URL`                          |                        | The main domain to be used to ensure your users are identified with the same public ID, regardless of which of your satellite's URLs they use to access your application.                                                                                           |
| `onProgress`                 | `(progress) => void`                       |                        | Callback for provider sign-in and user creation/loading.                                                                                                                                                                                                            |
| `domain`                     | `internetcomputer.org` or `ic0.app`        | `internetcomputer.org` | The domain on which to open Internet Identity.                                                                                                                                                                                                                      |

Example with options:

```typescript
await signIn({
  ii: {
    options: {
      maxTimeToLiveInNanoseconds: BigInt(24 * 60 * 60 * 1000 * 1000 * 1000), // 1 day
      onProgress: ({ step, state }) => {
        console.log("Step:", step, "State:", state);
      },
      derivationOrigin: "https://myapp.com"
    }
  }
});
```

#### Handling Errors

If the sign-in flow encounters an error, an exception will be thrown.

When a user cancels sign-in with Internet Identity (e.g., by closing the modal), the library throws a `SignInUserInterruptError`. This error indicates that the user intentionally interrupted the sign-in process, and it's generally best practice to ignore it rather than showing an error message.

```typescript
import { signIn } from "@junobuild/core";

try {
  await signIn({
    ii: {}
  });
} catch (error: unknown) {
  if (error instanceof SignInUserInterruptError) {
    // User canceled sign-in, no need to show an error
    return;
  }

  // Handle other errors
  console.error("Sign-in failed:", error);
}
```

### NFID

NFID flows follow a similar pattern to authentication with Internet Identity. The user signs in with the provider, and if successful, a session is created so they can interact with your satellite. If it's their first time, the account in your satellite is created automatically.

```typescript
import { signIn } from "@junobuild/core";

await signIn({
  nfid: {}
});
```

#### Options

NFID sign-in can be customized with following options:

| Option                       | Default Value                              | Default     | Description                                                                                                                                                                                                                                                         |
| ---------------------------- | ------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `maxTimeToLiveInNanoseconds` | `BigInt(4 * 60 * 60 * 1000 * 1000 * 1000)` | **4 hours** | Maximum lifetime of the user's session in **nanoseconds**. Once expired, the session cannot be extended.                                                                                                                                                            |
| `windowed`                   | `boolean`                                  | `true`      | By default, the authentication flow is presented in a popup window on desktop that is automatically centered on the browser. This behavior can be turned off by setting the option to `false`, causing the authentication flow to happen in a separate tab instead. |
| `derivationOrigin`           | `string` or `URL`                          |             | The main domain to be used to ensure your users are identified with the same public ID, regardless of which of your satellite's URLs they use to access your application.                                                                                           |
| `onProgress`                 | `(progress) => void`                       |             | Callback for provider sign-in and user creation/loading.                                                                                                                                                                                                            |
| `appName`                    | `string`                                   |             | The name of your application, shown to the user during sign-in.                                                                                                                                                                                                     |
| `logoUrl`                    | `string`                                   |             | URL of your application's logo, shown to the user during sign-in.                                                                                                                                                                                                   |

Example with options:

```typescript
import { signIn } from "@junobuild/core";

await signIn({
  nfid: {
    options: {
      maxTimeToLiveInNanoseconds: BigInt(24 * 60 * 60 * 1000 * 1000 * 1000), // 1 day
      onProgress: ({ step, state }) => {
        console.log("Step:", step, "State:", state);
      },
      appName: "My Cool App",
      logoUrl: "https://myapp.com/logo.png"
    }
  }
});
```

---

## Sign-out

You can end a user's session by logging them out.

```typescript
import { signOut } from "@junobuild/core";

await signOut();
```

:::note

This will clear the sign-in information stored in IndexedDB.

:::

---

## Listening to Auth Changes

You can monitor when a user signs in or out using `onAuthStateChange`. It gives you the current user and notifies you whenever their authentication state changes.

```typescript
import { onAuthStateChange } from "@junobuild/core";

// Reactively track if the user is signed in or signed out
onAuthStateChange((user: User | null) => {
  console.log("User:", user);
});
```

If you register the subscriber at the top of your application, it will automatically reflect the user's state:

- `null` when the app first loads and the user is not signed in
- A `User` object when they sign in or refresh while authenticated
- `null` again when they sign out

To stop listening, you can call the unsubscribe function returned:

```typescript
import { onAuthStateChange } from "@junobuild/core";

const unsubscribe = onAuthStateChange((user: User | null) => {
  console.log("User:", user);
});

// Stop listening
unsubscribe();
```

---

## Imperative Access to Identity

For advanced use cases, you may need direct access to the user's identity. You can use `getIdentityOnce` to retrieve the identity if the user is currently authenticated.

:::caution

Use this function **imperatively only**. Do **not** persist the identity in global state or store it for reuse. This function is intended for short-lived, one-time operations only.

:::

```ts
import { getIdentityOnce } from "@junobuild/core";

// Returns null if the user is not authenticated
const identity = await getIdentityOnce();

if (identity !== null) {
  // Use the identity to perform calls on the Internet Computer
}
```

Typical use case for this function is to enable developers to implement custom features for the Internet Computer:

- Passing the identity to temporarily create an actor or agent to call a canister
- Signing a message or making a one-time authenticated call

[Internet Identity]: ../../terminology.md#internet-identity
[NFID]: ../../terminology.md#nfid
