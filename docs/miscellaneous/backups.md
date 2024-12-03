---
sidebar_position: 11
---

# Backups

Backups are an essential component of any disaster recovery strategy. In the fast-paced world of development, unexpected issues can arise—such as accidental overwrites of critical data or bugs in updates. While these scenarios can't always be avoided, their impact can be minimized or mitigated.

The Backup feature acts as your safety net, ensuring that your project can recover quickly and efficiently from potential disasters. Each backup is a snapshot of your module (Satellite, Mission Control, or Orbiter) at a specific point in time. Backups enable you to restore your canister to its previous state, protecting your work and averting potential crises.

---

## How It Works

You can manually create, restore, and delete backups for each module as needed. To do so, navigate to a module in the [console] and locate the features within the "Setup" tab.

Backups are also automatically created during the upgrade process, capturing a snapshot when upgrading to a new version. If preferred, you can opt out in the advanced options to skip creating a backup or prevent overwriting an existing one. However, given the sensitivity of such processes, we strongly recommend always having a backup available or at least ensuring a way to restore your data—for example, by being prepared to redeploy your application quickly.

---

## Limitations

As determined by the Internet Computer (see the [specification](https://internetcomputer.org/docs/current/references/ic-interface-spec#ic-take_canister_snapshot)), only one snapshot per module is currently allowed. If this evolves in the future, Juno will be updated accordingly.

Backups are stored on-chain, and the cost of a snapshot’s memory consumption is charged to the module itself. This means backups follow the lifecycle of your smart contracts—if the module is deleted, its backup is also removed.

---

## Frequency of Backups

Backups are automated during code upgrades, with the option to opt out. Alternatively, backups can be managed manually.

[console]: ../terminology.md#console
