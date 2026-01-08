# FAQ

### Where do I find support?

For help and questions about best practices, join our [Discord](https://discord.gg/wHZ57Z2RAG) channel. You can report issue or bug on [GitHub](https://github.com/junobuild/juno).

### How much does it cost?

Getting started is free. Developers are responsible for operating costs. Transaction costs may apply for some features. [Detailed information and estimations](./pricing.md) are available.

### What are credits?

Credits are not money or tokens, they're simply Juno's way of helping you get started, like saying "drinks on us".

- 1 credit lets you spin up one module without requiring payment (see [Pricing](./pricing.md)).
- Every new developer starts with 2 credits, enough to create a Mission Control and a Satellite to get going.

Sometimes, additional credits can be granted - for example, during onboarding or when launching exciting projects. Reach out if you need more.

### How do I verify an upgrade?

Before approving an upgrade, developers can verify the proposed changes by checking the release details on [GitHub](https://github.com/junobuild/juno/releases). Each release includes a list of modules proposed for update, along with a checksums.txt file that contains the SHA-256 hashes of the module binaries. For example:

```
68c1978c4fe7ad98cc95fd73e20f42feaf66f010e8fe91a7047116001dfcab13  ./console.wasm.gz
31647e69cd5a3639bda65300e37a8f44eb5feb3562e81f29c1ab17a31a867b42  ./mission_control.wasm.gz
87a18c56889690a05adf2b4289b911714c0ac6449108ae0c588203680c2c54d2  ./observatory.wasm.gz
5a74b1224a5a5d14e5d9f0ebe49a4ba6d51780dbde983525b5ef16a976c28f14  ./orbiter.wasm.gz
40b77e22e13aee86ac3872352640443fa27a9bdc098847f15bfafe844a9f58ab  ./satellite.wasm.gz
```

If the hash of a module differs from the one listed in the release, the upgrade should not be approved. It's also important to check the release notes to confirm which modules are actually included in the update, as the build process always prints all hashes.

Developers can also validate the data by querying the [CDN](https://github.com/junobuild/cdn), which provides each module with a certificate. Since the CDN itself is backed by a Juno Satellite, this guarantees that the delivered WebAssembly modules have not been tampered with.

For reproducibility, developers can run the official Docker build for Juno and its modules. If everything matches, the same versions should be produced.

### What happens if Juno disappears?

In the unlikely event of Juno's disappearance, you, as the sole controller of your [mission control] and [satellites], would retain full control over your creations. They would continue to function independently without any reliance on Juno.

### Can I just deploy my website on the Internet Computer?

Absolutely! With Juno, you have the flexibility to choose the level of functionality you want for your project. Whether you simply want to host your static website on the [Internet Computer] or take advantage of Juno's rich features like [authentication](build/authentication/index.md), [datastore](build/datastore/index.mdx), and [storage](build/storage/index.mdx) for building dynamic dapps, the choice is yours.

### Is Juno a project of the DFINITY foundation?

No, Juno is an independent project. In 2024, we received a [Developer Grant](https://dfinity.org/grants/) from the [DFINTIY foundation](https://dfinity.org) to grow the ecosystem, ease developer onboarding, and enhance visual communication. For 2025, the Foundation is funding the project to further expand the developer ecosystem and advance the Internet Computer.

### Does Juno exercise control over developers' work?

No, Juno does not exert any control over developers' work. Juno is designed to provide developers with true control and autonomy over their projects.

Developers have full ownership and control over their [mission control], [satellites], and the applications they build on the platform.

Juno's philosophy aligns with the principles of Web3, empowering developers with transparency, decentralization, and the freedom to create and innovate without external interference.

### How does Juno differ from Firebase?

Besides the fundamental differences between the Web2 and Web3 approaches, which empower developers using Juno with true control and future governance over their work, there are additional distinctions that apply regardless of the underlying philosophy.

#### Source

Firebase is a closed-source Backend as a Service that restricts access to the underlying details and limits the ability to make custom modifications.

In contrast, Juno is fully [open-source](https://github.com/junobuild/), providing transparency and the flexibility to customize as needed.

#### Pricing

Firebase follows a usage-based pricing model, where costs are calculated based on factors like request volume and data storage. The absence of a cap-setting option is a cause for concern, as unexpected spikes in usage can result in substantial expenses.

In contrast, Juno takes a different approach. Developers pre-charge their modules with [cycles](terminology.mdx#cycles), which are then utilized to cover computation and memory usage. This mechanism eliminates the risk of encountering unexpected financial burdens due to unforeseen usage surges.

### Do you have a library for [some other language]?

We officially support [JavaScript](setup-the-sdk.mdx) for anything frontend.

Extending serverless functions is done in [Rust](build/functions/development/rust.mdx) or [TypeScript](build/functions/development/typescript.mdx).

Community-supported libraries and contributions are warmly welcomed.

### Where can I find resources about Juno?

The [documentation](./intro.mdx) is a great starting point to explore Juno.

Additionally, the [blog](https://juno.build/blog) provides insightful tutorials for various frameworks.

You can also check out the [guides](/docs/category/guides), which feature examples to help you get started.

---

Do you have more questions or need further assistance? Feel free to reach out to us on [Discord](https://discord.gg/wHZ57Z2RAG) or [Twitter](https://twitter.com/junobuild). We're here to help!

[mission control]: terminology.mdx#mission-control
[satellites]: terminology.mdx#satellite
[Internet Computer]: https://internetcomputer.org/
