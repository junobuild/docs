# Customization

Here are some customization options to tailor your sign-in flow and handle session expiration.

---

## Sign-In Providers

Juno currently supports Internet Identity and NFID, with NFID offering additional authentication methods such as Google, Metamask, and WalletConnect.

### Internet Identity

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

### NFID

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

When the session expires, it will automatically be terminated with a standard [sign-out](./development.md#sign-out). Additionally, an event called `junoSignOutAuthTimer` will be thrown at the `document` level. This event can be used, for example, to display a warning to your users or if you wish to reload the window.

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
