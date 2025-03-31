---
description: Juno Analytics offers a privacy-focused, cookie-free, open-source web3 analytics solution. Ensure user anonymity while gaining valuable insights.
keywords:
  [
    Analytics,
    Juno Analytics,
    Web3 Analytics,
    Privacy-Focused Analytics,
    Cookie-Free Analytics,
    Open-Source Analytics
  ]
---

# Analytics

Juno Analytics, a simple, performant, and open-source web3 analytics solution that respects your users' privacy and doesn't use cookies, ensuring anonymity while providing valuable user insights.

![A screenshot of the Juno's Analytics dashboard](../../img/analytics/analytics-dashboard.webp)

---

## Features

Juno Analytics offers several advantages for developers:

### No cookie banners required

Just like all of Juno's features, Analytics prioritizes privacy. It conducts dapp and site measurements entirely anonymously, without using cookies or collecting personal data. There are no persistent identifiers, cross-site tracking, or cross-device tracking. Your analytics data is not used for any other purposes.

### Performance-Optimized Script

Juno's JavaScript library for statistics is optimized for performance. It consists of a minimal main script that seamlessly integrates with your application's UI and a dedicated worker responsible for handling logic and cryptography. This design ensures that adding analytics won't impact your application's performance, including its boot time, and per extension preserving your customer acquisition rate.

### Track goal conversions and campaigns

Beyond standard page views, you can gain valuable insights into your visitors by creating custom events to track conversions and attribution.

### Gather and aggregate performance metrics

In addition to tracking user interactions, the Analytics can also automatically collect key performance metrics using [Web Vitals](https://web.dev/articles/vitals). These metrics are essential for measuring user experience accurately, aligning with how they are captured by Chrome and reported to other Google tools. This enhancement is valuable for developers aiming to optimize the UI performance of their applications, ensuring a smoother and more responsive user experience.

### Transparent and fully open source

Juno is fully open source, including all its Analytics features, setting it apart from proprietary tools like Google Analytics.

Furthermore, unlike any other analytics alternative or solution, Juno's long-term vision is to evolve into a decentralized organization (DAO), embracing a new paradigm in the analytics industry.

---

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

---

## How does it work?

To gather analytics for your dapps, you need to create an [orbiter]. Creating an Orbiter requires ICP, and its price is defined in the [transaction costs](../../pricing#transaction-costs).

Each orbiter is used to collect analytics for one or multiple [satellites].

Page views are collected anonymously and saved with a unique random ID for attribution. This data is organized based on its collection timestamp.

You can also collect custom tracking events, which are organized in the same manner.

Additionally, a unique random session ID is generated for all data. Each time a visitor visits your dapps, a new session is created.

---

## Limitation

Currently, an orbiter can store up to 400 GB of data.

:::caution

Similar to other analytics services in the Web2 environment, an Orbiter accepts data submitted from any source as long as the requested payload matches the expected format, and the targeted satellite is configured to accept analytics. This is because the origin of the HTTP request cannot be accessed, for a valid reason – to prevent tracking. Therefore, calls cannot be limited to the domain of your dapps.

Consequently, this leaves the canister open to potential attacks that can pollute the data and consume cycles. For this reason, we recommend the following:

1. Avoid topping up the smart contract with excessive cycles; instead, adopt a lean approach.
2. Utilize the [monitoring](../../management/monitoring.md) feature to stay informed about the status.
3. Interpret the statistics provided by this feature with some reservation, similar to any other analytics data, considering potential inaccuracies.

:::

[CLI]: ../../reference/cli.mdx
[satellites]: ../../terminology.md#satellite
[orbiter]: ../../terminology.md#orbiter
