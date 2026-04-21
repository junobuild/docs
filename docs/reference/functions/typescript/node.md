# Node.js

The TypeScript runtime used in Juno does not provide full Node.js support. Polyfills are added iteratively to keep the environment stable and predictable.

If you require a specific Node.js feature or are blocked by a missing polyfill, please reach out or open an issue. Features are prioritized based on usage and compatibility.

The following globals are available out of the box, without any imports.

---

## Math.random

Generates a pseudo-random number between 0 (inclusive) and 1 (exclusive).

However, the generator is seeded once after upgrade of the Satellite. Use it with caution.

:::caution

Randomness is unsuitable for use cases requiring unpredictable results, like lotteries.

:::

```typescript
const value = Math.random();
```

---

## Console

Logging is fully supported. Objects are stringified and logs are routed to the IC-CDK `print()` function, making them visible in your Satellite logs including inside the Juno Console UI in development or production.

```typescript
console.log("Hello from the Satellite");
console.info("Hello", { type: "info", msg: "Something happened" });
```

---

## Blob

`Blob` represents immutable raw binary data.

```typescript
const blob = new Blob(["Hello from the Satellite"], { type: "text/plain" });
const text = await blob.text();
```

---

## URL

Parses and manipulates URLs with `URL` and `URLSearchParams`.

```typescript
const url = new URL("https://example.com?foo=bar");
console.log(url.hostname); // example.com
console.log(url.searchParams.get("foo")); // bar
```
