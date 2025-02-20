# Development

Learn how to track page views, custom events, and performance metrics.

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
