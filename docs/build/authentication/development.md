# Development

This page provides an overview of how to integrate authentication features with the Juno SDK, including sign-in, sign-out, and user session subscription within your app.

:::note

The Juno SDK must be [installed](../../setup-the-sdk.mdx) and initialized in your app to use the authentication features.

:::

---

## Sign-in

You can authorize an existing or new user with the identity provider using `signIn`.

```typescript
import { signIn } from "@junobuild/core";

await signIn();
```

The sign-in feature supports following customization options:

| Option             | Default Value                              | Description                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------ | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `maxTimeToLive`    | `BigInt(4 * 60 * 60 * 1000 * 1000 * 1000)` | Specifies the duration for the session (defaults to **4 hours**). It's **important** to note that this duration remains constant, whether the users are active or inactive.                                                                                                                                                                                                                                        |
| `windowed`         | `true`                                     | By default, the authentication flow is presented in a popup window on desktop that is automatically centered on the browser. This behavior can be turned off by setting the option to `false`, causing the authentication flow to happen in a separate tab instead.                                                                                                                                                |
| `derivationOrigin` | —                                          | The main domain to be used to ensure your users are identified with the same public ID, regardless of which of your satellite’s URLs they use to access your application.                                                                                                                                                                                                                                          |
| `allowPin`         | `false`                                    | We consider the specific PIN authentication method of [Internet Identity](https://internetcomputer.org/docs/current/references/ii-spec#client-authentication-protocol) as "insecure" because users can easily lose their login information if they do not register a passphrase, particularly as Safari clears the browser cache every two weeks in cases of inactivity. This is why we **disable** it by default. |

You can configure the default sign-in flow that uses Internet Identity. You can also set NFID as a provider. Check out the [advanced Sign-in guidelines](./customization.md#sign-in-providers) for more details.

### Handling Errors

If the sign-in flow encounters an error, an exception will be thrown.

When a user cancels sign-in (e.g., by closing the modal), the library throws a `SignInUserInterruptError`. This error indicates that the user intentionally interrupted the sign-in process, and it's generally best practice to ignore it rather than showing an error message.

```typescript
import { signIn } from "@junobuild/core";

try {
  await signIn();
} catch (error: unknown) {
  if (error instanceof SignInUserInterruptError) {
    // User canceled sign-in, no need to show an error
    return;
  }

  // Handle other errors
  console.error("Sign-in failed:", error);
}
```

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

You can monitor when a user signs in or out using `authSubscribe`. It gives you the current user and notifies you whenever their authentication state changes.

```typescript
import { authSubscribe } from "@junobuild/core";

// Reactively track if the user is signed in or signed out
authSubscribe((user: User | null) => {
  console.log("User:", user);
});
```

If you register the subscriber at the top of your application, it will automatically reflect the user's state:

- `null` when the app first loads and the user is not signed in
- A `User` object when they sign in or refresh while authenticated
- `null` again when they sign out

To stop listening, you can call the unsubscribe function returned:

```typescript
import { authSubscribe } from "@junobuild/core";

const unsubscribe = authSubscribe((user: User | null) => {
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
