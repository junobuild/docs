---
description: Learn how to securely identify users anonymously and save their data on the blockchain using Juno's authentication services.
keywords:
  [
    authentication,
    secure user identification,
    blockchain authentication,
    Internet Identity,
    NFID
  ]
---

# Authentication

Juno allows you to securely identify users **anonymously** and save their data on the blockchain.

Our easy-to-use SDKs support authentication through [Internet Identity] and [NFID].

Juno Authentication integrates tightly with other Juno services like [datastore](../datastore/index.md) and [storage](../storage/index.md).

You can manage your users in the [authentication](https://console.juno.build/authentication) view in Juno's console. A new entry is created when a user successfully signs in.

![An overview of the anonymous display of the users in Juno Console](../../img/satellite/authentication.webp)

---

## Domain-Based User Identity

For privacy reasons and to prevent tracking between sites, Juno's authentication is linked to the domains you use.

This means that if a user signs in to your app on the default domain (`icp0.io`) and a custom domain, they will, by default, be treated as two separate users.

Similarly, a user signing in on your custom domain `hello.com` and a subdomain such as `www.hello.com` will also be treated as separate users.

That is why, when you set up a domain in the Console, you will be prompted about which primary domain should be used to identify users. This ensures that, regardless of whether they sign in on the default or a custom domain, users will be identified with the same public ID.

This feature is also known as "derivation origin" or "alternative origins". See the [documentation](https://internetcomputer.org/docs/current/developer-docs/integrations/internet-identity/alternative-origins/) for more details about the specification.

:::important

- It is strongly recommended to set up such a primary domain only once per project and preferably before going live.

- In addition to configuring settings, you must also instruct your application to use the main domain you have selected by setting the `derivationOrigin` parameter to the sign-in options.

:::

[Internet Identity]: ../../terminology.md#internet-identity
[NFID]: ../../terminology.md#nfid
