---
sidebar_position: 10
---

# Settings

This document will help you understand the different settings you can configure for your modules ([Satellites], [Mission controls], and [Orbiters]).

---

## Freezing Threshold

The Freezing Threshold defines the duration (in seconds) after which a module will be frozen. It is an important feature because if a module runs out of cycles, it will be uninstalled, meaning its code and state are deleted. The Freezing Threshold protects from deletion. If the cycles balance dips below the threshold, the smart contract will stop processing any new requests but will continue to reply to existing requests.

For sensitive applications, developers can set a freezing threshold to 90 days or more. This ensures that they and their users have enough time to react and top up the modules before they finally run out of cycles.

The default value is `2_592_000n` (30 days), except for Mission Control, which is set by default to `15_552_000n` (180 days).

### Example

If you set the freezing threshold to `3_600n` (1 hour), your smart contract will freeze if it runs out of cycles and remains in this state for an hour. The module's state will be preserved, and it will resume operations once it receives additional cycles. If no cycles are added and the module's cycle balance hits zero, it will be uninstalled, and its code and state will be deleted, though its ID and controllers will remain intact.

---

## Reserved Cycles Limit

The Reserved Cycles Limit sets the maximum number of cycles a module can reserve. If the reserved cycles exceed this limit, any operation requiring resources, such as compute or memory, will fail.

The default value is `5_000_000_000_000n` (5 trillion cycles)

### Example

A practical use case could be a scenario where a module is expected to handle a large amount of data storage or perform intensive computations. By setting the Reserved Cycles Limit, developers can control the maximum amount of cycles that can be reserved for the future resource payments. This helps in preventing the smart contract from exceeding its allocated budget and also ensures that it has enough cycles for its operations.

---

## Log Visibility

This setting controls who can see the logs of the smart contract. It can be set to different levels of visibility, such as `public` or restricted to `controllers`.

You can find the logs in the "Functions" section of Juno's administration Console.

The default value is `controllers`.

### Example

If you set log visibility to `public`, anyone can view the logs of the module.

---

## Heap Memory Limit

This setting defines the maximum amount of `heap` memory a module can use. It helps in controlling the memory usage of the module and prevents issues when upgrading.

That is why the default limit for Satellites is set to 1 GB.

### Example

If you set the heap memory limit to `2048n`, the module can use up to 2 GiB. Note, however, as mentioned above, that we assume the effective limit to ensure upgrades lies around 1 GiB.

---

## Memory Allocation

This setting specifies the amount of memory that is pre-allocated to the module. Pre-allocating memory can help in optimizing the smart contract's performance by ensuring it has a guaranteed amount of memory available from the start.

The default value is `0n` - i.e. no particular pre-allocation.

### Example

If you set memory allocation to `1_073_741_824n` (1 GiB), the module will have 1 GiB of memory allocated to it from the start. This ensures that the module has sufficient memory pre-allocated for its operations, potentially improving its performance by reducing the need for dynamic memory allocation during execution.

---

## Compute Allocation

This setting defines the percentage of compute capacity allocated to the module. It ensures that the module gets a certain share of compute resources.

The default value is `0n` - i.e. no particular allocation.

### Example

If you set the compute allocation to `50n`, the module will be allocated 50% of the compute capacity. This ensures that the module has a guaranteed share of the compute resources, potentially improving its performance by ensuring it has sufficient processing power for its operations.

[satellites]: ../terminology.md#satellite
[mission controls]: ../terminology.md#mission-control
[orbiters]: ../terminology.md#orbiter
