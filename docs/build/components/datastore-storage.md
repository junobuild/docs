Juno gives you two ways to persist data. Both follow a collections-based architecture, but they serve different purposes and behave differently in practice.

| Feature                | **Datastore** (Structured)       | **Storage** (Files)                           |
| ---------------------- | -------------------------------- | --------------------------------------------- |
| Use case               | App state, user profiles, config | Images, files, generated user content         |
| Data format            | JSON-like documents              | Binary files                                  |
| Identifier             | `key` (string you define)        | `fullPath` (auto or custom)                   |
| Accessible via web URL | No                               | Yes                                           |
| Size limit             | Max 2 MB per document            | Chunked; limited by available Satellite space |

**`key` vs `fullPath`**

Both Datastore and Storage use a unique identifier per item — but they refer to different things and are used differently.

- **Datastore → `key`**:
  - A unique string you assign to each document within a collection.
  - Used to retrieve, update, or delete a specific document.
  - Commonly a UUID (e.g. `crypto.randomUUID()`), a nanoid, or any meaningful string like a slug or user ID.
  - Example: `bafkb4by...`, `user:42`, or `config/theme`.

- **Storage → `fullPath`**:
  - The full path of an asset used to build a valid web URL.
  - It's automatically generated from the uploaded filename unless explicitly set.
  - The `fullPath` must include the collection name (except for your app's frontend assets like HTML, JS, etc.).
  - Used to serve, list, or delete files.
  - Example: `/images/logo.png` (collection: `images`) or `/avatars/user42/profile.jpg` (collection: `avatars`).
