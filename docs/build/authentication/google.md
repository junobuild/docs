---
description: Learn how to integrate Google Sign-In with Juno using OpenID Connect for secure, standards-based authentication.
keywords: [google, openid, oidc, authentication, sign in]
---

# Google

Google Sign-In lets users authenticate with their existing Google account using OpenID Connect (OIDC) - a modern, secure identity standard built on top of OAuth 2.0.

This provides a fast and familiar experience for users, without you having to manage passwords or credentials directly.

It's the easiest way to onboard users who expect a simple, frictionless login flow that works across devices and browsers.

---

## How It Works

1. The user signs in with Google.
2. Google verifies their credentials and issues a signed OpenID Connect token.
3. Your Satellite verifies the token and its signature, and extracts the user's information (such as email or profile).
4. It then establishes a session for the user.

:::note

Google authentication is not domain-scoped. Users keep the same identity across all your apps each time you use the same Google Client ID.

:::

---

## Configuration

To enable Google authentication for your project:

### 1. Get your Google credentials

Start by creating your Google credentials.

It's best to use a separate Google Cloud project for each environment (development, staging, production) so you can keep configurations clean and secure.

1. Go to the [Google Cloud Console](https://console.cloud.google.com/apis/dashboard).
2. Create a new project (or select one for your current environment).
3. Open **APIs & Services → Credentials**.
4. Click **Create Credentials → OAuth 2.0 Client ID**.
5. Select **Web application** as the application type.

Then, configure your redirect URIs.

For local development, you can use something like `http://localhost:3000/auth/callback/google`. In production, use the URL that matches your deployed app, for example `https://example.com/auth/callback/google`.

The exact redirect path depends on how your app handles authentication, but make sure you always set at least one redirect URI in your Google Console.

:::caution

Creating a separate OAuth 2.0 Client ID for each environment and always configuring **Authorized redirect URIs** is a must.

Since the Client ID is public, leaving redirect URIs open could let attackers interfere with your authentication flow. Likewise, keeping a localhost URL alongside your production redirect is also a security risk.

It's also recommended to set Authorized JavaScript origins, which will be used once FedCM (Federated Credential Management) support is added.
:::

### 2. Configure the provider

Once your credentials are ready, you need to add your Google Client ID to your project configuration.

In your `juno.config` file:

```typescript
import { defineConfig } from "@junobuild/config";

export default defineConfig({
  satellite: {
    ids: {
      development: "<DEV_SATELLITE_ID>",
      production: "<PROD_SATELLITE_ID>"
    },
    source: "dist",
    authentication: {
      google: {
        clientId: "1234567890-abcde12345fghijklmno.apps.googleusercontent.com"
      }
    }
  }
});
```

If you use different Client IDs for each environment (as recommended), you can leverage the build mode to load configuration conditionally.

For example, to enable Google Sign-In only in production:

```typescript
import { defineConfig } from "@junobuild/config";

export default defineConfig(({ mode }) => ({
  satellite: {
    ids: {
      development: "<DEV_SATELLITE_ID>",
      production: "<PROD_SATELLITE_ID>"
    },
    source: "dist",
    ...(mode === "production" && {
      authentication: {
        google: {
          clientId: "1234567890-abcde12345fghijklmno.apps.googleusercontent.com"
        }
      }
    })
  }
}));
```

### 3. Apply the configuration

Once your credentials are set in `juno.config`, you need to make sure both your frontend and your Satellite are using the correct and same Google Client ID.

#### Frontend

The frontend, your application, needs the Client ID to start the sign-in flow.

If you are using the Juno Vite or Next.js plugin, the configuration is read automatically from `juno.config`, so you do not need to do anything. The Client ID is injected at build time.

If you are not using a plugin, you need to pass the Client ID manually, either from your environment variables or directly in the sign-in call (see [Options](#options)).

#### Backend

Your Satellite also needs the Client ID because it is used to validate the JWT tokens issued during the sign-in flow with the third party provider in this case Google.

You can configure this in two ways:

- **Through the Console:**

Go to [console.juno.build](https://console.juno.build), select your Satellite, then open **Authentication → Setup** and enable **Google**.

The wizard will ask for your Client ID and enable the provider.

- **Through the CLI:**

If you already have the CLI installed and since the Client ID has been defined in your `juno.config`, you can apply the configuration directly with:

```bash
juno config apply
```

By default, this applies the production configuration. You can specify another mode using `--mode` argument if needed.

---

## Sign-In

Once your configuration is ready, you can let users sign in with their Google account.

```typescript
import { signIn } from "@junobuild/core";

await signIn({
  google: {}
});
```

This starts the standard Google redirect flow.

After the user authenticates, they should be redirected to the URL you configured as an Authorized redirect URI in the Google Cloud Console.

You can pass this URL through the `redirectUrl` option. If you omit it, the current origin (`window.location.origin`) is used.

### Options

Google sign-in supports a few options that let you control scopes, redirect URLs, and the overall sign-in experience.

| Option        | Type               | Default                          | Description                                                                                                                              |
| ------------- | ------------------ | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `clientId`    | `string`           | from `juno.config`               | Your Google OAuth Client ID. If not provided, it is automatically read from your project configuration using the plugins.                |
| `redirectUrl` | `string`           | `window.location.origin`         | The URL where the user is redirected after sign-in. It must match one of your authorized redirect URIs in the Google Cloud Console.      |
| `authScopes`  | `GoogleAuthScopes` | `['openid', 'profile', 'email']` | OAuth scopes to request. Must include `openid` and at least one of `profile` or `email`.                                                 |
| `loginHint`   | `string`           |                                  | Optional hint such as an email address that tells Google which user is likely signing in. Helps skip the account picker for known users. |

Example:

```typescript
import { signIn } from "@junobuild/core";

await signIn({
  google: {
    redirect: {
      clientId: "1234567890-abcde12345fghijklmno.apps.googleusercontent.com",
      authScopes: ["openid", "email"],
      redirectUrl: "https://example.com/auth/callback/google",
      loginHint: "user@example.com"
    }
  }
});
```

---

## Handling the Redirect

After authentication, Google redirects the user back to your app with a signed token. You must handle that redirect on the route that matches your configured `redirectUrl`. For example, `/auth/callback/google`.

```typescript
import { handleRedirectCallback } from "@junobuild/core";

await handleRedirectCallback();
```

If the callback is successful, the user is signed in and a session is created.

:::tip

After handling the redirect, it's best to navigate elsewhere in your app without keeping browser history. This prevents the user from re-triggering authentication when pressing the back button.

:::

---

## Advanced Configuration

You can optionally configure how authentication sessions behave on your Satellite.

These settings can be defined in your `juno.config` file and applied with `juno config apply` or adjusted directly in the Console under **Authentication → Setup**.

### Delegation

The `delegation` section defines how long sessions last and which modules authenticated users are allowed to call using their active session.

| Option            | Type                        | Default                      | Description                                                                                                                                                                                                                                                               |
| ----------------- | --------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allowedTargets`  | `PrincipalText[]` or `null` | restricted to this Satellite | List of modules (canisters on the Internet Computer) that authenticated users may call. Omit to restrict access to this Satellite only. Provide an array to allow calls only to specific targets. Set to `null` to allow calls to **any** backend (**use with caution**). |
| `sessionDuration` | `bigint`                    | 1 day                        | How long a user session remains valid, expressed in **nanoseconds**. Cannot exceed 30 days. Applies only to new sessions.                                                                                                                                                 |

Example configuration:

```typescript
authentication: {
  google: {
    clientId: "1234567890-abcde12345fghijklmno.apps.googleusercontent.com"
  },
  delegation: {
    allowedTargets: ["<YOUR_SATELLITE_ID>", "<LEDGER_CANISTER_ID>"],
    sessionDuration: BigInt(7 * 24 * 60 * 60 * 1_000_000_000) // 7 days
  }
}
```

---

## Recommendations

- ⚠️ Always configure **Authorized redirect URIs** in the Google Cloud Console.
- Use a separate **OAuth Client ID** for each environment (development, staging, production).
- Keep your frontend and Satellite **Client IDs** in sync.
- Do not leave a **localhost URI** next to production URIs in the same Client ID.
- In the future, Juno will support **FedCM (Federated Credential Management)** for Google Sign-In without redirects.
