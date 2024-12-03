# Terminology

In Juno, we use some terms that may be unfamiliar to some. This page provides a summary of the most commonly used terms.

## Account Identifier

An "Account Identifier" is an address, serving as the textual representation of an account on the Internet Computer (ICP) ledger. It can represent an account owned by an individual or a smart contract.

When you send ICP from a cryptocurrency exchange or wallet, as explained in the [documentation](./pricing.md#sending-icp-to-your-mission-control), you are sending it to the "Account Identifier" associated with your [mission control].

## Console

The "console" refers to Juno's administration application, located at [https://console.juno.build](https://console.juno.build).

## Controller

Controllers are used to grant permissions to [mission controls] and [satellites] in Juno.

For more detailed information, please refer to the dedicated [documentation](miscellaneous/controllers.md).

## Cycles

Cycles are used to pay for [infrastructure] usage. Your [mission control] or [satellite] consumes cycles while it's active.

The amount of cycles available determines whether a smart contract will be active, inactive, or eventually decommissioned (deleted).

This ensures that related costs cannot surpass the amount of cycles available.

Think of cycles like prepaid mobile data:

- Just like your mobile plan allows you to make calls and browse the internet, cycles enable your smart contracts to process computations and store data.
- When your data (cycles) runs out, your service (smart contract) becomes inactive.
- To keep your smart contract running smoothly, you need to top up your cycles regularly.
- If you don’t top it up, after some time, it will be decommissioned, similar to losing your prepaid number due to prolonged inactivity.

Learn more about [computation and storage costs](https://internetcomputer.org/docs/current/developer-docs/gas-cost).

## ICP

The ICP token is the cryptocurrency used to pay for transactions on Juno's [infrastructure].

It can also be converted into cycles, which are used to pay for computation and storage. Unlike the market price of ICP, the price of cycles remains constant, ensuring predictable costs for infrastructure usage.

## Internet Identity

[Internet Identity](https://internetcomputer.org/internet-identity) is a Web3 authentication provider that offers a secure blockchain login experience with a user-friendly Web2 interface.

It is free, passwordless, and does not track user activity. It also integrates WebAuthn for maximum compatibility.

## Mission control

A mission control is a dedicated smart contract designed for managing your [satellites]. It is under your exclusive control, allowing it to hold ICP and perform various operations such as topping up your [satellites] and itself.

For a schematic representation, refer to the [Architecture](./white-paper/architecture.md) documentation page.

## Modules

A module or segment — i.e. Satellite, Mission Control, and Orbiter — refers to a smart contract compiled into WebAssembly (WASM) code and deployed on the Internet Computer with Juno.

It acts as a comprehensive entity, encompassing memory, permission checks, and other Juno abstractions. These serve as endpoints that developers and users can query for various functionalities.

![A really high level schema representing a Satellite architecture](./img/satellite.png)

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

## Subnet

A subnet is like a group of smart contracts (programs) working together on the Internet Computer. These groups, or subnets, are designed to distribute the workload across the network. By having multiple subnets, the Internet Computer can handle more activity, process data faster, and ensure the system remains efficient and secure.

When you create a module, like a Satellite, it's deployed on the same subnet as the Juno Console by default: [6pbhf-qzpdk-kuqbr-pklfa-5ehhf-jfjps-zsj6q-57nrl-kzhpd-mu7hc-vae](https://dashboard.internetcomputer.org/subnet/6pbhf-qzpdk-kuqbr-pklfa-5ehhf-jfjps-zsj6q-57nrl-kzhpd-mu7hc-vae).

Communicating between modules on different subnets takes longer due to the extra steps required for coordination (about 4 additional consensus rounds in the best case). This is why placing all your interacting smart contracts on the same subnet can lead to significant performance improvements.

[console]: terminology.md#console
[satellite]: terminology.md#satellite
[satellites]: terminology.md#satellite
[mission control]: terminology.md#mission-control
[mission controls]: terminology.md#mission-control
[infrastructure]: ./white-paper/infrastructure.md
