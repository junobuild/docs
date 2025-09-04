# Customization

Here are some customization options to tailor your sign-in flow and handle session expiration.

---

## Sign Context

Some options apply to both sign-up and sign-in flows.

| Option        | Type      | Default | Description                                                                                                       |
| ------------- | --------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| `windowGuard` | `boolean` | `true`  | Prevents the user from closing the current window/tab while the flow is in progress. Disabling it is discouraged. |

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
