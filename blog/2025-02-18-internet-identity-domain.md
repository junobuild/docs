---
slug: internet-identity-domain
title: Internet Identity Domain
authors: [peterpeterparker]
tags: [release, authentication, identity]
date: 2025-02-18
---

Morning! Great news for the Juno community, which has always used `identity.internetcomputer.org` as the default domain for authentication.

Internet Identity now supports passkeys on both of its domains!

This means it should no longer matters whether devs or users sign in via `identity.internetcomputer.org` or `identity.ic0.app` — the registered identity should work seamlessly across both. There are a few limitations, which is why II may prompt you to register your current device.

As a result, I’ve just launched a new, clean sign-in page with a single call to action! :rocket:

To address potential sign-in issues, the page still offers domain-specific methods as a fallback. Plus, I added a brand-new footer accessible on scroll—kind of really happy with that design. :smiley:

👉 https://console.juno.build/

Cool, cool, cool!

---

References:

- https://forum.dfinity.org/t/internet-identity-upgrade-135312-domains-compatibility/41197
- https://nns.ic0.app/proposal/?u=qoctq-giaaa-aaaaa-aaaea-cai&proposal=135312

![Cleaned login page](https://us1.discourse-cdn.com/flex023/uploads/dfn/optimized/3X/7/3/73f2044c32db76ae07b8f095b67f7dd42285e68a_2_1380x960.jpeg)
