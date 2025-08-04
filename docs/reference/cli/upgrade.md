Upgrade a module to a new version.

```
Usage: juno upgrade [options]

Options:
  -t, --target          Which module type should be upgraded? Valid targets are satellite, mission-control or orbiter.
  -s, --src             A path to a specific local gzipped WASM file to publish.
  --clear-chunks        Clear any previously uploaded WASM chunks (applies if the WASM size is greater than 2MB).
  --no-snapshot         Skip creating a snapshot before upgrading.
  -r, --reset           Reset to the initial state.
  -m, --mode            Choose which environment to use (production, staging, development). Defaults to production if omitted.
  -p, --profile         Specify an optional profile to use (e.g. personal, team). Useful when managing multiple Mission Controls.
  --container-url       Override a custom container URL. If not provided, defaults to production or the local container in development mode.
  --console-url         Specify a custom URL to access the developer Console.
  -h, --help            Output usage information.

Notes:

- Resetting a mission control is not possible.
- Targets can be shortened to s for satellite, m for mission-control and o for orbiter.
```
