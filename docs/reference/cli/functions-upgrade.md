Upgrade your serverless functions.

```
Usage: juno functions upgrade [options]

Options:
  --cdn                 Select a previously published WASM file from the CDN (interactive).
  --cdn-path            Use a specific published WASM file from the CDN.
  --clear-chunks        Clear any previously uploaded WASM chunks (applies if the WASM size is greater than 2MB).
  --no-snapshot         Skip creating a snapshot before upgrading.
  -r, --reset           Reset to the initial state.
  -s, --src             A path to a specific local gzipped WASM file to publish.
  -h, --help            Output usage information.

Notes:

- If no option is provided, the default local build output will be used.
- If --src is specified, it takes precedence over any CDN options.
- Use --cdn to interactively select from recent published releases.
```
