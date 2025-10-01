---
slug: faster-deploys-precompression
title: Faster Deploys & Precompression
authors: [peterpeterparker]
tags: [release, deploy, performance]
date: 2025-08-14
---

Hi 👋

A new release is out — `v0.0.54` 🚀

Here are a few highlights:

⚡️ Faster deploys with proposals batching  
📦 Smarter precompression (optional Brotli + replace mode)  
🔀 Redirects fixed  
✨ Shinier experience when deploying in your terminal

Checkout the release notes for details 👉 [Release v0.0.54 · junobuild/juno](https://github.com/junobuild/juno/releases/tag/v0.0.54)

Example of the new configuration option `precompress`:

```ts
export default defineConfig({
  satellite: {
    ids: {
      production: "qsgjb-riaaa-aaaaa-aaaga-cai"
    },
    source: "dist",
    precompress: {
      algorithm: "brotli",
      pattern: "**/*.+(css|js|mjs|html)",
      mode: "replace"
    }
  }
});
```
