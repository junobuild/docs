---
id: rust
title: Rust
description: Code serverless Functions
toc_min_heading_level: 2
toc_max_heading_level: 2
sidebar_position: 6
---

# Code Functions in Rust

Explore serverless functions written in Rust for Juno projects.

## Table of contents

- [Quickstart](#quickstart)
- [Hooks and Data Operations](#hooks-and-data-operations)
- [HTTP outcalls](#http-outcalls)

---

## Quickstart

Learn how to set up your environment to develop additional features for a [satellite].

:::note

Make sure you have Juno's [CLI](/docs/miscellaneous/cli#installation) tool installed on your machine.

:::

At the root of application, eject the Satellite. This step prepares your project for local development. Open your terminal and run:

```bash
juno dev eject
```

In a new terminal window, kick off the local development environment that leverages Docker:

```bash
juno dev start
```

Now, your local development environment is up and running, ready for you to start coding.

Once you're ready to see your changes in action, compile your code:

```bash
juno dev build
```

The local environment detects changes and automatically deploys them, allowing you to test your custom code locally almost immediately.

---

## Hooks and Data Operations

Serverless Functions are triggered by hooks, which in turn respond to events executed in the Satellite, such as setting a document. Before we delve into implementing a hook that manipulates data, let's first set up a JavaScript function in your frontend dApp.

Define a setter function in your frontend dApp as follows:

```typescript
import { nanoid } from "nanoid";

interface Example {
  hello: string;
}

let key: string | undefined;

const set = async () => {
  key = nanoid();

  const record = await setDoc<Example>({
    collection: "demo",
    doc: {
      key,
      data: {
        hello: "world"
      }
    }
  });

  console.log("Set done", record);
};
```

This code generates a key using `nanoid` and persists a document in a collection named "demo" in the Datastore.

Additionally, add a getter to your code:

```typescript
const get = async () => {
  if (key === undefined) {
    return;
  }

  const record = await getDoc({
    collection: "demo",
    key
  });

  console.log("Get done", record);
};
```

Without a hook, executing these two operations one after the other would result in a record containing "hello: world".

Now, let's create a hook in the Satellite you've ejected, within `src/satellite/src/lib.rs`. Replace the default empty `on_set_doc` hook with the following implementation:

```rust
use ic_cdk::print;
use junobuild_macros::{
    on_delete_asset, on_delete_doc, on_delete_many_assets, on_delete_many_docs, on_set_doc,
    on_set_many_docs, on_upload_asset,
};
use junobuild_satellite::{
    include_satellite, set_doc_store, OnDeleteAssetContext, OnDeleteDocContext,
    OnDeleteManyAssetsContext, OnDeleteManyDocsContext, OnSetDocContext, OnSetManyDocsContext,
    OnUploadAssetContext, SetDoc,
};
use junobuild_utils::{decode_doc_data, encode_doc_data};
use serde::{Deserialize, Serialize};

// The data of the document we are looking to update in the Satellite's Datastore.
#[derive(Serialize, Deserialize)]
struct Person {
    hello: String,
}

// We tells the hooks that we only want to listen to changes in collection "demo".
#[on_set_doc(collections = ["demo"])]
async fn on_set_doc(context: OnSetDocContext) -> Result<(), String> {
    // We decode the new data saved in the Datastore because it holds those as blob.
    let mut data: Person = decode_doc_data(&context.data.data.after.data)?;

    // We update the document's data that was saved in the Datastore with the call from the frontend dapp.
    // i.e. the frontend saved "hello: world" and we enhance it to "hello: world checked"
    data.hello = format!("{} checked", data.hello);

    // We encode the data back to blob.
    let encode_data = encode_doc_data(&data)?;

    // We construct the parameters required to call the function that save the data in the Datastore.
    let doc: SetDoc = SetDoc {
        data: encode_data,
        description: context.data.data.after.description,
        version: context.data.data.after.version,
    };

    // We save the document for the same caller as the one who triggered the original on_set_doc, in the same collection with the same key as well.
    set_doc_store(
        context.caller,
        context.data.collection,
        context.data.key,
        doc,
    )?;

    Ok(())
}

// Other hooks

include_satellite!();
```

As outlined in the [Quickstart](#quickstart) chapter, run `juno dev build` to compile and deploy the code locally. When testing this feature, if you wait a bit before calling the getter, unlike in the previous step, you should now receive the modified "hello: world checked" text set by the hook. This delay occurs because serverless Functions run fully asynchronously from the request-response between your frontend and the Satellite.

---

## HTTP outcalls

[HTTP outcalls](https://internetcomputer.org/https-outcalls) are a feature of the Internet Computer, enabling smart contracts to directly connect to the Web 2.0 world by querying APIs with HTTP requests.

For this example, we'll skip a few steps as the logic remains consistent:

- Your frontend makes a call to the Satellite.
- The Satellite performs some work, such as asserting and setting a document.
- If everything succeeds, the Satellite triggers a hook before returning the result of the call.

Here is an example of an `on_set_doc` hook which fetches an API to get the link to an image of a dog and saves that information within the Datastore. While this might not be a practical real-world use case, it is simple enough to demonstrate the feature.

:::caution

HTTP outcalls require cycles to execute the request. At the time of writing this example, the cost was calculated using the formula `(3_000_000 + 60_000 * n) * n` for the base fee and `400 * n` each request byte and `800 * n` for each response byte, where n is the number of nodes in the subnet.

Please refer to the documentation for the actual calculation method and costs.

:::

```rust
use ic_cdk::api::management_canister::http_request::{
    http_request as http_request_outcall, CanisterHttpRequestArgument, HttpMethod,
};
use junobuild_macros::{
    on_delete_asset, on_delete_doc, on_delete_many_assets, on_delete_many_docs, on_set_doc,
    on_set_many_docs, on_upload_asset,
};
use junobuild_satellite::{
    include_satellite, set_doc_store, OnDeleteAssetContext, OnDeleteDocContext,
    OnDeleteManyAssetsContext, OnDeleteManyDocsContext, OnSetDocContext, OnSetManyDocsContext,
    OnUploadAssetContext, SetDoc,
};
use junobuild_utils::encode_doc_data;
use serde::{Deserialize, Serialize};

// The data of the document we are looking to update in the Satellite's Datastore.
#[derive(Serialize, Deserialize)]
struct DogData {
    src: Option<String>,
}

// We are using the Dog CEO API in this example.
// https://dog.ceo/dog-api/
//
// Its endpoint "random" returns such JSON data:
// {
//     "message": "https://images.dog.ceo/breeds/mountain-swiss/n02107574_1118.jpg",
//     "status": "success"
// }
//
// That's why we declare a struct that matches the structure of the answer.
#[derive(Serialize, Deserialize)]
struct DogApiResponse {
    message: String,
    status: String,
}

#[on_set_doc(collections = ["dogs"])]
async fn on_set_doc(context: OnSetDocContext) -> Result<(), String> {
    // 1. Prepare the HTTP GET request
    let url = "https://dog.ceo/api/breeds/image/random".to_string();

    let request_headers = vec![];

    let request = CanisterHttpRequestArgument {
        url,
        method: HttpMethod::GET,
        body: None,
        max_response_bytes: None,
        // In this simple example we skip sanitizing the response with a custom function for simplicity reason.
        transform: None,
        // We do not require any particular HTTP headers in this example.
        headers: request_headers,
    };

    // 2. Execute the HTTP request. A request consumes Cycles(!). In this example we provide 2_000_000_000 Cycles (= 0.002 TCycles).
    // To estimate the costs see documentation:
    // - https://internetcomputer.org/docs/current/developer-docs/gas-cost#special-features
    // - https://internetcomputer.org/docs/current/developer-docs/integrations/https-outcalls/https-outcalls-how-it-works#pricing
    // Total amount of cycles depends on the subnet size. Therefore, on mainnet it might cost ~13x more than what's required when developing locally. Source: https://forum.dfinity.org/t/http-outcalls-cycles/27439/4
    // Note: In the future we will have a UI logging panel in console.juno.build to help debug on production. Follow PR https://github.com/junobuild/juno/issues/415.
    //
    // We rename ic_cdk::api::management_canister::http_request::http_request to http_request_outcall because the Satellite already includes such a function's name.
    match http_request_outcall(request, 2_000_000_000).await {
        Ok((response,)) => {
            // 3. Use serde_json to transform the response to a structured object.
            let str_body = String::from_utf8(response.body)
                .expect("Transformed response is not UTF-8 encoded.");

            let dog_response: DogApiResponse =
                serde_json::from_str(&str_body).map_err(|e| e.to_string())?;

            // 4. Our goal is to update the document in the Datastore with an update that contains the link to the image fetched from the API we just called.
            let dog: DogData = DogData {
                src: Some(dog_response.message),
            };

            // 5. We encode those data back to blob because the Datastore holds data as blob.
            let encode_data = encode_doc_data(&dog)?;

            // 6. Then we construct the parameters required to call the function that save the data in the Datastore.
            let doc: SetDoc = SetDoc {
                data: encode_data,
                description: context.data.data.after.description,
                version: context.data.data.after.version,
            };

            // 7. We store the data in the Datastore for the same caller as the one who triggered the original on_set_doc, in the same collection with the same key as well.
            set_doc_store(
                context.caller,
                context.data.collection,
                context.data.key,
                doc,
            )?;

            Ok(())
        }
        Err((r, m)) => {
            let message =
                format!("The http_request resulted into error. RejectionCode: {r:?}, Error: {m}");

            Err(message)
        }
    }
}

// Other hooks

include_satellite!();
```

As with the previous example, the hook will asynchronously update the document. If you wait a bit before retrieving the document in your frontend, you might notice that the source of the image has been updated by your hook.

[satellite]: ../terminology.md#satellite
