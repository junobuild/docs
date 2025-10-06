---
slug: offline-snapshots-with-the-cli
title: Offline Snapshots with the CLI
authors: [peterpeterparker]
tags: [release, cli, scripts, snapshot, offline]
date: 2025-10-06
---

Hi 👋

Here is a small but handy update for your toolbox: you can now **download and upload snapshots offline** with the Juno CLI. 🧰

That means you can:

- Keep a local copy of your module’s state
- Stash it somewhere safe, just in case :sweat_smile:
- Restore it when needed
- Or even move it between Satellites

```bash
juno snapshot download --target satellite
juno snapshot upload --target satellite --dir .snapshots/0x00000060101
```

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">👋 No Juno livestream today, but here&#39;s a little gift for your toolbox.<br/><br/>You can now download and upload snapshots OFFLINE with the CLI. 🧰💾 <a href="https://t.co/IW5jHyEBTD">pic.twitter.com/IW5jHyEBTD</a></p>&mdash; Juno (@junobuild) <a href="https://twitter.com/junobuild/status/1975184397402812752?ref_src=twsrc%5Etfw">October 6, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
