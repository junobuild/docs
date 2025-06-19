Start a module.

```
Usage: juno start [options]

Options:
  -t, --target          Which module type should be started? Valid targets are satellite, mission-control or orbiter.
  -m, --mode            Set env mode. For example production or a custom string. Default is production.
  --container-url       Override a custom container URL. If not provided, defaults to production or the local container in development mode.
  --console-url         Specify a custom URL to access the developer Console.
  -h, --help            Output usage information.

Notes:

- Targets can be shortened to s for satellite, m for mission-control and o for orbiter.
```
