Want to see how assertions and serverless logic are used in a live project?

Check out [proposals.network](https://proposals.network), an open-source app built with Juno:

- GitHub: [github.com/peterpeterparker/proposals.network](https://github.com/peterpeterparker/proposals.network)
- Example logic: [src/satellite/src/lib.rs](https://github.com/peterpeterparker/proposals.network/blob/main/src/satellite/src/lib.rs)

This app uses:

- `#[on_delete_doc]` and `#[assert_delete_doc]` to validate and clean up related documents and assets
- Shared helper modules like `assert`, `delete`, and `types` to keep logic organized
- A real-world pattern of chaining asset/document deletions with assertions

It’s a great reference for more advanced setups and multi-collection coordination.
