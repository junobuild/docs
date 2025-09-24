# Memory

This page explains how memory works conceptually and how you can monitor its usage through the Console.

---

## General Memory Usage

Every module — whether it's a [satellite], [orbiter], or your [mission control] — consumes memory in multiple ways. Some of that memory is directly controlled by your code, like the data you store in your [datastore](../build/datastore/index.mdx) or [storage](../build/storage/index.mdx). Other parts are more structural: global variables, the WASM binary (the container code itself), snapshots, and even system metadata contribute to your overall memory footprint.

To help you understand and optimize memory usage, the Console displays a detailed breakdown under each module's overview tab. These metrics are especially helpful for staying within limits, controlling costs, and avoiding issues during upgrades.

### Metrics

| Metric                  | Description                                                                                                                | Keyword   |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------- | --------- |
| `wasm_memory_size`      | Heap memory used by the module to save data.                                                                               | Heap      |
| `stable_memory_size`    | Stable memory used by the module to save data.                                                                             | Stable    |
| `wasm_binary_size`      | Size of the deployed container's code — specifically, the size of the installed gzipped WASM binary.                       | Code      |
| `wasm_chunk_store_size` | Memory used for storing chunks of the code when installing large containers (WASM > 2 MB). Used only in Mission Control.   | Chunks    |
| `custom_sections_size`  | Memory used to store metadata like version info or API definitions, stored in the container WASM binary's custom sections. | Metadata  |
| `canister_history_size` | Memory used by the module's history (e.g. creation, installation, upgrade, or controller changes).                         | History   |
| `snapshots_size`        | Memory consumed by snapshots created for the module.                                                                       | Snapshots |

---

## Satellite

A [satellite] can store data using two types of memory: `heap` and `stable`. Both are forms of random-access memory that exist only while the satellite is active. As an analogy, `heap` is like RAM in a computer, while `stable` is more like ROM.

### In a nutshell

`Heap` memory offers the best performance for accessing data, both for reading and writing. However, it has a limited capacity in terms of the space it can occupy, with a max of 1 GB.

On the other hand, `stable` memory has a higher memory threshold with a maximum limit of 500 GB minus the heap size, allowing it to store more data in terms of size. However, it is slightly slower.

Additionally, `heap` memory needs to be deserialized and serialized each time you upgrade the module's code. This process becomes heavier as the heap memory size grows.

On the contrary, `stable` memory doesn't require processing during an upgrade. However, the data it contains needs to be deserialized and serialized each time it is accessed, which can make its usage more costly.

### Recommendations

There are no strict rules governing the choice of memory type for your use case. Ultimately, the decision depends on your patterns and strategy. That said, **stable memory is strongly recommended** for the vast majority of data storage scenarios.

Why? Because:

- It allows you to offload large or infrequently accessed data from the limited heap space.
- It avoids serialization overhead during upgrades.
- It supports much larger data volumes.

In contrast, `heap` memory is best reserved for:

- Serving your frontend assets (HTML, JS, images, etc.).
- Small, ephemeral datasets that benefit from fast access and won't push the 1 GB heap limit.

This is why both the [datastore](../build/datastore/index.mdx) and [storage](../build/storage/index.mdx) support both memory types — but default to `stable`, which is also the **recommended** option.

### Default usage

By default, the memory model aligns with these best practices:

- Your dapp's frontend assets — everything deployed using `juno hosting deploy` — are stored in `heap` memory.
- In contrast, your users (as of Satellite version 0.0.16) and the [analytics](../build/analytics/index.md) data are saved within `stable` memory.

### Summary

| Aspect             | Heap Memory                                             | Stable Memory                                       |
| ------------------ | ------------------------------------------------------- | --------------------------------------------------- |
| **Capacity**       | Max 1 GB                                                | Max 500 GB (minus heap size)                        |
| **Performance**    | Fast for read and write operations                      | Slightly slower                                     |
| **Cost**           | Lower cost                                              | Higher cost (~20x)                                  |
| **Upgrades**       | Data must be deserialized/serialized during upgrades    | Data are not processed during upgrades              |
| **Usage**          | Suitable for small or frequently accessed data          | Suitable for large or less frequently accessed data |
| **Recommendation** | Use sparingly to avoid upgrade friction and size limits | Default and recommended for most use cases          |

---

## Behavior

When discussing memory, it's important to understand how WebAssembly (WASM) memory behaves at a lower level.

