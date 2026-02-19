## Advanced Configuration

You can optionally configure how authentication sessions behave on your Satellite.

These settings can be defined in your `juno.config` file and applied with `juno config apply` or adjusted directly in the Console under **Authentication → Setup**.

### Delegation

The `delegation` section defines how long sessions last and which modules authenticated users are allowed to call using their active session.

| Option            | Type                        | Default                      | Description                                                                                                                                                                                                                                                               |
| ----------------- | --------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allowedTargets`  | `PrincipalText[]` or `null` | restricted to this Satellite | List of modules (canisters on the Internet Computer) that authenticated users may call. Omit to restrict access to this Satellite only. Provide an array to allow calls only to specific targets. Set to `null` to allow calls to **any** backend (**use with caution**). |
| `sessionDuration` | `bigint`                    | 1 day                        | How long a user session remains valid, expressed in **nanoseconds**. Cannot exceed 30 days. Applies only to new sessions.                                                                                                                                                 |
