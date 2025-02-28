Upgrade a module to a new version.

```bash
Usage: juno upgrade [options]

Options:
  -t, --target          Which module type should be upgraded? Valid targets are satellite, mission-control or orbiter.
  -s, --src             An optional local gzipped WASM file for the upgrade. By default, the CDN will be used.
  -r, --reset           Reset to the initial state.
  -cc, --clear-chunks   Clear any previously uploaded WASM chunks (applies if the WASM size is greater than 2MB).
  -ns, --no-snapshot    Skip creating a snapshot before upgrading.
  -m, --mode            Set env mode. For example production or a custom string. Default is production.
  -h, --help            Output usage information.

Notes:

- Resetting a mission control is not possible.
- Targets can be shortened to s for satellite, m for mission-control and o for orbiter.
```
