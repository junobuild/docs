# Development

Learn how to track page views, custom events, and performance metrics.

---

## Page views

Page views, such as when a visitor opens your website or navigates to a subpage, are automatically tracked once you have configured, initialized, and deployed your application with the analytics module.

There's **no need** for additional development work!

However, if you (really) want to trigger page view tracking manually, you can do so using the `trackPageView()` function provided by the SDK.

```typescript
import { trackPageView, trackPageViewAsync } from "@junobuild/analytics";

trackPageView(); // or await trackPageViewAsync();
```

---

## Track custom events

Custom events can be tracked using the `trackEvent` function. You need to provide a `name` for the event, and you can include up to 10 custom `metadata` fields.

:::note

This is an option. As explained in the previous chapter, the library will take care of gathering insightful anonymous data as soon as it is configured and initialized.

Custom events are useful if you want to take an extra step and collect your own specific information.

:::

Here's an example of how to use it:

```javascript
import { trackEvent, trackEventAsync } from "@junobuild/analytics";

// Fire-and-forget
trackEvent({
  name: "Your custom event",
  metadata: {
    your_key: "A value",
    your_other_key: "Another value"
  }
});

// Or await it if needed
await trackEvent({
  name: "Your custom event",
  metadata: {
    your_key: "A value",
    your_other_key: "Another value"
  }
});
```

Use the `async` version if you're tracking events for which you want to absolutely ensure delivery before continuing the flow — for example, before navigating away or submitting critical user input.

That said, the tracker sends data using `keepalive` fetch requests by default, so in most cases there’s no difference in reliability — the choice is mostly a matter of convenience and flow control.

:::important

For scalability and optimization reasons, the data collected must adhere to certain rules, particularly regarding their length. For instance, a randomly generated key should not exceed 36 bytes in length.

For detailed information about these rules, please refer to Juno's GitHub [repository](https://github.com/junobuild/juno).

:::

---

## Campaign tracking with UTM parameters

Juno Analytics automatically supports [UTM parameters](https://en.wikipedia.org/wiki/UTM_parameters) out of the box. These are standard query parameters (like `utm_source`, `utm_medium`, and `utm_campaign`) commonly added to links in newsletters, ads, and social posts to help you understand how visitors reach your app.

They're added to the end of a URL as query parameters. For example:

```
?utm_source=newsletter&utm_medium=email&utm_campaign=rocket-launch
```

As long as your URLs include UTM tags, campaign data will be collected and shown in your dashboard — no additional setup needed.

### Common UTM parameters

| Parameter      | Required | Description                         | Example                           |
| -------------- | -------- | ----------------------------------- | --------------------------------- |
| `utm_source`   | ✅       | Where the traffic comes from        | `newsletter`, `twitter`, `github` |
| `utm_medium`   |          | The channel used                    | `email`, `social`                 |
| `utm_campaign` |          | The name of the campaign            | `rocket-launch`                   |
| `utm_term`     |          | Keywords for paid search            | `juno+analytics`                  |
| `utm_content`  |          | Distinguish between different links | `header-button`, `footer-link`    |

Only the `utm_source` field is mandatory. If it's missing, the campaign will not be tracked.
