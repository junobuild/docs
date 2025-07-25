Deploy your app to your satellite.

```
Usage: juno deploy [options]

Options:
  -c, --clear           Clear existing app files before proceeding with deployment.
  --no-apply            Submit the deployment as a change but do not apply it yet.
  -k, --keep-staged     Keep staged assets in memory after applying the change.
  -i, --immediate       Deploy files instantly (bypasses the change workflow).
  -m, --mode            Choose which environment to use (production, staging, development). Defaults to production if omitted.
  --container-url       Override a custom container URL. If not provided, defaults to production or the local container in development mode.
  --console-url         Specify a custom URL to access the developer Console.
  -h, --help            Output usage information.

Notes:

- The option --keep-staged only applies when --no-apply is NOT used (i.e. the change is applied immediately).
```
