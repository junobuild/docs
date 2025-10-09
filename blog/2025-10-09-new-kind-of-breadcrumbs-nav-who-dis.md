---
slug: 2025-10-09-new-kind-of-breadcrumbs-nav-who-dis
title: New (kind of) breadcrumbs nav, who dis?
authors: [peterpeterparker]
tags: [release, ui, console]
date: 2025-10-09
---

![A screenshot of the new Console UI with navigation on the Datastore page](https://github.com/user-attachments/assets/ee45b372-4958-4634-8e12-3178399b7d4d)

I [tagged](https://github.com/junobuild/juno/releases/tag/v0.0.58) a new release as I deployed a new version of the [Console UI](https://console.juno.build/) to mainnet.

Aside from the updated navigation, which now displays the page title within breadcrumb-style navigation, and a few minor fixes, not much has changed feature-wise.

The biggest change in the frontend's codebase, which explains why so many files were touched, is a refactor to adopt the new pattern I’ve been using for DID declarations.

Instead of relying on auto-imported separate types, I now prefer grouping factories in a single module, exporting them from there, and importing the types through a suffixed module DID alias.

You can check out the pattern in Juno's [frontend](https://github.com/junobuild/juno/tree/main/src/frontend) codebase or in the [ic-client](https://github.com/junobuild/juno-js/tree/main/packages/ic-client) JS library. If you're curious about it, let me know.

It’s a small structural shift that makes the code much cleaner and more readable.

Finally, there are a few new E2E tests added in this repo and in the CLI.

To infinity and beyond 🍞✨<br />David
