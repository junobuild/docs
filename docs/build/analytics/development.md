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
