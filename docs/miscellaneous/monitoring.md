# Monitoring

Your [mission control] and [satellites] smart contracts consume resources while they operate.

These resources are known as [Cycles], which are [operating costs](../pricing#operating-costs) for which you are responsible. The amount of cycles available determines whether a smart contract will be active or inactive. When the amount reaches zero, your smart contracts will stop operating.

To avoid running out of cycles, Juno provides a monitoring system called the 'Observatory' that can track your balance of cycles and send you **email** warnings when your resources pass a certain threshold.

When you receive a message, it will include links to the [console] where you can top-up your canisters. This helps prevent them from running out of resources and ensures that your users always have access to your products, giving you greater confidence in your system's reliability.

## How does it work?

Enabling monitoring in the [console] instructs the 'Observatory' to collect the cycle balance and other status information (see Internet Computer method [canister_status](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-canister_status)) for your [mission control] and [satellites] **once per hour**.

Status collection is executed in your [mission control], and the data gathered will be persisted in its memory for 30 days. The most recent status will also be shared with the 'Observatory'.

The email you provide for notifications is saved in the 'Observatory' and will be transmitted through Web2 cloud providers when the notifications are sent. Google Firebase is used for a scheduled crontab function, and Infomaniak is used for mail SMTP.

:::note

When collecting statuses, if your [mission control] is detected to be running low on cycles, no further checks will be performed to avoid draining the resources of your administrative smart contract.

:::

## Reporting

Juno stores statuses in memory for 30 days, which are only accessible to you. With this information, Juno can provide informative reports on the overall behavior and performance of your segments.

[satellite]: ../terminology.md#satellite
[satellites]: ../terminology.md#satellite
[mission control]: ../terminology.md#mission-control
[Cycles]: ../terminology.md#cycles
[console]: ../terminology.md#console
