---
sidebar_position: 4
---

# Settings

This document will help you understand the different settings you can configure for your modules ([Satellites], [Mission controls], and [Orbiters]).

---

## Freezing Threshold

The Freezing Threshold defines the duration (in seconds) after which a module will be frozen. It acts as a **grace period** before permanent deletion.

When a module runs out of cycles, it will be uninstalled, meaning its code and state are deleted. The freezing threshold protects against this by halting the processing of new requests once the cycle balance drops below the threshold, while still allowing read-only replies to existing requests.

This grace period gives developers and users time to react. For sensitive applications, it's common to set a relatively long freezing threshold to ensure there’s enough time to notice a low balance and top up the module before removal

That’s why [Mission Control](../terminology.md#mission-control) (your wallet) and [Satellites](../terminology.md#satellite) (your projects) are spun up with a default freezing threshold of **one year** (360 days), reflecting their high importance.

In contrast, [Analytics](../build/analytics/index.md) modules are considered less critical and are provisioned with a default threshold of **three months** (90 days).

### In Other Words

To remain active and able to respond to state-changing requests—like updating data—a module must maintain a cycles balance that covers the cost of the freezing threshold period.

For example, if a module currently has 1 TCycles but needs 5 TCycles to stay alive for the 30-day freezing threshold, it will be considered frozen. If it is topped up to 5.1 TCycles, it becomes active again and can resume processing requests—until that extra 0.1 TCycles is consumed.

### Example of calculation

We want to calculate how many cycles are required to keep a module from being frozen, based on the freezing threshold and idle cycle burn rate.

Let’s say:

- **Freezing Threshold**: 2,592,000 seconds (30 days)
- **Idle Cycles Burned per Day**: 0.01 T Cycles (i.e. 10,000,000,000 cycles)

To compute the required cycles for the freezing threshold:

```
required_cycles = (idle_cycles_burned_per_day × freezing_threshold_seconds) / 86,400
```

> 86,400 is the number of seconds in one day

Substitute the values:

```
required_cycles = (10,000,000,000 × 2,592,000) / 86,400
= 25,920,000,000,000,000 / 86,400
= 300,000,000,000 cycles
= 0.3 T Cycles
```

Result ✅:

With a freezing threshold of 30 days and an idle burn rate of 0.01 T Cycles per day,  
the module must have a cycles balance greater than 0.3 T Cycles to avoid being frozen and to continue processing update requests.

---

## Reserved Cycles Limit

The Reserved Cycles Limit sets the maximum number of cycles a module can reserve. If the reserved cycles exceed this limit, any operation requiring resources, such as compute or memory, will fail.

The default value is `5_000_000_000_000n` (5 trillion cycles)

### Example

A practical use case could be a scenario where a module is expected to handle a large amount of data storage or perform intensive computations. By setting the Reserved Cycles Limit, developers can control the maximum amount of cycles that can be reserved for the future resource payments. This helps in preventing the module from exceeding its allocated budget and also ensures that it has enough cycles for its operations.

---

## Log Visibility

This setting controls who can see the default logs provided by the Internet Computer. It can be set to different levels of visibility, such as `public` or restricted to `controllers`.

You can find the logs in the "Functions" section of Juno's administration Console.

The default value is `controllers`.

:::tip

On Juno, an administrative access key is a controller.

:::

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

This setting specifies the amount of memory that is pre-allocated to the module. Pre-allocating memory can help in optimizing the module's performance by ensuring it has a guaranteed amount of memory available from the start.

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
