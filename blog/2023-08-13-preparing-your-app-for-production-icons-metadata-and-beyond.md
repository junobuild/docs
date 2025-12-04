---
slug: preparing-your-app-for-production-icons-metadata-and-beyond
title: "Preparing Your App for Production: Icons, Metadata, and Beyond"
authors: [peterpeterparker]
tags: [production, launch, metadata, icons]
image: https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDkyMzV8MHwxfHNlYXJjaHw0Nnx8YWJzdHJhY3R8ZW58MHx8fHwxNjY0NDI4NDU5&ixlib=rb-1.2.1&q=80&w=1080
---

![](https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDkyMzV8MHwxfHNlYXJjaHw0Nnx8YWJzdHJhY3R8ZW58MHx8fHwxNjY0NDI4NDU5&ixlib=rb-1.2.1&q=80&w=1080)

_Photo by [Sebastian Svenson](https://unsplash.com/@sebastiansvenson)_

---

So, your decentralized application is all set for its [Juno](https://juno.build) launch. But have you made sure that your icons, social images, web manifest, sitemaps, and robots settings are correctly configured for production?

These elements are not only important technically but also contribute to improving its presence on different social platforms and enhancing your app's visibility on search engines (SEO).

To help you with this crucial task, here's a comprehensive list of recommendations to prepare your web application for these purposes.

<!--truncate-->

---

## Introduction

To set up the essential metadata for a project, we require the following information to begin:

- **Title**: This is the name of your application or product.
- **Description**: Craft a tagline or catchy selling phrase that captures its essence.
- **Icon**: An image in a square format used to generate favicons (note the plural).
- **Social image**: Another image, with a ratio of 1.9:1, used to generate preview cards on platforms like Twitter, Facebook, LinkedIn, and more.

---

## Meta tags

Search engines utilize the content they crawl for purposes of indexing, ranking, and rendering. However, they still take into account the presence of meta tags within the HTML for search indexation as well.

Similarly, the crawlers of social platforms seek out meta tags to generate the social media content that's showcased whenever a link is shared.

This underscores the necessity of furnishing a diverse range of meta tags and images for our dapps.

---

### HTML tags

A straightforward category of information we can establish is often the HTML elements found within the `<head />` container of our HTML pages.

It's both common and advisable to set a `<title />` and a `<description />`. On occasion, I also include an `<author /> tag.

There are two other aspects that are of utmost importance:

1.  Firstly, setting the appropriate language for the document in alignment with its content. While not directly tied to this tutorial, if you're providing meta tags in Spanish, it's beneficial to also label the document accordingly.
2.  Secondly, in cases where your content is duplicated across the web — like maintaining a blog on multiple platforms — or if you wish to highlight the relationship between multiple pages, it's critical to offer `canonical` links. These links inform search engines that they shouldn't index the same content multiple times. Otherwise, it could lead to a potential drop in ranking (based on my understanding).

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />

    <title>Juno</title>
    <meta
      content="Build serverless apps with self-hosting control"
      name="description"
    />

    <link href="https://juno.build" rel="canonical" />
  </head>
</html>
```

Resources:

- [https://www.w3schools.com/html/html_head.asp](https://www.w3schools.com/html/html_head.asp)
- [https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

---

### og: tags

Open Graph meta tags, often referred to as `og:` tags, are snippets of code that wield control over how our applications appear when shared on social platforms.

In essence, these tags determine what shows up when our URLs are shared on platforms like Facebook, LinkedIn, and Discord, among others.

Among the plethora of available tags, we typically employ only the following five for Juno's websites and applications:

1.  `og:title`: This represents the app's title or, when dealing with multiple pages, a title pertinent to the content of that page. For instance, in the context of a blog, it could be the specific title of a post.
2.  `og:description`: Similar to the title, this tag caters to the description.
3.  `og:url`: This tag corresponds to the content's URL. To streamline interconnected data, I follow a similar approach as with `canonical` URLs.
4.  `og:type`: Commonly set as `website` for a page or `article` in the case of a blog post.
5.  `og:image`: This entails an absolute URL pointing to the social image (for further insights about its format, refer to the chapter below).

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Here same HTML tags as previous chapter -->

    <meta content="Juno" property="og:title" />
    <meta
      content="Build serverless apps with self-hosting control"
      property="og:description"
    />
    <meta content="website" property="og:type" />
    <meta content="https://juno.build" property="og:url" />
    <meta
      content="https://juno.build/images/social-image.jpg"
      property="og:image"
    />
  </head>
</html>
```

Resources:

- [https://ogp.me/](https://ogp.me/)

---

### twitter: tags

While Open Graph tags are indeed interpreted (to the best of my knowledge), it's important to note that Twitter has its own distinct set of meta tags. This makes it essential to also furnish these tags to exert control over how our applications are showcased when shared on this particular platform.

The possibilities for display vary, but we typically configure the following properties to generate "summary cards":

1.  `twitter:card`: This specifies the type of card or tweet. We prefer using `summary_large_image` as it aligns well with the dimensions of the social images I employ.
2.  `twitter:title`: Designated for the product or page's title.
3.  `twitter:description`: Reserved for a captivating phrase or tagline.
4.  `twitter:image`: An absolute URL linking to the social image.
5.  `twitter:creator`: Relates to the Twitter handle of either the product or its creator.

It's crucial to keep in mind that tweets are limited to 280 characters without premium features, encompassing the information we provide. This limitation is something to consider while crafting the metadata for sharing on Twitter.

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Here same HTML tags as previous chapter -->
    <!-- Here same og: tags as previous chapter -->

    <meta content="summary_large_image" name="twitter:card" />
    <meta content="Juno" name="twitter:title" />
    <meta
      content="Build serverless apps with self-hosting control"
      name="twitter:description"
    />
    <meta
      content="https://juno.build/images/social-image.jpg"
      name="twitter:image"
    />
    <meta content="@JunoBuild" name="twitter:creator" />
  </head>
</html>
```

Resources:

- [https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image)

---

## Social image

Providing the social image follows a single rule: it must be accompanied by an absolute URL—meaning it should not be given as an absolute path. Crawlers may not interpret it accurately if presented in this manner.

```html
<!-- This works -->
<meta
  content="https://juno.build/images/social-image.jpg"
  name="twitter:image"
/>

<!-- This does NOT work -->
<meta content="/images/social-image.jpg" name="twitter:image" />
```

In terms of format and content, as a best practice, we recommend creating an image with dimensions of `1200x630` pixels for optimal display across all devices. It's advisable to use traditional image formats such as `PNG` or `JPG`.

Considering its display on both small and large screens, a single image serves all screen sizes. Hence, during its design, it's important to ensure the content is composed in a way that it fits seamlessly everywhere.

---

## Favicons

Favicons have come a long way from the traditional `favicon.ico` we used to place at the root of our websites in the good old days (😉). While it's still important to provide a favicon for browsers, we now need to consider various devices as well. Vendors have introduced diverse methods for defining icons that come into play when our applications and sites are added to a device's home screen.

Furthermore, there are new meta tags available that allow us to specify additional capabilities. For instance, we can set the theme color that envelops the browser's URL bar on mobile devices.

Here's how we can generate this data:

1.  We design an icon and export it as `png` or `jpg` in a square format, such as `1080x1080` pixels.
2.  We visit [https://realfavicongenerator.net/](https://realfavicongenerator.net/) to leverage this tool for generating a comprehensive set of data for favicons and theme information.
3.  While the above tool already provides all the necessary data, we prefer to personalize the icons it generates with our own variations. Thus, we export icons in various dimensions (`48x48`, `72x72`, `96x96`, `144x144`, `192x192`, `256x256`, `384x384`, and `512x512` pixels).
4.  We copy both our icons and the generated data into the static assets of our applications.
5.  Finally, we incorporate the relevant meta tags into our HTML pages.

By following this process, we ensure that our icons are well-optimized and tailored for different platforms, ultimately enhancing the overall user experience.

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Here same HTML tags as previous chapter -->
    <!-- Here same og: tags as previous chapter -->
    <!-- Here same twitter: tags as previous chapter -->

    <link href="/favicon-32x32.png" rel="icon" type="image/png" />
    <meta content="#000000" name="theme-color" />

    <link href="/icons/icon-48x48.png" rel="apple-touch-icon" sizes="48x48" />
    <link href="/icons/icon-72x72.png" rel="apple-touch-icon" sizes="72x72" />
    <link href="/icons/icon-96x96.png" rel="apple-touch-icon" sizes="96x96" />
    <link
      href="/icons/icon-144x144.png"
      rel="apple-touch-icon"
      sizes="144x144"
    />
    <link
      href="/icons/icon-192x192.png"
      rel="apple-touch-icon"
      sizes="192x192"
    />
    <link
      href="/icons/icon-256x256.png"
      rel="apple-touch-icon"
      sizes="256x256"
    />
    <link
      href="/icons/icon-384x384.png"
      rel="apple-touch-icon"
      sizes="384x384"
    />
    <link
      href="/icons/icon-512x512.png"
      rel="apple-touch-icon"
      sizes="512x512"
    />

    <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#7888ff" />
    <meta name="msapplication-TileColor" content="#ffeed6" />
    <meta name="msapplication-config" content="/icons/browserconfig.xml" />
  </head>
</html>
```

Resources:

- [https://realfavicongenerator.net/](https://realfavicongenerator.net/)

---

### Maskable icons

While the process outlined above works well for most devices, it's advisable to also utilize adaptive icons, also known as "maskable icons," specifically for Android devices. These icons are designed to display consistently across various shapes on different device models.

For this purpose, we typically create an additional icon, shaping it using [https://maskable.app/editor](https://maskable.app/editor) to ensure it fits seamlessly across various devices. This icon is then exported in all the dimensions we mentioned in the previous chapter. This step ensures that the icon maintains its visual integrity and looks cohesive across different Android devices.

Resources:

- [https://web.dev/maskable-icon/](https://web.dev/maskable-icon/)
- [https://maskable.app/editor](https://maskable.app/editor)

---

## Web app manifest

The web app manifest is a file that informs the browser about our web application's behavior when it's installed on a user's desktop or mobile device.

This file should be provided by our smart contract using the correct JSON mime type (`application/json`). It's usually named `manifest.webmanifest` or `manifest.json` and is served from the root of our websites. These files encompass the same meta information we discussed earlier, but they can also offer additional features, such as shortcuts and screenshots.

Despite being located in a top-level directory, the web app manifest should still be referenced in the HTML pages.

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Here same HTML tags as previous chapter -->
    <!-- Here same og: tags as previous chapter -->
    <!-- Here same twitter: tags as previous chapter -->
    <!-- Here same favicons and other info as previous chapter -->

    <link crossorigin="anonymous" href="/manifest.webmanifest" rel="manifest" />
  </head>
</html>
```

The tool we mentioned earlier - Favicon Generator - offers a basic web app manifest that we enhance with our custom icons.

Additionally, there is currently a workaround we need to implement to ensure the discoverability of our icons on iOS devices and address a limitation of the Internet Computer. To allow iPhones to interpret our icons, we have to link them to their addresses on the less secure .raw. domain. This approach means that while certifications won't be verified (unfortunately), the images themselves will be recognized. Of course, this workaround assumes our comfort with this approach. We can also hold optimism that this issue will be rectified on the Internet Computer platform in the future.

```json
{
  "name": "Juno",
  "short_name": "Juno",
  "start_url": "/",
  "background_color": "#000000",
  "theme_color": "#000000",
  "display": "standalone",
  "icons": [
    {
      "src": "https://satellite-id.raw.icp0.io/icons/icon-48x48.png",
      "sizes": "48x48",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "https://satellite-id.raw.icp0.io/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "https://satellite-id.raw.icp0.io/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "https://satellite-id.raw.icp0.io/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "https://satellite-id.raw.icp0.io/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "https://satellite-id.raw.icp0.io/icons/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "https://satellite-id.raw.icp0.io/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "https://satellite-id.raw.icp0.io/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "https://satellite-id.raw.icp0.io/icons/maskable-48x48.png",
      "sizes": "48x48",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "https://satellite-id.raw.icp0.io/icons/maskable-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "https://satellite-id.raw.icp0.io/icons/maskable-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "https://satellite-id.raw.icp0.io/icons/maskable-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "https://satellite-id.raw.icp0.io/icons/maskable-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "https://satellite-id.raw.icp0.io/icons/maskable-256x256.png",
      "sizes": "256x256",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "https://satellite-id.raw.icp0.io/icons/maskable-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "https://satellite-id.raw.icp0.io/icons/maskable-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

Resources:

- [https://web.dev/add-manifest/](https://web.dev/add-manifest/)
- [https://developer.mozilla.org/en-US/docs/Web/Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)

---

## Sitemap.xml

Sitemaps are valuable tools that assist search engines in comprehending which pages should be crawled and indexed. Although I assume they might be less essential for single-page applications, I still prefer to provide this information regardless.

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
    <url>
    <loc>https://juno.build/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    </url>

</urlset>
```

The `sitemap.xml` is an file; therefore, it should be served by our canister with the appropriate mime type (`application/xml`). Additionally, it should be referenced within our HTML pages.

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Here same HTML tags as previous chapter -->
    <!-- Here same og: tags as previous chapter -->
    <!-- Here same twitter: tags as previous chapter -->
    <!-- Here same favicons and other info as previous chapter -->
    <!-- Here link to web app manifest -->

    <link href="/sitemap.xml" rel="sitemap" type="application/xml" />
  </head>
</html>
```

Resources:

- [https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

---

## Robots.txt

At this point, we've established everything necessary for search engines and social platforms. However, crawlers might not be able to read this information just yet. This is why we need to incorporate a `robots.txt` file at the root of our site to dictate how they should access our content.

If our intention is to have all crawlers index our entire app, we can communicate this by targeting all `User-agent: \*` and allowing unrestricted access with `Allow: /`.

Additionally, we can once again provide the URL to our sitemap and host information within this file.

```
User-agent: *
Allow: /
Sitemap: https://juno.build/sitemap.xml
Host: https://juno.build
```

Resources:

- [https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt)

---

## Summary

To prepare our dapps comprehensively for launch in production, we need to address the following aspects:

1.  A title
2.  A description or an enticing selling point
3.  Icons
4.  A social image

Alongside this, we have to meticulously set up metadata within:

- All HTML pages of our application
- A web app manifest
- A sitemap.xml

And we should not forget to enable crawlers to access our content by defining a robots.txt.

---

👋

Stay connected with Juno by following us on [Twitter](https://twitter.com/junobuild).

And if you made it this far, we’d love to have you join the Juno community on [Discord](https://discord.gg/wHZ57Z2RAG). 😉

⭐️⭐️⭐️ stars are also much appreciated: visit the [GitHub repo](https://github.com/junobuild/juno) and show your support!
