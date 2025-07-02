---
id: ai
title: AI
description: Learn how to use Juno's llms.txt files to provide AI tools with better context for building serverless functions, deploying satellites, and integrating the SDK.
---

# Using Juno with AI

If you’re using AI to build with Juno, you can use our `llms.txt` files to help AI tools better understand the platform.

---

## LLMs.txt

An [LLMs.txt](https://llmstxt.org/) file is a plain text file that provides instructions or metadata for large language models (LLMs). It often specifies how LLMs should process or interact with content. It's similar to a `robots.txt` or `sitemap.xml` file, but tailored for AI models.

### Available routes

We provide several `llms.txt` routes. Use the one that works best with your AI tool:

- [`llms.txt`](https://juno.build/llms.txt): Table of contents with links to individual Markdown docs
- [`llms-full.txt`](https://juno.build/llms-full.txt): Entire documentation in a single Markdown file

### How to use it

Here are some examples of how the `llms.txt` files can be used with AI tools.

:::note

🙏 Help us improve! If you use a tool that supports LLMs.txt files, [open a pull request](https://github.com/junobuild/docs/edit/main/docs/guides/ai.md) to add your example to this page.

:::

### Cursor

You can add custom documentation as context in Cursor using the `@Docs` feature or by navigating to `Cursor Settings` > `Features` > `Docs`. [Read more about it here](https://docs.cursor.com/context/@-symbols/@-docs).
