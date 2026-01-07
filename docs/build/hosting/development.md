# Development

This section covers how to configure and manage your custom domain in Juno, including setting up DNS records, troubleshooting common issues, and ensuring compatibility with various domain providers.

---

## Connecting Your Domain

To connect your custom domain, follow these steps:

1. Start the custom domain wizard from the Juno console [hosting](https://console.juno.build/hosting) page
2. Enter the desired domain name for your Satellite
3. Log into your domain provider's site and configure the DNS records as indicated by Juno
4. Continue the process in Juno

Please note that it may take several minutes to set up your custom domain after the wizard is completed and up to 24 hours for your domain provider to reflect the changes.

---

## DNS records

To configure DNS records, you will be requested to use `CNAME` records. Some domain providers do not provide such types. Instead, DNS providers often support so-called `CNAME` flattening. To this end, these DNS providers offer flattened record types, such as `ANAME` or `ALIAS` records, which can be used instead of the `CNAME` to `icp1.io`.

Some DNS providers require you to specify the main domain. For example, you might have to specify your full domain `foo.bar.com` for the `CNAME` entry related to `icp1.io` instead of only `foo` as displayed by our [console].

If you ever encounter issues configuring your DNS, you can also refer to the [Troubleshooting](https://internetcomputer.org/docs/current/developer-docs/production/custom-domain/#troubleshooting) section for further assistance.

### Cloudflare

The DNS entries presented in the console are exactly the ones that should be configured in Cloudflare.

However, based on our experience, to enable the custom domain properly, the following settings in Cloudflare should be disabled:

- DNS > Settings > Disable DNSSEC
- SSL/TLS > Overview > Set "Your SSL/TLS encryption mode" to "Off (not secure)". A SSL certificate will be automatically ordered by configuring the custom domain.
- SSL/TLS > Edge Certificates > Disable Universal SSL

Additionally, we recommend not proxying the DNS entries ("DNS only").

### Namecheap

This external guide provides instructions on how to configure the DNS records for [Namecheap](https://internetcomputer.org/docs/current/developer-docs/production/custom-domain/dns-setup#namecheap).

### GoDaddy

This external guide provides instructions on how to configure the DNS records for [GoDaddy](https://internetcomputer.org/docs/current/developer-docs/production/custom-domain/dns-setup#godaddy).

### Google Domains

Google Domains does not support `CNAME` records for the apex domain. For this reason, we suggest transferring the domain to [Cloudflare](#cloudflare).

### Other Limited Providers

We are aware of a few other providers that also do not support `CNAME` records for the apex domain. Similar to Google Domains, we advise transferring the domain to [Cloudflare](#cloudflare) in order to overcome this limitation.

- HostGator
- Infomaniak

---

## Status

The status of the configuration of your custom domain can be one of the following:

:::tip

⏳ DNS propagation can take time! It may take several minutes to hours for changes to fully take effect. If your domain is not working as expected, avoid making multiple changes, as this can cause further delays.

If you're having trouble, feel free to reach out for assistance—we’re happy to help!

:::

- `PendingOrder`: The registration request has been submitted and is waiting to be picked up.
- `PendingChallengeResponse`: The certificate has been ordered.
- `PendingAcmeApproval`: The challenge has been completed.
- `Available`: The registration request has been successfully processed. Your custom domain is ready.
- `Failed`: The registration request failed.

If one of the status `Pending...` is reached, the console will automatically refresh the status every few seconds until your domain is available.

[console]: ../../terminology.md#console
