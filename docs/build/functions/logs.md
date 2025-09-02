# Logs

Writing and viewing logs is a crucial tool for debugging and monitoring your code. Serverless Functions offer you the option to utilize loggers to report status effectively.

![A screenshot of the Juno's Console feature to browse logs](../../img/satellite/functions.webp)

---

## Native Logging

The Internet Computer provides a native, simple logging system where logs are persisted within the state up to a maximum size of 4 KiB.

:::note

If new logs exceed the 4 KiB limit, the oldest entries will be removed. Logs persist across Satellite upgrades.

:::

These logs are the preferred method for writing and viewing logs, as they are more efficient and cost-effective compared to the custom solution below. They also persist regardless of whether the update call succeeds or fails.

However, native logs do not yet support log levels, that's why all entries will appear as "Error" in the Juno Console.

Any printed or trapped messages using the `ic_cdk` crate are automatically collected as logs.

### Example Usage

```rust
fn log() {
    ic_cdk::print("This is a log entry.");

    ic_cdk::trap("There was an error.");
}
```

---

## Custom Logging

Custom logging provides a flexible way to track and debug function executions within your Satellite if the native logging does not answer your needs.

### How does it work?

Logs are stored in stable memory, accommodating up to 100 entries. Once this limit is reached, the oldest entry is discarded. It's important to note that since logs are saved in memory, your hooks should return a success—meaning they should not trap—otherwise, the information cannot be preserved.

### Available loggers

| Logger            | Level   | Description                                                    |
| ----------------- | ------- | -------------------------------------------------------------- |
| `log`             | Info    | Logs a message.                                                |
| `log_with_data`   | Info    | Logs a message with additional serialized data.                |
| `info`            | Info    | Logs an informational message.                                 |
| `info_with_data`  | Info    | Logs an informational message with additional serialized data. |
| `debug`           | Debug   | Logs an debug-level message.                                   |
| `debug_with_data` | Debug   | Logs a debug-level message with additional serialized data.    |
| `warn`            | Warning | Logs a warning message.                                        |
| `warn_with_data`  | Warning | Logs a warning message with additional serialized data.        |
| `error`           | Error   | Logs an error message.                                         |
| `error_with_data` | Error   | Logs an error message with additional serialized data.         |
