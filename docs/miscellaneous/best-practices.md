---
sidebar_position: 7
---

# Best Practices

This page provides recommendations to improve your application when developing and deploying with Juno.

## Content Security Policy (CSP)

By default, a Satellite disables embedding your app in an iframe and sets various security headers - notably `X-Content-Type-Options`, `Strict-Transport-Security` and `Referrer-Policy` - to enhance protection against common web vulnerabilities.

However, Juno does not enforce a Content Security Policy (CSP) by default, as doing so could make the developer experience — especially for beginners — challenging.

That being said, we strongly recommend defining a CSP in your project for security reasons. A well-defined CSP helps prevent attacks such as cross-site scripting (XSS) and data injection.

### How to Set a CSP

You can define your CSP in one of two ways:

1. **Static Definition**

Add a CSP as the first `<meta>` tag of the `<head>` in your HTML file.

```html
<html>
  <head>
    <meta
      http-equiv="Content-Security-Policy"
      content="REPLACE_THIS_WITH_YOUR_RULES"
    />
  </head>
</html>
```

2. **Via Configuration**

Configure your Satellite to send a CSP header as part of the HTTP response. Headers can be configured as specified in this [chapter](../reference/configuration.mdx#http-headers) of the documentation.

```javascript
import { defineConfig } from "@junobuild/config";

export default defineConfig({
  satellite: {
    id: "qsgjb-riaaa-aaaaa-aaaga-cai",
    source: "dist",
    storage: {
      headers: [
        {
          source: "**/*",
          headers: [["Content-Security-Policy", "REPLACE_THIS_WITH_YOUR_RULES"]]
        }
      ]
    }
  }
});
```
