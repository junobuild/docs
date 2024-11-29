Handle backup-related tasks.

```bash
Usage: juno dev <subcommand> [options]

Subcommands:
  create               Create a backup of your current state.
  restore              Restore a previously created backup.
  delete               Delete an existing backup

Options:
  -t, --target          Which module type should be backed up? Valid targets are satellite, mission-control or orbiter.
  -m, --mode            Set env mode. For example production or a custom string. Default is production.
  -h, --help            Output usage information.

Notes:

- Targets can be shortened to s for satellite, m for mission-control and o for orbiter.
```
