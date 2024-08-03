---
slug: how-to-redirect-a-route-after-renaming-it
title: How to Redirect a Route After Renaming It
authors: [peterpeterparker]
tags: [tutorial, routing, seo]
image: https://images.unsplash.com/photo-1525011268546-bf3f9b007f6a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

![](https://images.unsplash.com/photo-1525011268546-bf3f9b007f6a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

_Photo by [Nick Fewings](https://unsplash.com/fr/@jannerboy62?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/fr/photos/fleche-blanche-peinte-sur-un-mur-de-briques-zF_pTLx_Dkg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)_

---

## Introduction

Renaming a route in your web application is a common task, but it’s crucial to handle it correctly to avoid breaking links and negatively impacting your SEO. Redirecting the old route to the new one ensures a seamless user experience and maintains your site's search engine rankings.

In this blog post, we’ll guide you through the steps to set up a redirection after renaming one of your pages.

<!--truncate-->

---

## Why Redirecting is Important

Redirecting an old route to a new one is essential for several reasons:

- **SEO**: Search engines index your site's URLs. If you change a route without setting up a redirection, search engines might treat it as a broken link, which can hurt your rankings.

- **User Experience**: Users who have bookmarked the old URL or found it through search engines or external links will face a 404 error if the route is changed without a redirection.

- **Preserving Traffic**: Redirecting helps in preserving the traffic and link equity that the old URL had built over time.

---

## Why Not Just JavaScript

While you might consider using JavaScript to handle redirects on the client side, this approach has several significant drawbacks:

- **SEO Limitations**: Search engines may not execute JavaScript redirects as reliably as server-side redirects. This can lead to indexing issues and lower search engine rankings.

- **Performance**: Client-side redirects can cause a delay because the browser must load the initial page before executing the redirect, resulting in a slower user experience.

- **Accessibility**: Not all users have JavaScript enabled in their browsers. Client-side redirects won't work for these users, leading to broken links and a poor user experience.

- **Consistency**: Redirects handled by your smart contract are processed before the page is sent to the browser, ensuring a more consistent and immediate redirection experience for all users.

For these reasons, it's best to handle redirects through configurations, ensuring they are fast, reliable, and SEO-friendly.

---

## Step-by-Step Guide

### 1. Rename the Route

First, rename the route in your code. This might involve changing the path in your routing configuration file, as well as updating any references to this route throughout your application.

### 2. Deploy the Update

Deploy your updated website using GitHub Actions or by running the `juno deploy` command in your terminal. This step ensures that your changes are live and the new route is accessible.

### 3. Set Up the Redirection in Juno Config

Next, configure the redirection in your Juno configuration. This involves specifying the old route and the new route so that requests to the old route are redirected to the new one.

For example, we recently renamed [https://juno.build/docs/add-juno-to-an-app/install-the-sdk-and-initialize-juno](https://juno.build/docs/add-juno-to-an-app/install-the-sdk-and-initialize-juno) to [https://juno.build/docs/add-juno-to-an-app/setup](https://juno.build/docs/add-juno-to-an-app/setup). Therefore, we added the following redirection in our [juno.config.ts](https://github.com/junobuild/docs/blob/main/juno.config.ts) file:

```typescript
import { defineConfig } from "@junobuild/config";

export default defineConfig({
  satellite: {
    id: "ucnx3-aqaaa-aaaal-ab3ea-cai",
    source: "build",
    storage: {
      redirects: [
        {
          source:
            "/docs/add-juno-to-an-app/install-the-sdk-and-initialize-juno",
          location: "/docs/add-juno-to-an-app/setup",
          code: 301
        }
      ]
    }
  },
  orbiter: {
    id: "3iier-sqaaa-aaaal-aczaa-cai"
  }
});
```

Note that we set up a 301 status code to indicate that the requested resource has been permanently moved to the new URL.

### 4. Clear the Previous Route

Before applying the new configuration, clear the old route using the `juno clear -f` path command.

```bash
juno clear -f /path/to/old/route
```

For example, using the same example as in the previous step, we ran the following command to remove the deprecated route:

```bash
juno clear -f /docs/add-juno-to-an-app/install-the-sdk-and-initialize-juno
```

We remove the old route because when you deploy, it always writes (updates or adds) new resources, meaning the page that was removed is still available. This is done to avoid breaking backlinks, similar to why you want to set up a redirect. By clearing the old route, we also ensure the configuration can be set up correctly.

> Note that you can also delete all assets with `juno clear` and redeploy with `juno deploy` or clear and deploy with `juno deploy --clear`. However, removing a single asset requires fewer resources and is therefore less costly.

### 5. Apply the Config

Finally, apply the new configuration with the `juno config` command. This updates the routing settings to include the redirection.

```
juno config
```

Tada! Your old route now seamlessly redirects to the new one, and your website continues to run smoothly. 🥳

---

## Conclusion

By following these steps, you can successfully rename a route and set up a redirection in Juno. This approach helps maintain your SEO rankings, provides a better user experience, and ensures that your traffic remains intact.

👋

---

Stay connected with Juno by following us on [X/Twitter](https://twitter.com/junobuild).

Reach out on [Discord](https://discord.gg/wHZ57Z2RAG) or [OpenChat](https://oc.app/community/vxgpi-nqaaa-aaaar-ar4lq-cai/?ref=xanzv-uaaaa-aaaaf-aneba-cai) for any questions.

⭐️⭐️⭐️ stars are also much appreciated: visit the [GitHub repo](https://github.com/junobuild/juno) and show your support!
