---
sidebar_position: 5
---

# Analytics

Juno Analytics, a simple, lightweight, and open-source web3 analytics solution that respects your users' privacy and doesn't use cookies, ensuring anonymity while providing valuable user insights.

![Juno's Analytics screenshot](../img/analytics.webp)

## Features

Juno Analytics offers several advantages for developers:

### No cookie banners required

Just like all of Juno's features, Analytics prioritizes privacy. It conducts dapp and site measurements entirely anonymously, without using cookies or collecting personal data. There are no persistent identifiers, cross-site tracking, or cross-device tracking. Your analytics data is not used for any other purposes.

### Lightweight script

Juno's JavaScript library for statistics is optimized for performance. It consists of a minimal main script that seamlessly integrates with your application's UI and a dedicated worker responsible for handling logic and cryptography. This design ensures that adding analytics won't impact your application's performance, including its boot time, and per extension preserving your customer acquisition rate.

### Track goal conversions and campaigns

Beyond standard page views, you can gain valuable insights into your visitors by creating custom events to track conversions and attribution.

### Transparent and fully open source

Juno is fully open source, including all its Analytics features, setting it apart from proprietary tools like Google Analytics.

Furthermore, unlike any other analytics alternative or solution, Juno's long-term vision is to evolve into a decentralized organization (DAO), embracing a new paradigm in the analytics industry.

## Considerations

In deploying Juno Analytics, it's important to understand various aspects that can affect its use and compliance.

### GDPR and PECR compliance

Juno Analytics refrains from generating persistent identifiers. Temporary anonymous data is stored in IndexedDB until it is synchronized with the smart contract. It employs a random unique string to calculate unique visitor sessions on a website with each new visit.

While we are not legal experts and the responsibility for adding analytics to your project ultimately rests with you, the above approach aligns our analytics with various cookie laws and privacy regulations, including GDPR and PECR.

### Hosted on the blockchain

All tracked data is securely stored on the blockchain without any specific geolocation. Currently, Analytics is not guaranteed to be located in Europe.

### No cross-dapp tracking

Juno Analytics does not follow users across websites and applications they visit. All data remains isolated to a single satellite.

### You 100% own your data

As with all services provided by Juno, you are the sole controller of your smart contracts, and your data belongs exclusively to you.

You have the capability to delete all collected data within your Analytics at any time by utilizing the [CLI] to reset your smart contract.

## How does it work?

To gather analytics for your dapps, you need to create an [orbiter]. Creating an Orbiter requires ICP, and its price is defined in the [transaction costs](../pricing#transaction-costs).

Each orbiter is used to collect analytics for one or multiple [satellites].

Page views are collected anonymously and saved with a unique random ID for attribution. This data is organized based on its collection timestamp.

You can also collect custom tracking events, which are organized in the same manner.

Additionally, a unique random session ID is generated for all data. Each time a visitor visits your dapps, a new session is created.

## Limitation

Currently, an orbiter can store up to 96GB of data.

## Getting started

Before integrating Juno Analytics into your app or website, you need to create an orbiter. Here's a step-by-step guide to help you get started:

1. Sign in to the Juno [console](https://console.juno.build).
2. Navigate to "Analytics" in the astronaut entry menu at the top right of your screen.
3. Click on **Get started**
4. Confirm by selecting **Create analytics**

The platform will then create your orbiter smart contract and provision its resources. Once the process is complete, click "Close" to terminate the creation wizard.

At this point, you have successfully created the analytics; however, you have not yet listed which satellites are eligible to track page views and events. To complete the configuration, proceed to the **Settings** page to register them.

[CLI]: ../miscellaneous/cli.md
[satellites]: ../terminology.md#satellite
[orbiter]: ../terminology.md#orbiter
[controllers]: ../terminology.md#controller
