---
sidebar_position: 4
---

# Settings

This document will help you understand the different settings you can configure for your modules ([Satellites], [Mission controls], and [Orbiters]).

---

## Freezing Threshold

The Freezing Threshold defines the duration (in seconds) after which a module will be frozen. It is an important feature because if a module runs out of cycles, it will be uninstalled, meaning its code and state are deleted. The Freezing Threshold protects from deletion. If the cycles balance dips below the threshold, the smart contract will stop processing any new requests but will continue to reply to existing requests.

For sensitive applications that requires several resources, developers can set a freezing threshold to 90 days or more. This ensures that they and their users have enough time to react and top up the modules before they finally run out of cycles.

The default value is `2_592_000n` (30 days).

### Example of calculation

We are interested in finding out how close we are to hitting its threshold. So, let's consider a module with the following details:

- Cycles Balance: 0.937 T Cycles (937 billion cycles)
- Memory Usage: 14.32 MB (14,320,000 bytes)
- Freezing Threshold: 15,552,000 seconds (180 days)

#### Memory Cost Calculation

1. We assume a cost per byte per second is 0.0000001 cycles
2. Total memory cost per second: 14,320,000 bytes × 0.0000001 cycles/byte/second = 1.432 cycles/second
3. Total memory cost for 180 days: 1.432 cycles / second × 180 × 24 × 60 × 60 = 22,272,768 cycles

#### Total Cost for 180 Days

Total cost = Memory cost for 180 days + Compute cost for 180 days

We assume the compute allocation is the default 0% in this scenario.

Total cost = 22,272,768 cycles

#### Estimate Remaining Time

1. Current Cycles Balance: 0.937 × 1012 = 937,000,000,0000 cycles
2. Total cost for 180 days: 22,272,768 cycles
3. Remaining time: 937,000,000,0000 cycles / 22,272,768 cycles ≈ 42,060 180-day periods

Remaining time = 42,060 × 180 days ≈ 7,570,800 days

#### Summary

With a cycles balance of 937 billion cycles and memory usage of 14.32 MB, a module can survive for approximately 7,570,800 days (or about 20,741 years) before hitting the freezing threshold, assuming constant usage patterns.

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
