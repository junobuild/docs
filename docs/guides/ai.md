---
id: ai
title: AI
description: Learn how to use Juno's llms.txt files to provide AI tools with better context for building serverless functions, deploying satellites, and integrating the SDK.
---

# Using Juno with AI

If you're using AI to build with Juno, you can use our `llms.txt` files to help AI tools better understand the platform.

---

## LLMs.txt

An [LLMs.txt](https://llmstxt.org/) file is a plain text file that provides instructions or metadata for large language models (LLMs). It often specifies how LLMs should process or interact with content. It's similar to a `robots.txt` or `sitemap.xml` file, but tailored for AI models.

---

### Available routes

We provide several `llms.txt` routes.

- [`llms.txt`](pathname:///llms.txt): Table of contents with links to individual Markdown docs
- [`llms-full.txt`](pathname:///llms-full.txt): Entire documentation in a single Markdown file

Most AI tools work best with one of these formats. Some tools (like Cursor) can benefit from indexing both. Use the combination that works best with your workflow.

### How to use it

Here are some examples of how the `llms.txt` files can be used with AI tools.

:::note

🙏 Help us improve! If you use a tool that supports LLMs.txt files, [open a pull request](https://github.com/junobuild/docs/edit/main/docs/guides/ai.md) to add your example to this page.

:::

### Cursor

You can use custom documentation in Cursor's context using the `@Docs` feature.

#### Setup

To add custom documentation, type `@Docs` and select **Add new doc**, or go to `Cursor Settings` > `Features` > `Docs`.

Add both `llms.txt` URLs:

| Name        | Entry point                                       |
| ----------- | ------------------------------------------------- |
| Juno        | [llms.txt](https://juno.build/llms.txt)           |
| Juno (full) | [llms-full.txt](https://juno.build/llms-full.txt) |

Cursor will index all subpages and use both files to improve context and coverage.

#### Usage

Type `@Docs` in chat to view available docs and select the Juno entries to begin using the references.

:::important

You must reference the Juno docs in chat using `@Docs` — Cursor won't use them otherwise.

:::

For example, you could start a conversation with: _I want to create a web shop app with Next.js using @Juno and @Juno (full)._

#### Resources

Read more in the [Cursor documentation](https://docs.cursor.com/context/@-symbols/@-docs).
