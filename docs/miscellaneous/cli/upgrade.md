Upgrade your satellite to a specific version code.

```bash
Usage: juno upgrade [options]

Options:
  -t, --target          What type of segment should be upgraded. Valid targets are satellite, mission-control or orbiter.
  -s, --src             A local gzipped wasm file for the upgrade.
  -r, --reset           Reset to the initial state.
  -n, --nocheck         Skip assertions and execute upgrade without prompts.
  -m, --mode            Set env mode. For example production or a custom string. Default is production.
  -h, --help            Output usage information.

Notes:

- Resetting a mission control is not possible.
- Disabling checks bypasses the verification of the target hash and skips the validation for build types.
- Targets can be shortened to s for satellite, m for mission-control and o for orbiter.
```
