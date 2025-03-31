Build your serverless functions.

```
Usage: juno dev build [options]

Options:
  -l, --lang            Specify the language for building the serverless functions: rust, typescript or javascript.
  -p, --path            Path to the source to bundle.
  -w, --watch           Rebuild your functions automatically when source files change.
  -h, --help            Output usage information.

Notes:

- If no language is provided, the CLI attempts to determine the appropriate build.
- Language can be shortened to rs for Rust, ts for TypeScript and mjs for JavaScript.
- The path option maps to --manifest-path for Rust (Cargo) or to the source file for TypeScript and JavaScript (e.g. index.ts or index.mjs).
- The watch option rebuilds when source files change, with a default debounce delay of 10 seconds; optionally, pass a delay in milliseconds.
```
