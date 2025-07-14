### Node.js Usage

In Node.js or outside the browser, you must explicitly pass a `satellite` parameter specifying the satellite configuration, so the function knows which satellite to target and how to connect to it.

This is required because `initSatellite()` is only available in browser environments.

:::important

You never need to set this parameter in a browser context.

:::
