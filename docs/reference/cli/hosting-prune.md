Remove stale frontend files from your satellite that are no longer in your build output.

```
Usage: juno hosting prune [options]

Options:
  --batch               Number of files to prune in parallel per batch (default: 100).
  --dry-run             List stale files that would be deleted without actually deleting them.
  -m, --mode            Choose which environment to use (production, staging, development). Defaults to production if omitted.
  -p, --profile         Specify an optional profile to use (e.g. personal, team). Useful when managing multiple Mission Controls.
  --container-url       Override a custom container URL. If not provided, defaults to production or the local container in development mode.
  --console-url         Specify a custom URL to access the developer Console.
  -h, --help            Output usage information.
```
