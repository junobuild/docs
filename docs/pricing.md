---
description: Discover Juno's pricing structure, including operating costs, transaction fees, and cost examples. Learn how to manage and optimize your expenses.
keywords:
  [
    Juno pricing,
    operating costs,
    transaction fees,
    ICP,
    cycles,
    infrastructure costs,
    storage costs,
    deployment costs,
    data costs
  ]
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

To ensure that your infrastructure usage is covered, you must maintain a minimum balance of [cycles](terminology.md#cycles).

You can top up your cycle balance in the Juno [console](https://console.juno.build/) through one of the following methods:

- Purchasing cycles with Stripe, thanks to our friends at [cycle.express](https://cycle.express).
- Using cycles from your [wallet](miscellaneous/wallet.md).
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

:::

---

## Estimating Costs

Below are a few examples of costs provided for explanatory purposes only. Actual costs may vary depending on network conditions and usage patterns.

:::tip

You can use the [Pricing Calculator](https://internetcomputer.org/docs/current/developer-docs/cost-estimations-and-examples) to get a better rough estimate of how much your project might cost.

:::

### Storage

The estimated annual cost of storing 1 gigabyte of data on the Internet Computer is $5.

To calculate the estimated monthly cost for 1 gigabyte of storage, you can refer to the table provided on the Internet Computer [website](https://internetcomputer.org/docs/current/developer-docs/gas-cost).

| Transaction                | 13-node Application Subnets | 34-node Application Subnets |
| -------------------------- | --------------------------- | --------------------------- |
| GB Storage Per Second      | $0.000000169749             | $0.000000443960             |
| Derived to a 30-day month  | $0.439                      | $1.149                      |
| Derived to a 12-month year | $5.268                      | $13.788                     |

### Deployment

Based on our experimentation, deploying an entire website, such as the website http://juno.build, which consists of approximately 900 files (including compressed versions of the files) and is 40 MB in size, is estimated to cost around 0.114 T Cycles, which converts to 0.0105 ICP ($0.15).

It's important to note that subsequent deployments of your project can have significantly lower costs if the build consistency of your application is maintained. Juno only uploads new files to your Satellites, which helps reduce costs compared to initial deployments.

### Data

Querying data on the Internet Computer is currently free, so there are no additional costs to expect when reading data.

In terms of persisting data, based on our experience, storing 100 instances of a JSON sample data with approximately 90 fields, totaling around 900 bytes, costs approximately 0.0005 TCycles or 0.00017 ICP ($0.000675). This means that the cost for a single transaction of this nature would be approximately 0.000005 TCycles or 0.0000017 ICP ($0.00000675).

:::note

Pricing information was last reviewed on Jan. 7, 2026.

Figures are estimates and may change as the Internet Computer evolves.

:::

[mission control]: terminology.md#mission-control
[satellite]: terminology.md#satellite
[orbiter]: terminology.md#orbiter
