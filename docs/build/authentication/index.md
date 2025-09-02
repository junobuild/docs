---
description: Learn how to securely identify users anonymously and save their data in containers you own and control using Juno's authentication services.
keywords:
  [
    authentication,
    secure user identification,
    user identity,
    Internet Identity,
    NFID
  ]
---

# Authentication

Juno allows you to securely identify users **anonymously**.

Our easy-to-use SDKs support authentication through [Internet Identity] and [NFID].

Juno Authentication integrates tightly with other Juno services like [datastore](../datastore/index.mdx) and [storage](../storage/index.mdx).

You can manage your users in the [authentication](https://console.juno.build/authentication) view in Juno's console. A new entry is created when a user successfully signs in.

![An overview of the anonymous display of the users in Juno Console](../../img/satellite/authentication.webp)

---

## Domain-Based User Identity

For privacy reasons and to prevent tracking across sites, Juno's authentication is tied to the domain your app uses.

This means that if a user signs in on both the default domain (`icp0.io`) and a custom domain, they will be treated as two separate users by default.

The same applies to subdomains: signing in on `hello.com` and `www.hello.com` will result in two separate user identities.

That's why, when setting up a domain in the Console, you're prompted to choose a **primary domain**. This domain is used to consistently identify users, regardless of whether they sign in via the default or a custom domain.

:::important

- It is strongly recommended to set up such a primary domain only once per project and preferably before going live.

- In addition to configuring settings, you must also instruct your application to use the main domain you have selected by setting the `derivationOrigin` parameter to the sign-in options.

:::

### Recommendation

If you're unsure which domain to use as the primary domain, here are two common approaches:

- **Use your custom domain** (e.g. `mydomain.com`) if you're confident it will remain the main entry point for users. This ensures a consistent user experience — users will always see and recognize the same URL when signing in.

- Alternatively, stick with **the default domain** (`{satellite-id}.icp0.io`) if:
  - You're still experimenting with your domain setup and might change it later.
  - You're not ready to commit to a long-term domain.
  - You plan to host multiple satellites under different domains and don't want to tie user identity to just one.

Choosing the right derivation origin early helps avoid identity issues later, but both approaches are valid depending on your goals.

### More Information

This mechanism is called the "derivation origin" (or "alternative origins"). See the [documentation](https://internetcomputer.org/docs/current/developer-docs/integrations/internet-identity/alternative-origins/) for more details about the specification.

[Internet Identity]: ../../terminology.md#internet-identity
[NFID]: ../../terminology.md#nfid