### Memory Growth and Reuse

WASM memory can **grow**, but it **cannot shrink**. This behavior is **not specific to Juno** — it's part of the WASM standard and applies across all platforms using WASM.

- Once the memory size increases (e.g. due to allocations or data structure growth), the total allocated memory **remains fixed at the new size**, even if you later free or remove data.
- However, memory that is no longer in use is **internally reused or reallocated**, so your container is not constantly allocating more memory unless needed.

### What to Expect

- It's normal to see your module's reported memory usage increase over time and **not decrease**, even after deletions or optimizations.
- The **only time this memory resets** is during an **upgrade**, which reinitializes the heap with the new WASM binary and runtime state.
- As a result, a growing memory footprint isn't necessarily a problem — but it's worth monitoring, particularly when it comes to the heap, which should not exceed the 1 GB limit.

### Best Practices

- As recommended in this documentation, **use stable memory** for large or infrequently accessed data to reduce heap pressure and avoid excessive memory growth. In other words, try to avoid using heap memory for anything beyond serving your frontend app.
- **Keep your heap size well below the 1 GB limit**, especially if you expect frequent upgrades or manage large in-memory state.
- **Ensure reproducible builds** of your frontend application. On deploy, only actual changes should be pushed to avoid unintentionally bloating memory usage. [Why this matters.](#ensure-your-frontend-build-is-reproducible)
- Use the Console UI's available tools and metrics to track memory usage and growth patterns over time.

---

## Exceeding the Heap Memory Limit

Every Satellite, and generally any module on Juno, starts with a default heap memory limit of 1 GB. While you can increase this limit in the settings, it's not recommended to go beyond it, as it may cause issues when upgrading your module.

The heap includes a bit of metadata, any collections you've created in Datastore and Storage (where using stable memory is advised), and the assets of your frontend application.

If you're deploying a really large application (>1 GB) or frequently pushing updates to an application that isn’t reproducible, your heap memory usage can grow unexpectedly and eventually hit the limit.

When that happens, your next deployment or update might fail to prevent exceeding the limit, which could lead to issues with your module.

```
Request ID: d7be9..bfcb8
  Reject code: 5
  Reject text: Error from Canister aaaaa-bbbbb-ccccc-ddddd-cai: Canister exceeded its current Wasm memory limit of 1073741824 bytes. The peak Wasm memory usage was 1073872896 bytes. If the canister reaches 4GiB, then it may stop functioning and may become unrecoverable. Please reach out to the canister owner to investigate the reason for the increased memory usage. It might be necessary to move data from the Wasm memory to the stable memory. If such high Wasm memory usage is expected and safe, then the developer can increase the Wasm memory limit in the canister settings..
Try checking the canister for a possible memory leak or modifying it to use more stable memory instead of Wasm memory. See documentation: https://internetcomputer.org/docs/current/references/execution-errors#wasm-memory-limit-exceeded
```

### Preventing Heap Memory Issues

To avoid running into memory limits, it's important to monitor memory usage and follow two key best practices:

#### Ensure Your Frontend Build is Reproducible

When building your frontend (e.g. with `npm run build`), the output should be identical to the previous build if no changes were made.

Why does this help? When you deploy your application, Juno does not clear existing files—it only adds new ones. To optimize this process, Juno compares the names and content (hash values) of all files with those already uploaded. If a file hasn't changed, it is skipped, reducing unnecessary memory usage and saving cycles.

If your build output isn’t reproducible, every deployment could introduce slightly different files, even if nothing has changed in your code. Over time, this would lead to unnecessary file accumulation, increasing heap memory usage and eventually causing issues.

#### Resolving Heap Memory Issues

There are different ways to resolve this issue, and the best approach depends on the features you're using. If you're using Datastore and Storage, we need to find a solution that prevents data loss. If you're only hosting a website, the steps to fix the issue will be much simpler.

In any case, the best course of action is to reach out so we can assess your situation and find a tailored solution together.

---

## Resources

- [Measure different collection libraries written in Rust](https://dfinity.github.io/canister-profiling/collections/)
- [Question about freeing/shrinking memory in WebAssembly design](https://github.com/WebAssembly/design/issues/1300)

[satellite]: ../terminology.md#satellite
[orbiter]: ../terminology.md#orbiter
[mission control]: ../terminology.md#mission-control
