---
title: Development
description: Learn how to use development identities for local testing or E2E with Juno without external authentication providers.
keywords: [dev, local development, testing, localhost]
---

# Local Development and E2E

Implementing Google, Internet Identity, or Passkeys requires some setup and doesn't always fit best in a local development environment or E2E test suite. For example, they take various steps to complete and therefore consume repetitive time.

Local dev identities skip all that.

They let you test authentication flows instantly - no setup, no external services, no waiting. Just one click with names like "alice" or "bob", and you're signed in.

:::caution

**For local development only** - works exclusively on `localhost` and `127.0.0.1`.

:::

---

## How It Works

1. You optionally provide an identifier (e.g., "alice", "bob"). Default is "dev".
2. A deterministic identity is generated on the client side from that identifier.
3. The identifier is stored in IndexedDB and reused across sessions.
4. You can switch between different dev identities easily.

:::note

Given the deterministic nature of these identities, as mentioned above, they cannot be used in production.
That's why the library prevents any usage outside of localhost.

:::

---

## Sign-In

```typescript
import { signIn } from "@junobuild/core";

// ⚠️ LOCAL DEVELOPMENT ONLY - Replace with a real provider for production
await signIn({
  dev: {}
});
```

---

## Options

| Option                        | Type     | Default | Description                                                 |
| ----------------------------- | -------- | ------- | ----------------------------------------------------------- |
| `identifier`                  | `string` | `"dev"` | Unique identifier for this dev identity (max 32 characters) |
| `maxTimeToLiveInMilliseconds` | `number` | 7 days  | How long the session lasts in milliseconds                  |

Example:

```typescript
// ⚠️ LOCAL DEVELOPMENT ONLY - Replace with a real provider for production
await signIn({
  dev: {
    identifier: "alice",
    maxTimeToLiveInMilliseconds: 24 * 60 * 60 * 1000 // 1 day
  }
});
```

---

---

## Managing Identifiers

During development, you may want to see which identities you've used or clear them out.

---

### Load

Retrieve all previously used dev identifiers, sorted by most recent first:

```typescript
import { loadDevIdentifiers } from "@junobuild/ic-client/dev";

// ⚠️ DEV UTILITY - Not needed for production apps
const identifiers = await loadDevIdentifiers();
// [['alice', { createdAt: 1234567890, updatedAt: 1234567899 }], ...]

// You can also limit results
const recent = await loadDevIdentifiers({ limit: 5 });
```

---

### Clear

Remove all stored dev identifiers from browser's IndexedDB:

```typescript
import { clearDevIdentifiers } from "@junobuild/ic-client/dev";

// ⚠️ DEV UTILITY - Not needed for production apps
await clearDevIdentifiers();
```

:::note

Clearing identifiers only removes the usage history.

:::

---

## Recommendations

- ⚠️ **Never use in production** - automatically blocked on non-localhost domains
- Use different identifiers to test multi-user scenarios
- Switch to real providers (Google, Internet Identity, Passkeys) before deploying
