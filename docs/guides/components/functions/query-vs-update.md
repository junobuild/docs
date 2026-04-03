### Query vs. Update

A **query** is a read-only function. It returns data without modifying any state. Queries are fast and suitable for fetching or computing information.

An **update** is a function that can read and write state. Use it when your logic needs to persist data or trigger side effects. Updates can also be used for read operations when the response needs to be certified - making them suitable for security-sensitive use cases where data integrity must be guaranteed.
