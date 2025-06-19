Build your serverless functions.

```
Usage: juno functions build [options]

Options:
  -l, --lang            Specify the language for building the serverless functions: rust, typescript or javascript.
  --cargo-path          Path to the Rust manifest.
  --source-path         Optional path to the TypeScript or JavaScript entry file.
  -w, --watch           Rebuild your functions automatically when source files change.
  -h, --help            Output usage information.

Notes:

- If no language is provided, the CLI attempts to determine the appropriate build.
- Language can be shortened to rs for Rust, ts for TypeScript and mjs for JavaScript.
- Use --cargo-path to specify a specific crate path. For Rust builds, this maps to --manifest-path for cargo build. For TypeScript and JavaScript, it points to the Rust crate (commonly "Sputnik") that imports the functions.
- An optional --source-path to specify the source file for TypeScript and JavaScript (e.g. index.ts or index.mjs).
- The watch option rebuilds when source files change, with a default debounce delay of 10 seconds; optionally, pass a delay in milliseconds.
```
