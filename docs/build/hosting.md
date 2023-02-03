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
2. Enter the desired domain name for your [satellite]
3. Log into your domain provider's site and configure the DNS records as indicated by Juno
4. Continue the process in Juno

Please note that it may take several minutes to set up your custom domain after the wizard is completed and up to 24 hours for your domain provider to reflect the changes.

## Authentication Considerations

For privacy reasons, Juno's [authentication](authentication.md) is linked to the domain you are using.

This means that if a user signs in to your app on the default domain (`ic0.app`) and your custom domain, they will be treated as two separate users.

This mechanism is in place to prevent tracking between sites. It is recommended to use only communicate one domain to your users to avoid any confusion.

[CLI]: ../miscellaneous/cli.md
[satellite]: ../terminology.md#satellite
[infrastructure]: ../category/infrastructure
