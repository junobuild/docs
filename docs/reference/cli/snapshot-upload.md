Upload a snapshot from offline files.

```
Usage: juno snapshot upload [options]

Options:
  --dir                 Path to the snapshot directory that contains the metadata.json and chunks.
  -t, --target          Which module type should be snapshotted? Valid targets are satellite, mission-control or orbiter.
  --target-id           The module ID of a specific target to upload the snapshot to.
  -m, --mode            Choose which environment to use (production, staging, development). Defaults to production if omitted.
  -p, --profile         Specify an optional profile to use (e.g. personal, team). Useful when managing multiple Mission Controls.
  --container-url       Override a custom container URL. If not provided, defaults to production or the local container in development mode.
  --console-url         Specify a custom URL to access the developer Console.
  -h, --help            Output usage information.

Notes:

- Targets can be shortened to s for satellite, m for mission-control and o for orbiter.
```
