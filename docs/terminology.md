---
sidebar_position: 8
---

# Terminology

In Juno, we use some terms that may be unfamiliar to some. This page provides a summary of the most commonly used terms.

## Console

The "console" refers to Juno's administration application, located at [https://console.juno.build](https://console.juno.build).

## Cycles

Cycles are used to pay for [infrastructure] usage. Your [mission control] or [satellite] consumes cycles while it's active.

The amount of cycles available determines whether a smart contract will be active or inactive.

This ensures that related costs cannot surpass the amount of cycles available.

Learn more about [computation and storage costs](https://internetcomputer.org/docs/current/developer-docs/deploy/computation-and-storage-costs).

## Controller

Controllers are used to grant permissions to [mission controls] and [satellites] in Juno.

An administrative controller can perform tasks such as configuring or deploying an app, topping up a mission control or satellite, creating a new collection in the [datastore](build/datastore.md) or [storage](build/storage.md), or configuring a custom domain in the [hosting](build/hosting.md).

When you sign in to Juno's [console], you - **and no one else** (including not Juno) - become the controller of your own [mission control].

When you create a [satellite], you and your [mission control] become its controllers. Per extension, you - **and no one else** (including not Juno) - own your [satellite].

You can also add additional controllers. When doing so, you can choose to grant them administrative privileges or restrict their scope to reading and writing data.

One "controller" is identified by a [principal](terminology.md#principal).

## ICP

The ICP token is the cryptocurrency used to pay for transactions on Juno's [infrastructure].

## Internet Identity

[Internet Identity](https://internetcomputer.org/internet-identity) is a Web3 authentication provider that offers a secure blockchain login experience with a user-friendly Web2 interface.

It is free, passwordless, and does not track user activity. It also integrates WebAuthn for maximum compatibility.

## Mission control

A mission control is a facility used to manage your [satellites]. With it, you can monitor various aspects of your [satellites], including [datastore](build/datastore.md), [storage](build/storage.md), [hosting](build/hosting.md), and cycle consumption.

## NFID

[NFID](https://nfid.one) is a digital identity that provides private and secure sign-in to applications. It offers a convenient way to authenticate with third-party providers like [Metamask](https://metamask.io/) and [Google](https://www.google.com/account/about/).

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
