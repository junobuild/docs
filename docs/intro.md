---
sidebar_position: 1
---

# Getting started

Juno is a blockchain-as-a-service (“blockchainless”) platform that empowers developers to build decentralized apps efficiently. Similar to Web2 cloud service platforms but with significant improvements, it offers a comprehensive toolkit to scaffold secure and efficient projects running on the blockchain.

With Juno, developers can integrate features such as authentication, data and file storage, hosting, serverless functions, or on-chain analytics provided by smart contracts. This allows them to develop projects using familiar patterns while maintaining complete control over their work.

In short, Juno is the Google Firebase alternative for Web3.

## Launching with Juno

To begin with Juno, launch your first [Satellite](/docs/add-juno-to-an-app/create-a-satellite.md) – a feature-packed smart contract for your project.

This all-in-one container provides authentication, datastore (a key-pair store akin to a simple "database"), file storage, serverless functions and hosting capabilities.

## Starting a new project

Are you embarking on a new project? We've got your back.

Whether you're aiming to create a website, blog, or application, leverage Juno's onboarding CLI to scaffold your project. Our ready-made templates are developed with the most well-known frontend frameworks, including Astro, Next.js, React, SvelteKit, Vue, and Angular.

Just run

```bash
npm create juno@latest
```

...and follow the prompts.

:::note

Our CLI tool is compatible with Mac, Linux, and Windows and requires [NodeJS](https://nodejs.org/en) to be installed. It also supports Yarn and pnpm.

:::

## Integrating in an existing app

After creating your satellite, you're ready to put it to use. Follow our [step-by-step guidance](./add-juno-to-an-app/setup) to install the SDK and initialize your app, establishing communication with your satellite.

## Local development

Unsure about launching satellites in production? Primarily interested in local development?

Try our [local development emulator](./guides/local-development.md). It allows you to build and test your projects in an environment that closely mirrors production, without the commitment of a live deployment.

:::tip

The emulator is available with all starting templates. Run `npm create juno@latest` to start a new project.

:::

## Further Details

Explore the features of Juno through the detailed documentation:

- [Authentication](build/authentication.md)
- [Datastore](build/datastore.md)
- [Storage](build/storage.md)
- [Hosting](build/hosting.md)
- [Analytics](build/analytics.md)

## Learn concepts

Familiarize yourself with Juno's [infrastructure](category/infrastructure) and [architecture](architecture.md) to gain a better understanding of its operation.
