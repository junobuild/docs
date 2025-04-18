# Node.js

The TypeScript runtime used in Juno does not provide full Node.js support. Polyfills are added iteratively to keep the environment stable and predictable.

If you require a specific Node.js feature or are blocked by a missing polyfill, please reach out or open an issue. Features are prioritized based on usage and compatibility.

---

## Globals

Some global functions are supported but come with important limitations or added details.

### Math.random

Generates a pseudo-random number between 0 (inclusive) and 1 (exclusive) is supported.

However, the generator is seeded once after upgrade of the Satellite. Use it with caution.

:::caution

Randomness is unsuitable for use cases requiring unpredictable results, like lotteries.

:::

```typescript
const value = Math.random();
```

---

### Console

Logging is fully supported. Objects are stringified and logs are routed to the IC-CDK `print()` function, making them visible in your Satellite logs including inside the Juno Console UI in development or production.

```typescript
console.log("Hello from the Satellite");
console.info("Hello", { type: "info", msg: "Something happened" });
```
