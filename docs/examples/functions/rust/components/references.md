## References

- [Serverless Functions Guide](../../../../guides/rust.mdx)
- [Functions Development](../../../../build/functions/index.md)
- [Rust SDK Reference](../../../../reference/functions/rust/sdk.mdx)
- [Rust Utils Reference](../../../../reference/functions/rust/utils.mdx)
- [Run Local Development](../../../../guides/local-development.mdx)
- [CLI Reference](pathname:///docs/reference/cli)
- [Configuration Reference](../../../../reference/configuration.mdx)
- [Datastore Collections](../../../../build/datastore/collections.md)

---

## Crate Docs

These crates are used to build and extend serverless functions in Rust with Juno:

- [junobuild-satellite](https://docs.rs/junobuild-satellite): Core features and runtime for building a Satellite in Rust, including hooks, assertions, and datastore integration.
- [junobuild-macros](https://docs.rs/junobuild-macros): Procedural macros for declaratively attaching hooks and assertions.
- [junobuild-utils](https://docs.rs/junobuild-utils): Utility helpers for working with documents, including data encoding, decoding, and assertion context handling.
- [junobuild-shared](https://docs.rs/junobuild-shared): Shared types and helpers for Juno projects. Used by all containers including the Console.
- [junobuild-storage](https://docs.rs/junobuild-storage): Storage helpers for working with assets and HTTP headers in Juno.
