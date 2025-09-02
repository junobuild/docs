---
sidebar_position: 11
---

# Snapshots

Snapshots are an essential component of any disaster recovery strategy. In the fast-paced world of development, unexpected issues can arise—such as accidental overwrites of critical data or bugs in updates. While these scenarios can't always be avoided, their impact can be minimized or mitigated.

The Snapshot feature acts as your safety net, ensuring that your project can recover quickly and efficiently from potential disasters. Each snapshot is a snapshot of your module (Satellite, Mission Control, or Orbiter) at a specific point in time. Snapshots enable you to restore your module to its previous state, protecting your work and averting potential crises.

---

## How It Works

You can manually create, restore, and delete snapshots for each module as needed. To do so, navigate to a module in the [console] and locate the features within the "Setup" tab.

Snapshots are also automatically created during the upgrade process, capturing a snapshot when upgrading to a new version. If preferred, you can opt out in the advanced options to skip creating a snapshot or prevent overwriting an existing one. However, given the sensitivity of such processes, we strongly recommend always having a snapshot available or at least ensuring a way to restore your data—for example, by being prepared to redeploy your application quickly.

---

## Limitations

As determined by the Internet Computer (see the [specification](https://internetcomputer.org/docs/current/references/ic-interface-spec#ic-take_canister_snapshot)), only one snapshot per module is currently allowed. If this evolves in the future, Juno will be updated accordingly.

Snapshots are stored on-chain, and the cost of a snapshot’s memory consumption is charged to the module itself. This means they follow the lifecycle of your modules — if the module is deleted or runs out of cycles, its snapshot is also removed.

This is why snapshots should not be mistaken for backups. Unlike true backups, they do not provide historical retention, off-chain storage, or protection against accidental loss of control. For long-term data protection, external backups — such as secure cold storage for sensitive data — are recommended.

---

## Frequency of Snapshots

Snapshots are automated during code upgrades, with the option to opt out. Alternatively, snapshots can be managed manually.

[console]: ../terminology.md#console
