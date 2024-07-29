---
sidebar_position: 10
---

# Settings

This document will help you understand the different settings you can configure for your modules (Satellites, Mission controls, and Orbiters).

---

## Freezing Threshold

This setting defines the duration (in seconds) after which a module will be frozen if it runs out of cycles. When a module is frozen, it stops processing new requests but continues to reply to existing ones. The module's state is preserved during this period. However, if the module completely runs out of cycles, it will be uninstalled, and its code and state will be deleted. The rest of the module's information, such as its ID and controllers, remains intact.

The default value is `2_592_000n` (30 days).

### Example

If you set the freezing threshold to `3600n` (1 hour), your smart contract will freeze if it runs out of cycles and remains in this state for an hour. The module's state will be preserved, and it will resume operations once it receives additional cycles. If no cycles are added and the module's cycle balance hits zero, it will be uninstalled, and its code and state will be deleted, though its ID and controllers will remain intact.

---

## Reserved Cycles Limit

The Reserved Cycles Limit sets the maximum number of cycles a module can reserve. It's a number between 0 and 2128−12128−1. If the reserved cycles exceed this limit, any operation requiring resources, such as compute or memory, will fail.

The default value is `5_000_000_000_000n` (5 trillion cycles)

### Example

If you set the reserved cycles limit to `10_000_000_000_000n` (10 T cycles), the module will reserve up to 10 trillion cycles, and any operation exceeding this limit will fail.

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

If you set the compute allocation to `50n` (50%), the module will be allocated 50% of the compute capacity. This ensures that the module has a guaranteed share of the compute resources, potentially improving its performance by ensuring it has sufficient processing power for its operations.
