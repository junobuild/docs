---
sidebar_position: 12
---

# Pricing

There are two types of costs associated with using Juno.

1. Operating costs for your [mission control], satellites and orbiters
2. Costs for executing transactions with Juno

:::note

Last update: Dec. 22, 2023

:::

## Operating costs

As the owner of your mission control, satellites and orbiters, you are responsible for their operating costs.

To ensure that your infrastructure usage is covered, you must maintain a minimum balance of [cycles](terminology.md#cycles).

You can top up your cycle balance in the Juno [console](https://console.juno.build/) using ICP from your mission control or from anywhere else on the [Internet Computer](https://internetcomputer.org/).

## Transaction costs

New developers who join Juno are granted credits to create a mission control and their initial [satellite].

To create additional satellites, a fee of 0.3 ICP is necessary, along with the infrastructure costs for setting up the smart contract.

Similarly, enabling analytics by creating an [orbiter] entails a fee of 0.3 ICP, plus the infrastructure costs for creating the smart contract.

Please note that additional transaction fees may be introduced in the future, and pricing and models are subject to change.

## Cost examples

Here are a few examples of costs provided for explanatory purposes only and without guarantee. Please note also that these cost estimates are subject to change and may vary depending on network conditions and usage patterns.

### Storage

The estimated annual cost of storing 1 gigabyte of data in a smart contract is $5.

To calculate the estimated monthly cost for 1 gigabyte of storage, you can refer to the table provided on the Internet Computer [website](https://internetcomputer.org/docs/current/developer-docs/gas-cost).

| Transaction                | 13-node Application Subnets | 34-node Application Subnets |
| -------------------------- | --------------------------- | --------------------------- |
| GB Storage Per Second      | $0.00000016622522           | $0.00000043474178           |
| Derived to a 30-day month  | $0.431                      | $1.127                      |
| Derived to a 12-month year | $5.172                      | $13.524                     |

### Deployment

Based on our experimentation, deploying an entire website on-chain, such as the website http://juno.build, which consists of 273 files and is approximately 17 MB in size, is estimated to cost around 0.16 ICP ($0.64).

It's important to note that subsequent deployments of your project can have significantly lower costs if the build consistency of your application is maintained. Juno only uploads new files to your satellites, which helps reduce costs compared to initial deployments.

### Data

Querying data on the Internet Computer is currently free, so there are no additional costs to expect when reading data.

In terms of persisting data, based on our experience, storing 100 instances of a JSON sample data with approximately 90 fields, totaling around 900 bytes, costs approximately 0.0005 TCycles or 0.00017 ICP ($0.000675). This means that the cost for a single transaction of this nature would be approximately 0.000005 TCycles or 0.0000017 ICP ($0.00000675).

## Sending ICP to Your Mission Control

To send ICP to your mission control, you can use most cryptocurrency exchange platforms (refer to this [list](https://coinranking.com/fr/coin/aMNLwaUbY+internetcomputerdfinity-icp/exchanges) of major ones) or wallets such as the [NNS dapp](https://nns.internetcomputer.org/).

To initiate the transaction, you will need to provide a destination address where the ICP should be sent. This destination address corresponds to the [Account Identifier](./terminology.md#account-identifier) of your mission control.

You can locate the destination address in Juno's console. Once you've logged in, go to the [Wallet tab](https://console.juno.build/mission-control/?tab=wallet) of your personal mission control, and either copy your **Account identifier** or use the provided QR code.

![Where to find the account identifier of your mission control](./img/account-identifier.webp)

:::info

You are the owner of your mission control, and Juno has no control or access to it. Therefore, any [ICP](terminology.md#icp) transferred to your mission control belongs to you and only you.

:::

[mission control]: terminology.md#mission-control
[satellite]: terminology.md#satellite
[orbiter]: terminology.md#orbiter
