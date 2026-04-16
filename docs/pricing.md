---
description: Discover Juno's pricing structure, including operating costs, transaction fees, and cost examples. Learn how to manage and optimize your expenses.
keywords:
  [
    Juno pricing,
    operating costs,
    transaction fees,
    cycles,
    infrastructure costs,
    storage costs,
    deployment costs,
    data costs
  ]
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# Pricing

Juno has a simple starting point:

- ✅ Free to get started: new developers receive credits to create a container for their first project, with initial resources included, ready to use.
- 💰 Pay as you grow: additional modules (for projects, monitoring or analytics) cost 3 T Cycles each to create.
- 📦 Operating costs: ongoing costs for storage, compute, and deployments are paid with cycles.

From there, you can dive into the details below to estimate storage, deployment, and data costs more precisely.

---

## Operating costs

As the owner of your Mission Control, Satellites and Orbiters, you are responsible for their operating costs.

To ensure that your infrastructure usage is covered, you must maintain a minimum balance of [cycles](terminology.mdx#cycles).

You can top up your cycle balance in the Juno [console](https://console.juno.build/) through one of the following methods:

- Purchasing cycles with Stripe, thanks to our friends at [cycle.express](https://cycle.express).
- Using cycles from your [wallet](miscellaneous/wallet.mdx).
- Transferring cycles between modules, such as moving cycles from one Satellite to another.

---

## Transaction costs

New developers who join Juno are granted credits to create an initial [Satellite].

To create additional Satellites, a fee of 3 T Cycles is necessary, along with the infrastructure costs for setting up the container.

Similarly, enabling analytics by creating an [Orbiter] or monitoring with a [Mission Control] entails a fee of 3 T Cycles.

Each module is provisioned with approximately 1.5 T Cycles in usable resources.

:::note

- For backwards compatibility, modules can still be created using Mission Control (deprecated). The transaction cost for this approach is 1.5 ICP.

- Additional transaction fees may be introduced in the future, and pricing and models are subject to change.

- Transaction costs were last reviewed on Jan. 7, 2026.

:::

---

## Estimating Costs

We don't have reliable up-to-date numbers to share here. Costs on the Internet Computer vary depending on subnet configuration, network conditions, and your specific usage patterns. Rather than giving you figures that may mislead, we encourage you to run your own experiments and calculations using the official resources:

- 📄 [Cost reference](https://docs.internetcomputer.org/building-apps/essentials/gas-cost)
- 🧮 [Pricing calculator](https://3d5wy-5aaaa-aaaag-qkhsq-cai.icp0.io/)

### What to expect broadly

Hosting static assets and running lightweight workloads is generally competitive. However, compute and storage costs for data-heavy applications are significantly higher than traditional cloud infrastructure. To put it plainly: the infrastructure, the Internet Computer, is likely more expensive compared to conventional alternatives, and it is better suited for small datasets than for large-scale data-intensive workloads.

That said, the free tier gives you a solid starting point. You'll have enough resources to build, experiment, and evaluate whether ICP's cost model works for your use case before spending anything.

And again, we recommend doing your own research. DYOR prevails.

### A note on emulator metrics

If you use the [local emulator](./guides/local-development.mdx) during development, be aware that any cycles metrics you observe there should **not** be used as a proxy for mainnet costs.

The emulator runs on a single [node](./terminology.mdx#node), whereas on mainnet your data is replicated across all nodes in a [subnet](./terminology.mdx#subnet). This replication is what makes the Internet Computer resilient, but it also means real-world costs are meaningfully higher than what local testing suggests.

[mission control]: terminology.mdx#mission-control
[satellite]: terminology.mdx#satellite
[orbiter]: terminology.mdx#orbiter
