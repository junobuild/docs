---
sidebar_position: 1
---

# Authentication

Juno allows you to securely identify users **anonymously** and save their data on the blockchain.

Our easy-to-use SDKs support authentication through [Internet Identity] and [NFID].

Juno Authentication integrates tightly with other Juno services like [datastore](datastore.md) and [storage](storage.md).

You can manage your users in the [authentication](https://console.juno.build/auhtentication) view in Juno's console. A new entry is created when a user successfully signs in (see below).

:::note

The Juno SDK must be [installed](../add-juno-to-an-app/setup) and initialized in your app to use the authentication features.

:::

---

## Domain-Based User Identity

For privacy reasons and to prevent tracking between sites, Juno's [authentication](authentication.md) is linked to the domains you use.

This means that if a user signs in to your app on the default domain (`icp0.io`) and a custom domain, they will, by default, be treated as two separate users.

Similarly, a user signing in on your custom domain `hello.com` and a subdomain such as `www.hello.com` will also be treated as separate users.

That is why, when you set up a domain in the Console, you will be prompted about which primary domain should be used to identify users. This ensures that, regardless of whether they sign in on the default or a custom domain, users will be identified with the same public ID.

This feature is also known as "derivation origin" or "alternative origins". See the [documentation](https://internetcomputer.org/docs/current/developer-docs/integrations/internet-identity/alternative-origins/) for more details about the specification.

:::important

- It is strongly recommended to set up such a primary domain only once per project and preferably before going live.

- In addition to configuring settings, you must also instruct your application to use the main domain you have selected by setting the `derivationOrigin` parameter to the sign-in options.

:::

---

## Sign-in

You can authorize an existing or new user with the identity provider using `signIn`.

```typescript
import { signIn } from "@junobuild/core";

await signIn();
```

The sign-in feature offers customization options for authentication:

- `maxTimeToLive`: Specifies the duration for the session (defaults to **4 hours**, represented as `BigInt(4 * 60 * 60 * 1000 * 1000 * 1000)`). It's **important** to note that this duration remains constant, whether the users are active or inactive.
- `windowed`: By default, the authentication flow is presented in a popup window on desktop that is automatically centered on the browser. This behavior can be turned off by setting the option to `false`, causing the authentication flow to happen in a separate tab instead.
- `derivationOrigin`: The main domain to be used to ensure your users are identified with the same public ID, regardless of which of your satellite’s URLs they use to access your application.
- `allowPin`: We consider the specific PIN authentication method of [Internet Identity](https://internetcomputer.org/docs/current/references/ii-spec#client-authentication-protocol) as "insecure" because users can easily lose their login information if they do not register a passphrase, particularly as Safari clears the browser cache every two weeks in cases of inactivity. This is why we **disable** it by default.

You can configure the default sign-in flow that uses Internet Identity. You can also set NFID as a provider. Check out the [advanced Sign-in guidelines](#sign-in-providers) for more details.

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

---

## Advanced

Here are a few advanced recipes to customize your sign-in flow and detect session expiration.

### Sign-In Providers

Juno currently supports Internet Identity and NFID, with NFID offering additional authentication methods such as Google, Metamask, and WalletConnect.

#### Internet Identity

Internet Identity is available at two different URLs: `internetcomputer.org` and `ic0.app`.

By default, the SDK uses `internetcomputer.org` as we anticipate it will become the main domain in the future, and we believe it offers a better user experience and branding.

```typescript
import { signIn, InternetIdentityProvider } from "@junobuild/core";

// Default domain is 'internetcomputer.org'
await signIn({
  provider: new InternetIdentityProvider({})
});
```

To switch to the `ic0.app`, set the domain option as follows.

```typescript
import { signIn, InternetIdentityProvider } from "@junobuild/core";

await signIn({
  provider: new InternetIdentityProvider({
    domain: "ic0.app"
  })
});
```

#### NFID

To set up NFID, you need to configure the corresponding provider and provide your application name and a link to your logo.

```typescript
import { signIn, NFIDProvider } from "@junobuild/core";

await signIn({
  provider: new NFIDProvider({
    appName: "Your app name",
    logoUrl: "https://somewhere.com/your_logo.png"
  })
});
```

:::note

You can implement the `signIn` function in your application as many times as you wish, with various configurations. It is perfectly acceptable to use both Internet Identity and NFID within the same project.

:::

### Session Expiration

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
  satelliteId: "aaaaa-bbbbb-ccccc-ddddd-cai",
  workers: {
    auth: true
  }
});
```

The `auth` option can accept either `true`, which will default to using a worker located at https://yourapp/workers/auth.worker.js, or a custom `string` to provide your own URL.

When the session expires, it will automatically be terminated with a standard [sign-out](#sign-out). Additionally, an event called `junoSignOutAuthTimer` will be thrown at the `document` level. This event can be used, for example, to display a warning to your users or if you wish to reload the window.

```javascript
document.addEventListener("junoSignOutAuthTimer", () => {
    // Display an information to your users
}), {passive: true});
```

The worker also emits an event named `junoDelegationRemainingTime`, which provides the remaining duration in milliseconds of the authentication delegation. This can be useful if you want to display to your users how much time remains in their active session.

```javascript
document.addEventListener("junoDelegationRemainingTime", ({detail: remainingTime}) => {
    // Display the remaining session duration to your users
}), {passive: true});
```

[Internet Identity]: ../terminology.md#internet-identity
[NFID]: ../terminology.md#nfid
