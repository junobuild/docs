---
slug: juno-run-scripts
title: Build & Run Scripts with “juno run”
authors: [peterpeterparker]
tags: [release, cli, scripts]
date: 2025-09-26
---

Say hello to `juno run` 👋

Build custom scripts that already know your env, profile & config.  
Write them in JS/TS.  
Run with the CLI. ⚡️

🍒 on top? Works out of the box in GitHub Actions!

For example:

```ts
import { defineRun } from "@junobuild/config";

export const onRun = defineRun(({ mode, profile }) => ({
  run: async ({ satelliteId, identity }) => {
    console.log("Running task with:", {
      mode,
      profile,
      satelliteId: satelliteId.toText(),
      whoami: identity.getPrincipal().toText()
    });
  }
}));
```

Run it with:

```bash
juno run --src ./my-task.ts
```

Now, let’s suppose you want to fetch a document from your Satellite’s Datastore (“from your canister’s little DB”) and export it to a file:

```typescript
import { getDoc } from "@junobuild/core";
import { defineRun } from "@junobuild/config";
import { jsonReplacer } from "@dfinity/utils";
import { writeFile } from "node:fs/promises";

export const onRun = defineRun(({ mode }) => ({
  run: async (context) => {
    const key = mode === "staging" ? "123" : "456";

    const doc = await getDoc({
      collection: "demo",
      key,
      satellite: context
    });

    await writeFile("./mydoc.json", JSON.stringify(doc, jsonReplacer, 2));
  }
}));
```

Fancy ✨

And since it’s TS/JS, you can obviously use any libraries to perform admin tasks as well.

```typescript
import { defineRun } from "@junobuild/config";
import { IcrcLedgerCanister } from "@dfinity/ledger-icrc";
import { createAgent } from "@dfinity/utils";

export const onRun = defineRun(({ mode }) => ({
  run: async ({ identity, container: host }) => {
    if (mode !== "development") {
      throw new Error("Only for fun!");
    }

    const agent = await createAgent({
      identity,
      host
    });

    const { metadata } = IcrcLedgerCanister.create({
      agent,
      canisterId: MY_LEDGER_CANISTER_ID
    });

    const data = await metadata({});

    console.log(data);
  }
}));
```

Coolio?

I’ll demo it next Monday in Juno Live.
🎥 https://youtube.com/@junobuild

Happy week-end ☀️
