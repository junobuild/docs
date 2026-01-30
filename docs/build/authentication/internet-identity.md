---
description: Learn how to integrate Internet Identity with Juno for decentralized, privacy-preserving authentication on the Internet Computer.
keywords: [Internet Identity, decentralized authentication, Internet Computer]
---

# Internet Identity

[Internet Identity](https://identity.ic0.app) lets users authenticate securely and anonymously through a decentralized identity system built for the Internet Computer.

When a user signs in with Internet Identity, they confirm their identity through the provider. If successful, a session is created automatically and the user can interact with your Satellite.

Authentication with Internet Identity offers strong privacy guarantees and complete isolation between domains by design.

---

## How It Works

1. The user signs in via Internet Identity.
2. The provider issues a unique, domain-specific pseudonymous identity.
3. Your project associates that identity with the user's data in your Satellite.
4. The user can immediately start using your app - no email, passwords, or extra setup.

---

---

## Example

```typescript
import { signIn } from "@junobuild/core";

await signIn({
  internet_identity: {}
});
```

This creates (or reuses) a session automatically the first time the user signs in.

---

## Options

Internet Identity sign-in can be customized with options that let you control session lifetime, provider configuration, or track progress during the flow.

| Option                       | Type                                           | Default     | Description                                                                                                                                                                                                                                                         |
| ---------------------------- | ---------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `maxTimeToLiveInNanoseconds` | `BigInt(4 * 60 * 60 * 1000 * 1000 * 1000)`     | **4 hours** | Maximum lifetime of the user's session in **nanoseconds**. Once expired, the session cannot be extended.                                                                                                                                                            |
| `windowed`                   | `boolean`                                      | `true`      | By default, the authentication flow is presented in a popup window on desktop that is automatically centered on the browser. This behavior can be turned off by setting the option to `false`, causing the authentication flow to happen in a separate tab instead. |
| `derivationOrigin`           | `string` or `URL`                              |             | The main domain to be used to ensure your users are identified with the same public ID, regardless of which of your Satellite's URLs they use to access your application.                                                                                           |
| `onProgress`                 | `(progress) => void`                           |             | Callback for provider sign-in and user creation/loading.                                                                                                                                                                                                            |
| `domain`                     | `id.ai` or `internetcomputer.org` or `ic0.app` | `id.ai`     | The domain on which to open Internet Identity.                                                                                                                                                                                                                      |

Example with options:

```typescript
// Sign-in with id.ai
await signIn({
  internet_identity: {
    options: {
      domain: "id.ai"
    }
  }
});

// Sign-in with a specific session duration
await signIn({
  internet_identity: {
    options: {
      maxTimeToLiveInNanoseconds: BigInt(24 * 60 * 60 * 1000 * 1000 * 1000) // 1 day
    }
  }
});

// Sign-in with a derivation origin and progression callback
await signIn({
  internet_identity: {
    options: {
      onProgress: ({ step, state }) => {
        console.log("Step:", step, "State:", state);
      },
      derivationOrigin: "https://myapp.com"
    }
  }
});
```

---

## Context

In addition to the options above, some settings apply to flow itself.

| Option        | Type      | Default | Description                                                                                                       |
| ------------- | --------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| `windowGuard` | `boolean` | `true`  | Prevents the user from closing the current window/tab while the flow is in progress. Disabling it is discouraged. |

---

## Handling Errors

If the sign-in flow encounters an error, an exception will be thrown.

When a user cancels sign-in with Internet Identity (e.g., by closing the modal), the library throws a `SignInUserInterruptError`. This error indicates that the user intentionally interrupted the sign-in process, and it's generally best practice to ignore it rather than showing an error message.

```typescript
import { signIn } from "@junobuild/core";

try {
  await signIn({
    internet_identity: {}
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

---

## Domain-Based Identity

With Internet Identity, a user's identity is created separately for each domain.

If a user signs in on two different domains, they will be treated as two separate users by default. The same applies to subdomains: signing in on `hello.com` and `www.hello.com` creates two different identities unless you configure a primary domain.

The first custom domain you add in the Console is automatically set as the primary domain. You can change this setting later in Authentication, but we don't recommend it once users have already registered, since their identities are not migrated when the configuration changes.

To let users keep the same identity across domains, you must also configure your frontend app to specify the main domain at sign-in. This is known as the "derivation origin" (or "alternative origins").

### Recommendation

If you're unsure which domain to use as the primary domain, here are two common approaches:

- **Use your custom domain** (e.g. `mydomain.com`) if you're confident it will remain the main entry point for users. This ensures a consistent user experience - users will always see and recognize the same URL when signing in.

- Alternatively, stick with **the default domain** (`{satellite-id}.icp0.io`) if:
  - You're still experimenting with your domain setup and might change it later.
  - You're not ready to commit to a long-term domain.
  - You plan to host multiple Satellites under different domains and don't want to tie user identity to just one.

Choosing the right derivation origin early helps avoid identity issues later, but both approaches are valid depending on your goals.
