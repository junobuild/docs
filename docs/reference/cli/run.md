Run a custom script in the CLI context.

```
Usage: juno run [options]

Options:
  -s, --src             The path to your JavaScript or TypeScript script.
  -m, --mode            Choose which environment to use (production, staging, development). Defaults to production if omitted.
  -p, --profile         Specify an optional profile to use (e.g. personal, team). Useful when managing multiple Mission Controls.
  --container-url       Override a custom container URL. If not provided, defaults to production or the local container in development mode.
  -h, --help            Output usage information.
```
