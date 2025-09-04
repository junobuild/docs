---
slug: passkeys-authentication-is-here
title: "Passkeys Authentication Is Here"
description: "We're adding Passkeys as a built-in authentication method. With passwordless authentication powered by WebAuthn, users can sign up and sign in using device-native authenticators like Face ID, Touch ID, or their browser's password manager. The JavaScript SDK has also been updated with changes to sign-in and sign-out flows, making authentication simpler and more predictable for developers."
authors: [peterpeterparker]
tags:
  [
    passkeys,
    passwordless,
    authentication,
    webauthn,
    sign-in,
    sign-up,
    javascript,
    sdk
  ]
image: https://juno.build/assets/images/passkeys-authentication-is-here-43c5075d7199d322001387e171adbe87.webp
---

![](passkeys-authentication-is-here.webp)

---

Authentication is a core part of building any app. Until now, developers on Juno have relied on third-party providers like Internet Identity and NFID. Today we're providing a new option: **Passkeys**.

This new authentication option is available to all developers using the latest Juno SDK and requires the most recent version of your Satellite containers. You can now enable Passkeys alongside existing providers, and the JavaScript SDK has been updated to make authentication APIs more consistent across sign-in, sign-out, and session management.

---

## 🔑 What Are Passkeys?

Passkeys are a passwordless authentication method built into modern devices and browsers. They let users sign up and sign in using secure digital keys stored in iCloud Keychain, Google Password Manager, or directly in the browser with Face ID, Touch ID, or a simple device unlock instead of a password.

Under the hood, Passkeys rely on the [WebAuthn standard](https://www.w3.org/TR/webauthn-2/) and the [web API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API) that enables browsers and devices to create and use cryptographic credentials. Passkeys are essentially a user-friendly layer on top of WebAuthn.

When stored in a password manager like iCloud Keychain or Google Password Manager, passkeys sync across a user’s devices, making them more resilient, though this does require trusting the companies that provide those services. If stored only in the browser, however, they can be lost if the browser is reset or uninstalled.

The good news is that most modern platforms already encourage syncing passkeys across devices, which makes them convenient for everyday use, giving users a smooth and safe way to log into applications.

---

## 🤔 Choosing Between Providers

Each authentication method has its strengths and weaknesses. Passkeys provide a familiar, device-native login experience with Face ID, Touch ID, or device unlock, relying on either the browser or a password manager for persistence. Internet Identity and NFID, on the other hand, offer privacy-preserving flows aligned with the Internet Computer, but they are less familiar to mainstream users and involve switching context into a separate window.

![When in doubt… why not both?](./why-not-both.webp)

In practice, many developers will probably combine Passkeys and Internet Identity side by side, as we do in the starter templates we provide.

Ultimately, the right choice depends on your audience and product goals, balancing usability, privacy, and ecosystem integration.

---

## 🚀 How to Use Passkeys

Using the new Passkeys in your app should be straightforward with the latest JavaScript SDK.

To register a new user with a passkey, you call `signUp` with the `webauthn` option:

```typescript
import { signUp } from "@junobuild/core";

await signUp({
  webauthn: {}
});
```

For returning users, `signIn` works the same way, using the passkey they already created:

```typescript
import { signIn } from "@junobuild/core";

await signIn({
  webauthn: {}
});
```

As you can notice, unlike with existing third-party providers, using Passkeys requires a distinct sign-up and sign-in flow. This is because the WebAuthn standard is designed so that an app cannot know in advance whether the user has an existing passkey, and this is intentional for privacy reasons. Users must therefore explicitly follow either the sign-up or sign-in path.

It is also worth noting that during sign-up, the user will be asked to use their authenticator twice:

- once to create the passkey on their device
- and once again to sign the session that can be used to interact with your Satellite.

Given these multiple steps, we added an onProgress callback to the various flows. This allows you to hook into the progression and update your UI, for example to show a loading state or step indicators while the user completes the flow.

```typescript
import { signUp } from "@junobuild/core";

await signUp({
  webauthn: {
    options: {
      onProgress: ({ step, state }) => {
        // You could update your UI here
        console.log("Progress:", step, state);
      }
    }
  }
});
```

---

## 🛠️ Updates to the SDK

Alongside introducing Passkeys, we also took the opportunity to clean up and simplify the authentication APIs in the JavaScript SDK.

---

### Mandatory provider in signIn

:::important

This is a breaking change.

:::

Previously, calling `signIn()` without arguments defaulted to Internet Identity. With the introduction of Passkeys, we decided to drop the default. From now on, you must explicitly specify which provider to use for each sign-in call. This makes the API more predictable and avoids hidden assumptions.

In earlier versions, providers could also be passed as class objects. To prevent inconsistencies and align with the variant pattern used across our tooling, providers (and their options) must now be passed through an object.

```typescript
import { signIn } from "@junobuild/core";

// Internet Identity
await signIn({ internet_identity: {} });

// NFID
await signIn({ nfid: {} });

// Passkeys
await signIn({ webauthn: {} });
```

---

### Page reload on signOut

:::important

This is a breaking change.

:::

By default, calling `signOut` will automatically reload the page (`window.location.reload`) after a successful logout. This is a common pattern in sign-out flows that ensures the application restarts from a clean state.

If you wish to opt out, the library still clears its internal state and authentication before the reload, and you can use the `windowReload` option set to `false`:

```typescript
import { signOut } from "@junobuild/core";

await signOut({ windowReload: false });
```

---

### authSubscribe renamed to onAuthStateChange

To make the API more consistent with the industry standards, we introduced a new method called `onAuthStateChange`. It replaces `authSubscribe`, which is now marked as deprecated but will continue to work for the time being.

The behavior remains the same: you can reactively track when a user signs in or out, and unsubscribe when you no longer need updates.

```typescript
import { onAuthStateChange } from "@junobuild/core";

const unsubscribe = onAuthStateChange((user) => {
  console.log("User:", user);
});

// Later, stop listening
unsubscribe();
```

---

## 📚 Learn More

Passkeys are now available, alongside updates to the authentication JS APIs. With passwordless sign-up and sign-in built into modern devices, your users get a smoother experience.

Check out the updated documentation for details on:

- [signUp](/docs/build/authentication/development#sign-up)
- [signIn](/docs/build/authentication/development#sign-in)
- [signOut](/docs/build/authentication/development#sign-out)
- [onAuthStateChange](/docs/build/authentication/development#onAuthStateChange)

---

## 👀 What's Next

Passkeys are available today for developers building with Satellite containers and the JavaScript SDK.

Next, we'll bring Passkey support directly into the Console UI, so new developers can register easily and you can too.

To infinity and beyond,  
David

---

Stay connected with Juno by following us on [X/Twitter](https://twitter.com/junobuild).

Reach out on [Discord](https://discord.gg/wHZ57Z2RAG) or [OpenChat](https://oc.app/community/vxgpi-nqaaa-aaaar-ar4lq-cai/?ref=xanzv-uaaaa-aaaaf-aneba-cai) for any questions.

⭐️⭐️⭐️ stars are also much appreciated: visit the [GitHub repo](https://github.com/junobuild/juno) and show your support!
