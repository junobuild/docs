---
id: ai
title: AI
description: Learn how to use Juno with AI tools, from llms.txt files for better context to an MCP server for managing your project through natural language.
---

# Using Juno with AI

Juno provides several ways to integrate with AI tools, from documentation context files to a full MCP server for managing your project through natural language.

- [LLMs.txt](#llmstxt): help AI tools better understand the platform
- [MCP Server](#mcp-server): interact with Juno directly from your AI tool

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

You must reference the Juno docs in chat using `@Docs` - Cursor won't use them otherwise.

:::

For example, you could start a conversation with: _I want to create a web shop app with Next.js using @Juno and @Juno (full)._

#### Resources

Read more in the [Cursor documentation](https://docs.cursor.com/context/@-symbols/@-docs).

---

## MCP Server

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server for Juno is available, built and maintained by a Juno community contributor. It allows MCP-compatible AI tools - such as Claude, Cursor, or VS Code Copilot - to interact with Juno directly through natural language.

It provides tools to manage identity, config, hosting, serverless functions, and changes - with built-in access to Juno's documentation. Long-running operations like deploys and publishes support real-time progress streaming.

:::note

This is a community-maintained project. It is not part of the core, but we absolutely 💙 it!

:::

### Setup

Follow these steps to connect the MCP server to your AI tool of choice.

#### 1. Add to your MCP client

No install needed - `npx` handles downloading automatically.

```json
{
  "mcpServers": {
    "junobuild": {
      "command": "npx",
      "args": ["-y", "junobuild-mcp-server"]
    }
  }
}
```

#### 2. Authenticate the Juno CLI

The server wraps the [Juno CLI](/docs/reference/cli), which must be installed and authenticated:

```bash
npm i -g @junobuild/cli
juno login
```

Once configured, you can interact with Juno directly through your AI tool. Just describe what you want in natural language - for example, _"deploy my satellite"_ or _"list my pending changes"_ - and the AI will call the right tools automatically.

### Resources

- [npm package](https://www.npmjs.com/package/junobuild-mcp-server)
- [Source repository](https://github.com/nami2111/junobuild-mcp)
