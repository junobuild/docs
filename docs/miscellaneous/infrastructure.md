---
title: Infrastructure
description: Discover how Juno's infrastructure blends self-hosted deployment with WebAssembly containers, focusing on simplicity, control, and modern Web2-compatible tooling.
keywords:
  [
    Juno,
    serverless infrastructure,
    self-hosted apps,
    developer tools,
    WebAssembly,
    WASM containers
  ]
---

# Infrastructure

Juno's infrastructure is designed to provide developers with a simple, secure, and self-contained execution environment. It blends WebAssembly container deployment with supporting services that prioritize ownership, transparency, and practical workflows.

---

## Internet Computer

![An illustration representing Juno modules living at the top of the Internet Computer](../img/juno-internet-computer.webp)

Juno operates on the [Internet Computer](https://internetcomputer.org/) (ICP or IC), a blockchain-based open cloud platform designed to run WebAssembly containers in a decentralized setup. Every part of the Juno platform — including your Satellites, Mission Control, Orbiters (analytics), and the platform's own services like the Console — runs as self-contained units on the IC.

The Internet Computer connects independent data centers worldwide. Specialized node machines and cryptography ensure that applications run efficiently and consistently, without relying on Big Tech intermediaries. It even enables direct web content delivery from these self-contained units.

While Juno relies on the Internet Computer as its primary execution layer, it avoids unnecessary complexity. Developers interact with Juno using familiar frontend and backend development workflows, without needing to manage or understand blockchain infrastructure.

---

## Supporting Infrastructure

While Juno runs fully on the Internet Computer, two supporting services are maintained to handle a feature that cannot yet be decentralized — sending email notifications.

- Observatory Proxy: To handle IPv6 and deduplication constraints in Internet Computer HTTPS outcalls, Juno uses an additional [proxy](https://github.com/junobuild/proxy) deployed on Google Firebase. This service may be removed in the future as the Internet Computer layer improves.

- Email Notifications: Developer notifications triggered by Mission Control monitoring (such as top-up successes or failures) are sent via [Resend](https://resend.com).

These services are strictly optional and exist only for this specific use case.
