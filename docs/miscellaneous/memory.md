---
sidebar_position: 5
---

# Memory

A [satellite] can store data using two types of memory: `heap` and `stable`. While both types are forms of random-access memory that only exist as long as the smart contract lives, they can be compared to a familiar analogy. Think of `heap` as similar to the RAM in a computer, and `stable` as more akin to ROM.

## In a nutshell

`Heap` memory offers the best performance for accessing data, both for reading and writing. However, it has a limited capacity in terms of the space it can occupy, with a max of 2 GB.

On the other hand, `stable` memory has a higher memory threshold with a maximum limit of 96 GB minus the heap size, allowing it to store more data in terms of size. However, it is slightly slower.

Additionally, `heap` memory needs to be deserialized and serialized each time you upgrade the smart contract's code. This process becomes heavier as the heap memory size grows.

On the contrary, `stable` memory doesn't require processing during an upgrade. However, the data it contains needs to be deserialized and serialized each time it is accessed, which can make its usage more costly.

## Recommendations

There are no strict rules governing the choice of memory type for your use case. Ultimately, the decision lies with you, based on what best suits your project. This is why both the [datastore](../build/datastore.md) and [storage](../build/storage.md) support both memory types.

However, we generally recommend using `heap` for small data or data that require frequent access, and `stable` for large data or data accessed less often.

This is why the default options for creating new collections are `heap` for datastore and `stable` for storage.

## Default usage

For the reasons mentioned above, your users, as well as your dapp's bundle and assets (including JS, HTML, images, etc., everything you deploy to your satellite using `juno deploy`), are stored in the `heap` memory.

In contrast, the [analytics](../build/analytics.md) data is saved within stable memory.

## Summary

| Aspect          | Heap Memory                                          | Stable Memory                                       |
| --------------- | ---------------------------------------------------- | --------------------------------------------------- |
| **Capacity**    | Max 2 GB                                             | Max 96 GB (minus heap size)                         |
| **Performance** | Fast for read and write operations                   | Slightly slower                                     |
| **Cost**        | Lower cost                                           | Slightly higher cost (~20x)                         |
| **Upgrades**    | Data must be deserialized/serialized during upgrades | Data are not processed during upgrades              |
| **Usage**       | Suitable for small or frequently accessed data       | Suitable for large or less frequently accessed data |

## Resources

- [Measure different collection libraries written in Rust](https://dfinity.github.io/canister-profiling/collections/)

[satellite]: ../terminology.md#satellite
