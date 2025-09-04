---
description: Learn how to securely identify users anonymously and save their data in containers you own and control using Juno's authentication services.
keywords:
  [
    authentication,
    secure user identification,
    user identity,
    Internet Identity,
    NFID,
    Passkey,
    WebAuthn
  ]
---

# Authentication

Juno allows you to securely identify users anonymously, without passwords and without tracking.

You can choose between [Passkeys](development.md#passkeys) for built-in authentication method, or integrate third-party providers like [Internet Identity](development.md#internet-identity) or [NFID](development.md#nfid).

Authentication works hand-in-hand with other Juno services like [Datastore](../datastore/index.mdx) and [Storage](../storage/index.mdx).

You can see and manage your users anytime in the [authentication](https://console.juno.build/authentication) view of the Console.

![An overview of the anonymous display of the users in Juno Console](../../img/satellite/authentication.webp)

---

## User Identity

When someone signs in to your app, they get an identity.

That identity is what ties them to the data they create and the actions they take.

Identities are:

- **Anonymous**: they don't expose personal info.
- **Scoped**: they are unique to the domain (or subdomain) where the user signs in.

Together, this makes authentication privacy-friendly by default and predictable for developers.

---

## Domain-Based Identity

For privacy reasons and to prevent tracking across sites, a user's identity is tied to the domain where they sign in.

### Passkeys

With Passkeys, the identity is linked to the hostname the user signs in on. It works for that domain and its subdomains.

For example, a passkey created on `hello.com` will also work on `www.hello.com`, but not on a different domain like `world.com`.

You can change this in the sign-up options if you want it to cover a different domain than the one read from the browser's URL. For example, you may want to use the top-level domain when signing in on a subdomain. You cannot specify a totally different domain.

### Internet Identity

With Internet Identity, a user's identity is created separately for each domain.

If a user signs in on two different domains, they will be treated as two separate users by default. The same applies to subdomains: signing in on `hello.com` and `www.hello.com` creates two different identities unless you configure a primary domain.

The first custom domain you add in the Console is automatically set as the primary domain. You can change this setting later in Authentication, but we don't recommend it once users have already registered, since their identities are not migrated when the configuration changes.

To let users keep the same identity across domains, you must also configure your frontend app to specify the main domain at sign-in. This is known as the "derivation origin" (or "alternative origins").

### Recommendation

If you're unsure which domain to use as the primary domain, here are two common approaches:

- **Use your custom domain** (e.g. `mydomain.com`) if you're confident it will remain the main entry point for users. This ensures a consistent user experience — users will always see and recognize the same URL when signing in.

- Alternatively, stick with **the default domain** (`{satellite-id}.icp0.io`) if:
  - You're still experimenting with your domain setup and might change it later.
  - You're not ready to commit to a long-term domain.
  - You plan to host multiple satellites under different domains and don't want to tie user identity to just one.

Choosing the right derivation origin early helps avoid identity issues later, but both approaches are valid depending on your goals.

---

## Choosing a Provider

Each authentication method has its strengths. The right choice depends not only on your app's technical needs, but also on what your users expect and feel comfortable with.

- **Passkeys**:
  - ✅ Best for mainstream users who expect a familiar, frictionless login with Face ID, Touch ID, or device unlock.
  - ✅ Great when you want a Web2-like UX but with stronger security.
  - 🤔 Users must explicitly choose between sign-up and sign-in, which can add friction if not guided.
  - ❌ Without syncing to iCloud or Google Password Manager, a passkey stored only in the browser can be lost if the browser is reset or uninstalled.
  - ❌ When using a manager, users must trust Apple/Google and other big tech for privacy preservation and safekeeping of their passkey.

- **Internet Identity**:
  - ✅ Best if you want users to authenticate with a fully decentralized and privacy-preserving identity.
  - ✅ Provides strong guarantees against tracking between domains.
  - 🤔 Requires context switching to an external window.
  - ❌ Limited awareness among mainstream users beyond the Internet Computer community.
  - ❌ Domain scoping can be confusing if misconfigured.

- **NFID**:
  - ✅ Good for users already onboarded with a NFID Wallet.
  - ✅ Offers an alternative on the Internet Computer.
  - 🤔 Requires context switching to an external window.
  - ❌ Limited awareness among mainstream users beyond the Internet Computer community.
  - ❌ Smaller user base compared to Passkeys or Internet Identity.

In practice, we expect many developers will implement both Passkeys and Internet Identity side by side. This approach gives users the choice between a device-native login flow and an Internet Computer–native identity, covering a wider range of expectations.

Ultimately, the choice should be guided by the audience you're targeting and how strongly you weigh the considerations outlined above.
