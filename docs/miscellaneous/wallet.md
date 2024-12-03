---
sidebar_position: 12
---

# Wallet

This section provides guidance on managing your assets and cycles with your [wallet](../terminology.md#wallet), which are essential for maintaining and providing enough resources for your modules in the Juno ecosystem.

---

## What are ICP?

ICP are the native cryptocurrency of the [Internet Computer](https://internetcomputer.org). They are used to power this blockchain, providing utility and governance.

One key usage is converting ICP tokens to cycles, which are used to cover the computational and storage costs of running smart contracts and modules.

---

## Why do I need ICP?

Given that Juno is built on top of the Internet Computer (see [architecture](../white-paper/architecture.md)), your smart contracts require cycles to remain active.

While you don’t necessarily need ICP in the Juno ecosystem since you can acquire cycles with Stripe through [cycle.express](https://cycle.express), having some ICP can still be interesting.

It provides independence by allowing you to top up your modules without relying on third-party services. Depending on how you obtain your tokens, using ICP can also help lower transaction costs and offers interoperability with other Internet Computer projects, making it a flexible and practical option.

---

## Receiving ICP

You can receive ICP into your wallet either by buying it from the outside world or by transferring it from within the ecosystem.

---

### Buying ICP

To get ICP from the outside world into your wallet, you can use most cryptocurrency exchange platforms that allow you to buy ICP (refer to this [list](https://coinranking.com/fr/coin/aMNLwaUbY+internetcomputerdfinity-icp/exchanges) of major ones). These platforms let you convert dollars (or other currencies) into ICP. Keep in mind that exchanges charge a fee for this service.

Once you have obtained ICP on those platforms, you can initiate a transaction to send it to your wallet. For this purpose, you will need to provide a destination address where the ICP should be sent. This destination address corresponds to the [Account Identifier](./terminology.md#account-identifier) of your wallet.

You can locate the destination address in Juno's [console]. Once you've logged in, go to your [wallet](https://console.juno.build/wallet) and click "Receive".

Select "Account identifier".

Either copy your **Account identifier** or use the provided QR code. This is the address you should use to receive ICP from the outside world.

![Where to find the account identifier of your mission control](../img/account-identifier.webp)

### Transferring ICP

If you already hold ICP, you can transfer it from wallets within the ecosystem such as the [NNS dapp](https://nns.internetcomputer.org/), [OISY](https://oisy.com) or [others](https://internetcomputer.org/ecosystem?tag=Wallet).

To initiate a transaction to send it to your wallet, you will need to provide a destination address, which in this case is your wallet ID.

You can locate your wallet ID in Juno's [console]. Once you've logged in, go to your [wallet](https://console.juno.build/wallet), where the information is easy to find.

If you wish to use a QR code, click "Receive" and select "Wallet ID".

Select "Wallet ID".

If you are using OISY, you can also connect this third-party wallet to Juno's console to initiate the transaction and proceed with the approval. This eliminates the need to copy, paste, or scan any addresses.

[console]: https://console.juno.build
