# Schema Types

Juno provides a type system built on top of [Zod](https://zod.dev/), extended with a few additional types you'll need when working with serverless functions.

All types are available through `j`.

```typescript
import { j } from "@junobuild/schema";
```

---

## Juno Types

The following are specific types provided by Juno:

### j.principal()

Validates and represents an Internet Computer Principal.

```typescript
j.principal();
```

### j.uint8array()

Validates and represents a `Uint8Array`.

```typescript
j.uint8array();
```

---

## Zod Types

All Zod types are available through `j`. Refer to the [Zod documentation](https://zod.dev/) for the full API reference.

:::note

`union` is not supported. Use `discriminatedUnion` instead.

:::
