---
slug: analytics-campaign-tracking
title: Analytics Campaign Tracking
authors: [peterpeterparker]
tags: [release, analytics, tracking, bots]
date: 2025-06-01
---

Hi 👋

A new release v0.0.50 is out! 🚀

This one brings two improvements to the Analytics:

📣 Campaign tracking is now supported! Just use standard UTM tags in your links — traffic sources like newsletters, ads, and social posts will show up directly in your dashboard. No extra setup needed.

```bash
# For example
https://myapp.com/?utm_source=newsletter&utm_medium=email&utm_campaign=spring-launch
```

🤖 Bot detection has also been improved by using HTTP headers directly from the container smart contract (instead of those passed in the requests). More accurate and secure that way.

Enjoy! 🧪📊

---

- Docs 👉 https://juno.build/docs/build/analytics/
- Release notes 👉 https://github.com/junobuild/juno/releases/tag/v0.0.50

![Analytics UTM tracking](https://us1.discourse-cdn.com/flex023/uploads/dfn/optimized/3X/f/1/f1ba65f76421ede1f8daa4fc33634fd8739113c5_2_1226x1000.jpeg)
