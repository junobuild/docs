## Real-World Example

Want to see how assertions and serverless logic are used in a live project?

Check out [cycles.watch](https://cycles.watch), an open-source app built with Juno:

- GitHub: [github.com/peterpeterparker/cycles.watch](https://github.com/peterpeterparker/cycles.watch)
- Example logic: [src/satellite/index.ts](https://github.com/peterpeterparker/cycles.watch/blob/main/src/satellite/index.ts)

This app uses:

- `assertSetDoc` to validate requests
- `onSetDoc` to implement a swap-like feature that performs various canister calls
- Service modules to keep logic organized
- A real-world pattern for chaining calls and document insertions with assertions

It’s a great reference for more advanced setups and orchestration.
