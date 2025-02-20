# Development

This section covers how to integrate and configure Juno Analytics in your app or website, including setting up an orbiter, installing the SDK, tracking page views, custom events, and performance metrics.

---

## Getting Started

Before integrating Juno Analytics into your app or website, you need to create an orbiter. Here's a step-by-step guide to help you get started:

1. Sign in to the Juno [Console](https://console.juno.build)
2. Navigate to [Analytics](https://console.juno.build/analytics/)
3. Click on **Get started**
4. Confirm by selecting **Create analytics**

The platform will then create your orbiter smart contract and provision its resources. Once the process is complete, click "Close" to terminate the creation wizard.

At this point, you have successfully created the analytics; however, you have not yet listed which satellites are eligible to track page views and events.

5. To complete the configuration, proceed to the Analytics/**Settings** page to configure them.

---

## Install the SDK and initialize the Orbiter

To start using Juno Analytics, follow these steps:

1. Install Juno's analytics library using npm:

```bash
npm i @junobuild/analytics
```

2. Initialize the orbiter in your web app or website:

If you are using the [Next.js](../../miscellaneous/plugins.md#nextjs-plugin) or [Vite](../../miscellaneous/plugins.md#vite-plugin) plugins, simply initialize the orbiter in your application, preferably as soon as possible when your app starts.

```typescript
import { initOrbiter } from "@junobuild/analytics";

await initOrbiter();
```

If you are not using the plugins, you will also need to provide the `satelliteId` and `orbiterId` manually as configuration.

```typescript
import { initOrbiter } from "@junobuild/analytics";

// TODO: Replace the following satelliteId and orbiterId with the effective ID.
await initOrbiter({
  satelliteId: "aaaaa-bbbbb-ccccc-ddddd-cai",
  orbiterId: "eeeee-fffff-ddddd-11111-cai"
});
```

3. Copy the pre-packaged web worker provided by the library to your `public` or `static` folder, where your project's static assets are located.

- You can achieve this by adding a post-install script to your `package.json`. Here's an example of an inline command:

```json
{
  "scripts": {
    "postinstall": "node -e \"require('fs').cpSync('node_modules/@junobuild/analytics/dist/workers/', './static/workers', {recursive: true});\""
  }
}
```

- Alternatively, you can create a script, e.g., `copy-juno-workers.mjs`, at the root of your project with the following code:

```javascript
import { cp } from "node:fs";
import { extname } from "node:path";

await cp(
  "node_modules/@junobuild/analytics/dist/workers/",
  "./static/workers",
  {
    recursive: true
  },
  (err) => {
    if (err === null) {
      return;
    }

    console.error(err);
  }
);
```

Finally, add a command to your `package.json` that executes the script:

```json
{
  "scripts": {
    "postinstall": "node ./scripts/copy-juno-workers.mjs"
  }
}
```

4. Once configured, run `npm run postinstall` manually to trigger the initial copy. Every time you run `npm ci`, the post-install target will execute, ensuring the worker is copied.

:::info

- The above example assumes that `/static` is the folder holding your static assets (e.g., images, favicons, etc.). Adjust the path according to your application. For example with React, the static folder might sometimes be called `/public`.

- If you prefer to specify a custom path for the worker, you can use the `initOrbiter` function with the additional parameter `{worker?: {path?: string}}` for this purpose.

- In the explanation above, analytics are initialized for any use case. However, it is recommended not to initialize them during local development. This helps avoid cluttering your data with test results and minimizes the amount of cycles required to collect statistics.

:::

---

## Page views

Page views, such as when a visitor opens your website or navigates to a subpage, are automatically tracked once you have configured, initialized, and deployed your application with the analytics module.

There's **no need** for additional development work!

---

## Track custom events

Custom events can be tracked using the `trackEvent` function. You need to provide a `name` for the event, and you can include up to 10 custom `metadata` fields.

:::note

This is an option. As explained in the previous chapter, the library will take care of gathering insightful anonymous data as soon as it is configured and initialized.

Custom events are useful if you want to take an extra step and collect your own specific information.

:::

Here's an example of how to use it:

```javascript
import { trackEvent } from "@junobuild/analytics";

await trackEvent({
  name: "Your custom event",
  metadata: {
    your_key: "A value",
    your_other_key: "Another value"
  }
});
```

This allows you to track specific events and gather data relevant to your application.

:::note

For scalability and optimization reasons, the data collected must adhere to certain rules, particularly regarding their length. For instance, a randomly generated key should not exceed 36 bytes in length.

For detailed information about these rules, please refer to Juno's GitHub [repository](https://github.com/junobuild/juno).

:::

---

## Performance Metrics with Web Vitals

Juno Analytics also tracks performance metrics using [Web Vitals](https://github.com/GoogleChrome/web-vitals) with no additional setup required. Once you configure and initialize the orbiter, these metrics are automatically collected, providing valuable insights into your application's performance.

### Key Metrics

The following Web Vitals are tracked:

- **Time to First Byte <small>(TTFB)</small>**: Measures the time it takes for the first byte of data to reach the user's browser, indicating server responsiveness.
- **First Contentful Paint <small>(FCP)</small>**: Marks the time when the first piece of content is rendered, helping assess initial loading speed.
- **Largest Contentful Paint <small>(LCP)</small>**: Tracks the time when the largest content element becomes visible, indicating when the main content is likely fully loaded.
- **Cumulative Layout Shift <small>(CLS)</small>**: Quantifies unexpected layout shifts during loading, reflecting visual stability.
- **Interaction to Next Paint <small>(INP)</small>**: Measures the latency of interactions, such as clicks, to evaluate application responsiveness.

### Opting Out

While these metrics are gathered automatically, developers have the option to opt out during the initialization of the Orbiter. To opt out, simply modify the `initOrbiter` function. If you choose to opt out, the Web Vitals library will not be loaded, ensuring that no additional resources are used.

Here's an example of how to opt out:

```typescript
import { initOrbiter } from "@junobuild/analytics";

await initOrbiter({
  satelliteId: "aaaaa-bbbbb-ccccc-ddddd-cai",
  orbiterId: "eeeee-fffff-ddddd-11111-cai",
  options: {
    performance: false
  }
});
```
