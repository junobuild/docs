---
slug: typescript-serverless-canister-calls
title: Serverless Canister Calls in TypeScript
authors: [peterpeterparker]
tags: [release, serverless, typescript, canisters, icp, icrc, sdk]
date: 2025-11-25
---

Hey 👋

If you like working with [ic-js](https://github.com/dfinity/icp-js-canisters) in the frontend...  
Say hello to **serverless canister functions in TypeScript** ⚡️

Write backend logic using the same TypeScript you already love — now with:

- 💫 Built-in canister clients for the Internet Computer (ICP, ICRC, CMC, NNS, SNS...)
- ⚙️ Full type-safety
- 🔌 Zero agent setup
- 🧠 Caller identity handled automatically
- 🍱 ICP & ICRC transfers from serverless hooks

No Rust required. No backend headaches.

---

## 📚 Documentation

Want to go straight to the point? Checkout the 👉 [references](/docs/reference/functions/typescript/canisters)

---

## Example

Transfer ICP directly from a Satellite serverless function:

```ts
import { IcpLedgerCanister } from "@junobuild/functions/canisters/ledger/icp";

export const onExecute = async () => {
  const ledger = new IcpLedgerCanister();

  const result = await ledger.transfer({
    args: {
      to: "destination-account-identifier",
      amount: { e8s: 100_000_000n }, // 1 ICP
      fee: { e8s: 10_000n },
      memo: 0n
    }
  });
};
```

And yes - this works inside datastore hooks like `onSetDoc` and `assertSetDoc`, fully atomic.

Browse the full working example 👉 [Making Canister Calls in TypeScript](/docs/examples/functions/typescript/canister-calls)

Cool cool cool?

To infinity and beyond<br />David
