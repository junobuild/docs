### Certified Reads

All read functions support a `certified` option that can be enabled to guarantee cryptographic verification of the returned data.

By default, uncertified reads are used for better performance and UX. Those are faster but do not provide cryptographic guarantees.

When `options.certified` is enabled, the function performs an update call under the hood. This ensures the response is verified by the Internet Computer but may increase latency.

#### When to Use Certified Reads

Certified reads matter when trust in displayed information is more important than speed, or when your app exposes publicly verifiable data — such as user balances, or voting results.

For those use cases, a common pattern is deduplicating the call: making an uncertified call for UX purposes — fetching and displaying data quickly — and an update call in parallel, which might take longer but ensures verification. If the latter fails, revert the information and warn users about the issue.
