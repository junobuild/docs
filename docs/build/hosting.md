---
sidebar_position: 4
---

# Hosting

Juno Hosting offers fast and secure hosting powered by 100% blockchain technology.

With just one [CLI] command, you can effortlessly deploy your web applications, static, and dynamic content to your [satellite].

---

## Custom Domain Support

You can maintain your unique brand identity with Juno Hosting. Use your custom domain, such as "yolo.com" or "hello.world.com", instead of the default domain name provided by Juno.

Our infrastructure automatically provisions an SSL certificate for each of your domains, ensuring secure connections for your users.

### Connecting Your Domain

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

---

## Configure Hosting behavior

You can configure customized hosting behavior for requests to your site.

#### What can you configure?

- Specify which `source` files in your local project directory you want to deploy? [Lean how.](#source)
- Ignore some files during deployment. [Lean how.](#ignore-files)
- Configure HTTP `headers` to pass along additional information about a request or a response. [Lean how.](#http-headers)
- Serve a customized 404/Not Found page.
- Set up `redirects` for pages that you've moved or deleted.
- Set up `rewrites`. [Lean how.](#rewrites)
- Customize the `encoding` behavior of your files. [Lean how.](#encoding-types)

#### Where do you define your Hosting configuration?

You define your Hosting configuration in your `juno.json` file. The CLI automatically creates the file at the root of your project directory when you run the [juno init](../miscellaneous/cli.md#init) or [juno deploy](../miscellaneous/cli.md#deploy) command for the first time.

### Source

Where should Juno search for the files to deploy in your project directory.

This is commonly the output folder of `npm run build`, such as `/dist` or `/build`.

### Ignore files

The `ignore` attribute allows you to exclude certain files from being deployed to your satellite.

This attribute works similarly to Git's `.gitignore`, and you can specify which files to ignore using globs.

Here is an example of how the ignore attribute can be utilized:

```json
{
  "satellite": {
    "satelliteId": "qsgjb-riaaa-aaaaa-aaaga-cai",
    "source": "dist",
    "ignore": ["**/*.txt", ".tmp/"]
  }
}
```

### HTTP Headers

Headers allow the client and the satellite to pass additional information along with a request or a response. Some sets of headers can affect how the browser handles the page and its content.

For instance, you may want to set a specific `Cache-Control` for performance reasons.

Here's an example of the `headers` object:

```json
{
  "satellite": {
    "satelliteId": "ddddd-ccccc-aaaaa-bbbbb-cai",
    "source": "dist",
    "storage": {
      "headers": [
        {
          "source": "/",
          "headers": [["Cache-Control", "public,max-age=0,must-revalidate"]]
        },
        {
          "source": "assets/fonts/*",
          "headers": [["Cache-Control", "max-age=31536000"]]
        },
        {
          "source": "**/*.jpg",
          "headers": [
            ["Cache-Control", "max-age=31536000"],
            ["Access-Control-Allow-Origin", "*"]
          ]
        }
      ]
    }
  }
}
```

This `source` attribute works similarly to Git's `.gitignore`, and you can specify which files match the headers using globs.

The `headers` is an array of objects, each containing `key` and `value`, and these apply to the matching paths.

:::note

- The `Content-Type` header is calculated automatically and cannot be altered.
- No validation or check for uniqueness is performed. For example, if a header matches a file based on multiple rules, multiple headers will be set.
- Likewise, if you provide the same header when you [upload](https://juno.build/docs/build/storage#upload-asset) file to your "Storage" and within the configuration, both headers will be set in the response.

:::

### Rewrites

You can utilize optional rewrites to display the same content for multiple URLs. Rewrites are especially useful when combined with pattern matching, allowing acceptance of any URL that matches the pattern.

Here's the basic structure for a `rewrites` attribute.

```json
{
  "satellite": {
    "satelliteId": "ddddd-ccccc-aaaaa-bbbbb-cai",
    "source": "dist",
    "storage": {
      "rewrites": [
        {
          "source": "/hello/**",
          "destination": "/hello/world.html"
        }
      ]
    }
  }
}
```

This `source` attribute works similarly to Git's `.gitignore`, and you can specify which files match the headers using globs.

:::note

- Rewrites are only applied to requests that do not match any existing resources.
- By default, all unknown paths are automatically rewritten to `/index.html` or `/404.html`. You cannot disable this default behavior.

:::

### Encoding types

When deploying, the CLI automatically maps the encoding type based on the file extension. The encoding information is then used in the satellite to provide the appropriate HTTP response header `Content-Encoding`.

The default mappings are as follows:

- `.Z` = `compress`
- `.gz` = `gzip`
- `.br` = `br`
- `.zlib` = `deflate`
- rest = `identity` (no compression)

You can also customize the encoding behavior by using the "encoding" attribute in the configuration file.

This attribute works similarly to Git's `.gitignore`, and you can specify which files to ignore using globs.

Here is an example of how the "encoding" attribute can be utilized:

```json
{
  "satellite": {
    "satelliteId": "qsgjb-riaaa-aaaaa-aaaga-cai",
    "source": "dist",
    "encoding": [["**/releases/*.gz", "identity"]]
  }
}
```

---

## Authentication Considerations

For privacy reasons, Juno's [authentication](authentication.md) is linked to the domain you are using.

This means that if a user signs in to your app on the default domain (`icp0.io`) and your custom domain, they will be treated as two separate users.

This mechanism is in place to prevent tracking between sites. It is recommended to use only communicate one domain to your users to avoid any confusion.

If you do want to migrate from the default domain to a custom domain without your users being treated as seperate users, you can make use of [alternative frontend origins](https://internetcomputer.org/docs/current/developer-docs/integrations/internet-identity/alternative-origins/).

[CLI]: ../miscellaneous/cli.md
[satellite]: ../terminology.md#satellite
[console]: ../terminology.md#console
