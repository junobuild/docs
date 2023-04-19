---
sidebar_position: 1
---

# Authentication

Juno allows you to securely identify users **anonymously** and save their data on the blockchain.

Our easy-to-use SDKs support authentication through [Internet Identity] and [NFID].

Juno Authentication integrates tightly with other Juno services like [datastore](datastore.md) and [storage](storage.md).

You can manage your users in the [authentication](https://console.juno.build/auhtentication) view in Juno's console. A new entry is created when a user succesfully signs in (see below).

:::note

The Juno SDK must be [installed](../add-juno-to-an-app/install-the-sdk-and-initialize-juno.md) and initialized in your app to use the authentication features.

:::

## Sign-in

You can authorize an existing or new user with the identity provider using `signIn`.

```typescript
import { signIn } from "@junobuild/core";

await signIn();
```

The sign-in feature has options to customize the authentication:

- `maxTimeToLive`: a maximum time to live (**4 hours** per default, `BigInt(4 * 60 * 60 * 1000 * 1000 * 1000)`)

:::note

The duration is given. It remains unchanged, regardless of whether the users are active or inactive.

:::

- `derivationOrigin`: a specific parameter of [Internet Identity](https://internetcomputer.org/docs/current/references/ii-spec#alternative-frontend-origins)
- `windowed`: by default, the authentication flow is presented to the user in a popup that is automatically centered on desktop. This behavior can be disabled by setting the option to `false`. In that case, the authentication flow will occur in a separate tab.

You can configure the default sign-in flow that uses [Internet Identity]. You can also set [NFID] as a provider. Check out the [advanced Sign-in guidelines](#sign-in-providers) for more details.

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

Subscribing returns a callback that can be executed to unsubscribe:

```typescript
import { authSubscribe } from "@junobuild/core";

const unsubscribe = authSubscribe((user: User | null) => {
  console.log("User:", user);
});

// Above subscriber ends now
unsubscribe();
```

## Advanced

Here are a few advanced recipes to customize your sign-in flow and detect session expiration.

### Sign-In Providers

Juno currently supports [Internet Identity] and [NFID], with NFID offering additional authentication methods such as Google, Metamask, and WalletConnect.

#### Internet Identity

[Internet Identity] offers two available domains: `internetcomputer.org` and `ic0.app`.

By default, the SDK uses `internetcomputer.org` because we anticipate it will become the main domain in the future.

```typescript
import { signIn, InternetIdentityProvider } from "@junobuild/core";

// Default domain is 'internetcomputer.org'
await signIn({
  provider: new InternetIdentityProvider({}),
});
```

To switch to the `ic0.app`, set the domain as follows.

```typescript
import { signIn, InternetIdentityProvider } from "@junobuild/core";

await signIn({
  provider: new InternetIdentityProvider({
    domain: "ic0.app",
  }),
});
```

#### NFID

To set up [NFID], you need to configure the corresponding provider and provide your application name and a link to your logo.

```typescript
import { signIn, NFIDProvider } from "@junobuild/core";

await signIn({
  provider: new NFIDProvider({
    appName: "Your app name",
    logoUrl: "https://somewhere.com/your_logo.png",
  }),
});
```

:::note

You can implement the `signIn` function in your application as many times as you wish, with various configurations. It is perfectly acceptable to use both [Internet Identity] and [NFID] within the same project.

:::

### Session Expiration

To proactively detect when a session duration expires, you can use the pre-bundled Web Worker provided by Juno's SDK.

To do so, you can follow these steps:

1. Copy the worker file provided by Juno's SDK to your app's static folder. For example, to your `public` folder with a NPM `postinstall` script:

```json
{
  "postinstall": "rsync -aqz node_modules/@junobuild/core/dist/workers/*.js public/workers/"
}
```

2. Enable the option when you initialize Juno:

```javascript
import { initJuno } from "@junobuild/core";

await initJuno({
  satelliteId: "aaaaa-bbbbb-ccccc-ddddd-cai",
  workers: {
    auth: true,
  },
});
```

The `auth` option can accept either `true`, which will default to using a worker located at `https://yourapp/workers/auth.worker.js, or a custom `string` to provide your own URL.

When the session expires, it will be terminated with a standard [sign-out](#sign-out). Additionally, an informational event called `junoSignOutAuthTimer` will be thrown at the `document` level. This event is optional and can be used, for example, to display a warning to your users.

```javascript
document.addEventListener("junoSignOutAuthTimer", () => {
    // Display an information to your users
}), {passive: true});
```

[Internet Identity]: ../terminology.md#internet-identity
[NFID]: ../terminology.md#nfid
