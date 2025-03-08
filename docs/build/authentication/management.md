# Management

This page provides an overview of the administrative functions available in the Juno Console related to user management.

---

## Banning Users

The built-in authentication feature allows developers to ban or unban users within their dapps. When a user is banned, they lose access to key services such as Datastore and Storage, preventing them from creating, updating, or deleting any data. This feature helps developers prevent misuse, spam, or abusive behavior in their applications.

:::note

A ban is not a deletion. The user’s authentication entry remains in the system, and they can be unbanned at any time.

:::

### How to Ban a User

To ban a user, follow these steps:

- Navigate to the Authentication section in the [console](https://console.juno.build).
- Find the user you want to ban in the users' table.
- Click on the Active / Ban button at the start of the row.
- Confirm the action.

Once banned, the user will not be able to sign in, create, update, or delete data in Datastore or Storage.

![A screenshot of the Juno Console's Authentication section, displaying the user management interface with options to ban or unban users](../../img/satellite/user-management-ban.webp)
