Handle snapshot-related tasks.

```bash
Usage: juno snapshot <subcommand> [options]

Subcommands:
  create               Create a snapshot of your current state.
  restore              Restore a previously created snapshot.
  delete               Delete an existing snapshot.

Options:
  -t, --target          Which module type should be snapshotted? Valid targets are satellite, mission-control or orbiter.
  -m, --mode            Set env mode. For example production or a custom string. Default is production.
  -h, --help            Output usage information.

Notes:

- Targets can be shortened to s for satellite, m for mission-control and o for orbiter.
```
