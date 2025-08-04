Publish a new version of your serverless functions.

```
Usage: juno functions publish [options]

Options:
  --no-apply            Submit the release as a change but do not apply it yet.
  -k, --keep-staged     Keep staged assets in memory after applying the change.
  -s, --src             A path to a specific local gzipped WASM file to publish.
  -m, --mode            Choose which environment to use (production, staging, development). Defaults to production if omitted.
  -p, --profile         Specify an optional profile to use (e.g. personal, team). Useful when managing multiple Mission Controls.
  --container-url       Override a custom container URL. If not provided, defaults to production or the local container in development mode.
  --console-url         Specify a custom URL to access the developer Console.
  -h, --help            Output usage information.

Notes:

- The option --keep-staged only applies when --no-apply is NOT used (i.e. the change is applied immediately).
```
