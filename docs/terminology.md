---
sidebar_position: 9
---

# Terminology

In Juno, we use some terms that may be unfamiliar to some. This page provides a summary of the most commonly used terms.

## Account Identifier

An "Account Identifier" is an address, serving as the textual representation of an account on the Internet Computer (ICP) ledger. It can represent an account owned by an individual or a smart contract.

When you send ICP from a cryptocurrency exchange or wallet, as explained in the [documentation](./pricing.md#sending-icp-to-your-mission-control), you are sending it to the "Account Identifier" associated with your [mission control].

## Console

The "console" refers to Juno's administration application, located at [https://console.juno.build](https://console.juno.build).

## Cycles

Cycles are used to pay for [infrastructure] usage. Your [mission control] or [satellite] consumes cycles while it's active.

The amount of cycles available determines whether a smart contract will be active or inactive.

This ensures that related costs cannot surpass the amount of cycles available.

Learn more about [computation and storage costs](https://internetcomputer.org/docs/current/developer-docs/gas-cost).

## Controller

Controllers are used to grant permissions to [mission controls] and [satellites] in Juno.

For more detailed information, please refer to the dedicated [documentation](miscellaneous/controllers.md).

## ICP

The ICP token is the cryptocurrency used to pay for transactions on Juno's [infrastructure].

## Internet Identity

[Internet Identity](https://internetcomputer.org/internet-identity) is a Web3 authentication provider that offers a secure blockchain login experience with a user-friendly Web2 interface.

It is free, passwordless, and does not track user activity. It also integrates WebAuthn for maximum compatibility.

## Mission control

A mission control is a dedicated smart contract designed for managing your [satellites]. It is under your exclusive control, allowing it to hold ICP and perform various operations such as topping up your [satellites] and itself.

For a schematic representation, refer to the [Architecture](./architecture.md) documentation page.

## NFID

[NFID](https://nfid.one) is a digital identity that provides private and secure sign-in to applications. It offers a convenient way to authenticate with third-party providers like [Metamask](https://metamask.io/) and [Google](https://www.google.com/account/about/).

## Orbiter

An orbiter is the term we use to refer to the smart contract that can optionally be employed for analytics to gather valuable, anonymous insights about your users.

## Principal

Principals are generic identifiers for the [console], [mission controls], [satellites], and users.

They consist of a public-private key pair. When displayed or used as a configuration value, the public ID of the principal is used.

Learn more about [principals](https://internetcomputer.org/docs/current/references/ic-interface-spec#principal).

## Satellite

A satellite is a container for your application that runs entirely on-chain. It contains your project's data, storage, application bundle, and assets.

A satellite is essentially a smart contract with added capabilities.

Currently, each satellite is dedicated to a single application.

[console]: terminology.md#console
[satellite]: terminology.md#satellite
[satellites]: terminology.md#satellite
[mission control]: terminology.md#mission-control
[mission controls]: terminology.md#mission-control
[infrastructure]: category/infrastructure
