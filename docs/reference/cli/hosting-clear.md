Remove frontend files (JS, HTML, CSS, etc.) from your satellite.

```
Usage: juno hosting clear [options]

Options:
  -f, --fullPath        Clear a particular file of your app.
  -m, --mode            Choose which environment to use (production, staging, development). Defaults to production if omitted.
  -p, --profile         Specify an optional profile to use (e.g. personal, team). Useful when managing multiple Mission Controls.
  --container-url       Override a custom container URL. If not provided, defaults to production or the local container in development mode.
  --console-url         Specify a custom URL to access the developer Console.
  -h, --help            Output usage information.
```
