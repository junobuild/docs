---
sidebar_position: 1
---

# Authentication

Juno allows you to securely identify users **anonymously** and save their data on the blockchain.

Our easy-to-use SDKs support authentication via [Internet Identity] and more providers will be added soon.

Juno Authentication integrates tightly with other Juno services, [datastore](datastore.md) and [storage](storage.md).

:::note

The Juno SDK must be [installed](../add-juno-to-an-app/install-the-sdk-and-initialize-juno.md) and initialized in your app to use the authentication features.

:::

## How does it work?

When a user authenticates successfully in your app, a document is created in your [datastore](datastore.md) with the user's public key (**anonymous** [principal](../terminology.md#principal)).

This allows any actions performed by the user to be authenticated.

You can manage your users in the [authentication](https://console.juno.build/auhtentication) view in Juno's console.

## Sign-in

You can authorize an existing or new user with the identity provider using `signIn`.

```typescript
import { signIn } from "@junobuild/core";

await signIn();
```

The sign-in feature has options to customize the authentication:

- `maxTimeToLive`: a maximum time to live (**4 hours** per default, `BigInt(4 * 60 * 60 * 1000 * 1000 * 1000)`)

:::note

The set duration remains unchanged, regardless of whether the users are active or inactive.

:::

- `derivationOrigin`: a specific parameter of [Internet Identity](https://internetcomputer.org/docs/current/references/ii-spec#alternative-frontend-origins)

## Sign-out

You can end a user's session by logging them out.

```typescript
import { signOut } from "@junobuild/core";

await signOut();
```

:::note

This will clear the sign-in information stored in IndexedDB.

:::

## Subscription

You can subscribe to the user state (signed-in or out) by using the subscriber function. This function provides a technical user and will trigger whenever the user's state changes.

```typescript
import { authSubscribe } from "@junobuild/core";

authSubscribe((user: User | null) => {
  console.log("User:", user);
});
```

If you register the subscriber at the top of your application, it will propagate the user's state accordingly (e.g. `null` when a new user opens the app, the new user's entry when they sign in, the existing user when they refresh the browser within the valid duration, and `null` again when they sign out).

The subscribing function returns a callback that you can use to unsubscribe.

Subscribing returns a callback that can be executed to unsubscribe:

```typescript
import { authSubscribe } from "@junobuild/core";

const unsubscribe = authSubscribe((user: User | null) => {
  console.log("User:", user);
});

// Above subscriber ends now
unsubscribe();
```

[Internet Identity]: https://internetcomputer.org/internet-identity
