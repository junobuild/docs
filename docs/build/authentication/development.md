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

You can end a user's session by logging them out.

```typescript
import { signOut } from "@junobuild/core";

await signOut();
```

:::note

This will clear the sign-in information stored in IndexedDB.

:::

---

## Subscription

You can subscribe to the user state using the subscriber function. This function provides a technical user and triggers whenever the user's state changes.

In other words, using this callback allows you to monitor whether the user is signed in or signed out.

```typescript
import { authSubscribe } from "@junobuild/core";

authSubscribe((user: User | null) => {
  console.log("User:", user);
});
```

If you register the subscriber at the top of your application, it will propagate the user's state accordingly (e.g. `null` when a new user opens the app, the new user's entry when they sign in, the existing user when they refresh the browser within the valid duration, and `null` again when they sign out).

Subscribing returns a callback that can be executed to unsubscribe:

```typescript
import { authSubscribe } from "@junobuild/core";

const unsubscribe = authSubscribe((user: User | null) => {
  console.log("User:", user);
});

// Above subscriber ends now
unsubscribe();
```

[Internet Identity]: ../../terminology.md#internet-identity
[NFID]: ../../terminology.md#nfid
