---
description: Learn about shared authentication features in Juno, such as signing out, reacting to auth state changes, and accessing user identities.
keywords: [authentication, sign out, user state, identity]
title: Utilities
---

# Authentication Utilities

These utilities work with **any authentication provider**.

They let you manage user sessions, react to authentication changes, and access identities for advanced use cases.

---

## Sign-out

You can end a user's session, no matter which provider they used to sign in, by logging them out.

```typescript
import { signOut } from "@junobuild/core";

await signOut();
```

By default, the page will automatically reload after a successful sign-out. This is a common pattern in logout flows that ensures the application restarts from a clean state.

If you wish to opt out, the library does clear its internal state and authentication before the reload, and you can use the `windowReload` option set to `false`.

```typescript
import { signOut } from "@junobuild/core";

await signOut({ windowReload: false });
```

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

---


## Session Expiration

To proactively detect when a session duration expires, you can use the pre-bundled Web Worker provided by Juno's SDK.

To do so, you can follow these steps:

1. Copy the worker file provided by Juno's SDK to your app's static folder. For example, to your `public` folder with a NPM `postinstall` script:

```json
{
  "scripts": {
    "postinstall": "node -e \"require('fs').cpSync('node_modules/@junobuild/core/dist/workers/', './static/workers', {recursive: true});\""
  }
}
```

Once configured, run `npm run postinstall` manually to trigger the initial copy. Every time you run `npm ci`, the post-install target will execute, ensuring the worker is copied.

2. Enable the option when you initialize Juno:

```javascript
import { initSatellite } from "@junobuild/core";

await initSatellite({
  workers: {
    auth: true
  }
});
```

The `auth` option can accept either `true`, which will default to using a worker located at https://yourapp/workers/auth.worker.js, or a custom `string` to provide your own URL.

When the session expires, it will automatically be terminated with a standard [sign-out](utilities.md#sign-out). Additionally, an event called `junoSignOutAuthTimer` will be thrown at the `document` level. This event can be used, for example, to display a warning to your users or if you wish to reload the window.

```javascript
document.addEventListener(
  "junoSignOutAuthTimer",
  () => {
    // Display an information to your users
  },
  { passive: true }
);
```

The worker also emits an event named `junoDelegationRemainingTime`, which provides the remaining duration in milliseconds of the authentication delegation. This can be useful if you want to display to your users how much time remains in their active session.

```javascript
document.addEventListener(
  "junoDelegationRemainingTime",
  ({ detail: remainingTime }) => {
    // Display the remaining session duration to your users
  },
  { passive: true }
);
```

