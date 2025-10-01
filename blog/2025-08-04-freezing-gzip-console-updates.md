---
slug: freezing-gzip-console-updates
title: Freezing, Gzip, & Console Enhancements
authors: [peterpeterparker]
tags: [release, console, cli, performance]
date: 2025-08-04
---

Hi 👋

A new release is out — `v0.0.52` 🚀

Here are a few highlights:  
🧊 Longer default freezing thresholds  
✅ Gzipped HTML  
🔐 Allowed Callers  
🛠 CLI Improvements  
🖥 Polished Console UI

Checkout the release notes for details 👉 [Release v0.0.52 · junobuild/juno](https://github.com/junobuild/juno/releases/tag/v0.0.52)

Let me know if anything looks fishy — and happy coding! 👨‍🔧

---

🖥️ Two screenshots from the Console new features

The new “Notifications” component:

![Notifications UI](https://us1.discourse-cdn.com/flex023/uploads/dfn/optimized/3X/0/b/0be9fd82d2855679e2e636b9625e8809c86d36f9_2_1304x1000.jpeg)

The overall look: collapsible menu, redesigned tabs, more prominent actions, and more.

![Console UI Update](https://us1.discourse-cdn.com/flex023/uploads/dfn/optimized/3X/3/e/3e14cf7042d73a47ada14288960028e85bdb1955_2_1304x1000.jpeg)

---

As a side note on this release: aside from the custom domain feature, I think it’s now possible to configure your entire project — including authentication, data, storage, and emulator — directly within the Juno config file. Plus with type safety as the cherry on top.

This is especially handy for maintainability or if your project can be forked.

Here’s an example config that shows where and how the project is deployed, which headers to apply to assets, defines the structure of that data, and which image to use when running the emulator with Podman:

```javascript
import { defineConfig } from "@junobuild/config";

/** @type {import('@junobuild/config').JunoConfig} */
export default defineConfig({
  satellite: {
    ids: {
      development: "jx5yt-yyaaa-aaaal-abzbq-cai",
      production: "fmkjf-bqaaa-aaaal-acpza-cai"
    },
    source: "build",
    predeploy: ["npm run build"],
    storage: {
      headers: [
        {
          source: "**/*.png",
          headers: [["Cache-Control", "max-age=2592000"]]
        }
      ]
    },
    collections: {
      datastore: [
        {
          collection: "notes",
          read: "managed",
          write: "managed",
          memory: "stable"
        }
      ]
    }
  },
  emulator: {
    runner: {
      type: "podman"
    },
    satellite: {}
  }
});
```

Documentation 👉 https://juno.build/docs/reference/configuration
