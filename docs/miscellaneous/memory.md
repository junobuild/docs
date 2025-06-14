# Memory

This page explains how memory works conceptually and how you can monitor its usage through the Console.

---

## General Memory Usage

Every module — whether it's a [satellite], [orbiter], or your [mission control] — consumes memory in multiple ways. Some of that memory is directly controlled by your code, like the data you store in your [datastore](../build/datastore/index.md) or [storage](../build/storage/index.md). Other parts are more structural: global variables, the WASM binary (the container code itself), snapshots, and even system metadata contribute to your overall memory footprint.

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

A [satellite] can store data using two types of memory: `heap` and `stable`. While both types are forms of random-access memory that only exist as long as the smart contract lives, they can be compared to a familiar analogy. Think of `heap` as similar to the RAM in a computer, and `stable` as more akin to ROM.

### In a nutshell

`Heap` memory offers the best performance for accessing data, both for reading and writing. However, it has a limited capacity in terms of the space it can occupy, with a max of 1 GB.

On the other hand, `stable` memory has a higher memory threshold with a maximum limit of 500 GB minus the heap size, allowing it to store more data in terms of size. However, it is slightly slower.

Additionally, `heap` memory needs to be deserialized and serialized each time you upgrade the smart contract's code. This process becomes heavier as the heap memory size grows.

On the contrary, `stable` memory doesn't require processing during an upgrade. However, the data it contains needs to be deserialized and serialized each time it is accessed, which can make its usage more costly.

### Recommendations

There are no strict rules governing the choice of memory type for your use case. Ultimately, the decision lies with you, based on what best suits your project. This is why both the [datastore](../build/datastore/index.md) and [storage](../build/storage/index.md) support both memory types.

In practice, `heap` memory can be recommended for small datasets or data that require quick or frequent access, while `stable` memory is preferred for large data or data accessed less often.

This is why, for example, your dapp's bundle assets (including JS, HTML, images, etc.) are stored within the `heap` memory of satellites.

However, this decision, along with the memory limitations, results in a significant portion of the `heap` memory being allocated. Although `stable` memory is slightly slower and comes at a higher cost, it is well-suited for storing data and ensuring smooth smart contract upgrades. This is particularly important for the operation and lifecycle of a project.

That's why the default option for creating new collections is set to `stable` for both datastore and storage.

### Default usage

As mentioned in the previous chapter, your dapp's bundle and assets (everything you deploy to your satellite using `juno deploy`), are stored in the `heap` memory.

In contrast, your users (as of Satellite version 0.0.16) and the [analytics](../build/analytics/index.md) data are saved within `stable` memory.

### Summary

| Aspect          | Heap Memory                                          | Stable Memory                                       |
| --------------- | ---------------------------------------------------- | --------------------------------------------------- |
| **Capacity**    | Max 1 GB                                             | Max 500 GB (minus heap size)                        |
| **Performance** | Fast for read and write operations                   | Slightly slower                                     |
| **Cost**        | Lower cost                                           | Higher cost (~20x)                                  |
| **Upgrades**    | Data must be deserialized/serialized during upgrades | Data are not processed during upgrades              |
| **Usage**       | Suitable for small or frequently accessed data       | Suitable for large or less frequently accessed data |

## Resources

- [Measure different collection libraries written in Rust](https://dfinity.github.io/canister-profiling/collections/)

[satellite]: ../terminology.md#satellite
[orbiter]: ../terminology.md#orbiter
[mission control]: ../terminology.md#mission-control
