---
sidebar_position: 4
---

# Hosting

Juno Hosting offers fast and secure hosting powered by 100% blockchain technology.

With just one [CLI] command, you can effortlessly deploy your web applications, static, and dynamic content to your [satellite].

## Custom Domain Support

You can maintain your unique brand identity with Juno Hosting. Use your custom domain, such as "yolo.com" or "hello.world.com", instead of the default domain name provided by Juno.

Our infrastructure automatically provisions an SSL certificate for each of your domains, ensuring secure connections for your users.

## Connecting Your Domain

To connect your custom domain, follow these steps:

1. Start the custom domain wizard from the Juno console [hosting](https://console.juno.build/hosting) page
2. Enter the desired domain name for your satellite
3. Log into your domain provider's site and configure the DNS records as indicated by Juno
4. Continue the process in Juno

Please note that it may take several minutes to set up your custom domain after the wizard is completed and up to 24 hours for your domain provider to reflect the changes.

### About DNS records

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

### Status

The status of the configuration of your custom domain can be one of the following:

- `PendingOrder`: The registration request has been submitted and is waiting to be picked up.
- `PendingChallengeResponse`: The certificate has been ordered.
- `PendingAcmeApproval`: The challenge has been completed.
- `Available`: The registration request has been successfully processed. Your custom domain is ready.
- `Failed`: The registration request failed.

If one of the status `Pending...` is reached, the console will automatically refresh the status every few seconds until your domain is available.

## Authentication Considerations

For privacy reasons, Juno's [authentication](authentication.md) is linked to the domain you are using.

This means that if a user signs in to your app on the default domain (`icp0.io`) and your custom domain, they will be treated as two separate users.

This mechanism is in place to prevent tracking between sites. It is recommended to use only communicate one domain to your users to avoid any confusion.

If you do want to migrate from the default domain to a custom domain without your users being treated as seperate users, you can make use of [alternative frontend origins](https://internetcomputer.org/docs/current/developer-docs/integrations/internet-identity/alternative-origins/).

[CLI]: ../miscellaneous/cli.md
[satellite]: ../terminology.md#satellite
[console]: ../terminology.md#console
