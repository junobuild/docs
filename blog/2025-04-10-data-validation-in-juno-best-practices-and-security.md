---
slug: data-validation-in-juno-best-practices-and-security
title: "Data Validation in Juno: Best Practices and Security Considerations"
authors: [fairtale]
tags: [programming, development, assertion, validation]
image: https://images.unsplash.com/photo-1525011268546-bf3f9b007f6a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
draft: true
---

![](https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

_Photo by [Johann Walter Bantz](https://unsplash.com/fr/@1walter2)_

---

## Why Data Validation Matters in Decentralized Apps

Data validation is always important. However, web3 comes with its own set of challenges which makes validation an even more important part of building trustworthy apps:

1. **No Central Administrator**: Unlike traditional systems, decentralized apps have no admin backdoor to fix data issues
2. **Limited Data Access**: Developers often can't directly access or examine user data due to encryption and/or privacy
3. **Data Immutability**: Once written to the blockchain, data can be difficult or impossible to modify
4. **Client-Side Vulnerability**: Front-end validation can be bypassed by determined users (like in web2)
5. **Security Risks**: Invalid or malicious data can compromise application integrity and user trust

Getting validation right from the start is not just a best practice—it's essential for the secure and reliable operation of your application.

---

## Available Approaches

Juno offers three main approaches for data validation:

1. **Hooks (on_set_doc)**
2. **Custom Endpoints**
3. **Assertion Hooks (assert_set_doc)** 👈 --- Recommended approach

Let's explore each approach with simple examples:

---

### on_set_doc Hooks

`on_set_doc` is a Hook that is triggered after a document has been written to the database. It offers a way to execute custom logic whenever data is added or updated to a collection using the `setDoc` function executed on the client side.

This allows for many use-cases, even for certain types of validation, but this hook runs _after_ the data has already been written.

```rust
// Example of validation and cleanup in on_set_doc
#[on_set_doc(collections = ["users"])]
fn on_set_doc(context: OnSetDocContext) -> Result<(), String> {
    // Step 1: Get all context data we'll need upfront
    let collection = context.data.collection;
    let key = context.data.key;
    let doc = &context.data.data.after;  // Reference to the full document after update
    let user_data: UserData = decode_doc_data(&doc.data)?;  // Decoded custom data from the document

    // Step 2: Validate the data
    if user_data.username.len() < 3 {
        // Step 3: If validation fails, delete the document using low-level store function
        delete_doc_store(
            ic_cdk::id(),  // Use Satellite's Principal ID since this is a system operation
            collection,
            key,
            DelDoc {
                version: Some(doc.version),  // Use the version from our doc reference
            }
        )?;

        // Log the error instead of returning it to avoid trapping
        ic_cdk::print("Username must be at least 3 characters");
    }

    Ok(())
}
```

**Issues:**

- The on_set_doc hook only executes AFTER data is already written to the database, which is not ideal for validation.
- Since it only happens after the data is already written, it can lead to unwanted effects. For example: let's say a new data needs to be added to some list. If it is invalid, we can't add it to the list, but since the hook runs after the data is written, the data will be added to the list anyway before we can reject them. This adds unwanted complexity to your code, forcing the developer to manage multiple on_set_doc hooks in the same function.
- Overhead: invalid data is written (costly operation) then might be rejected and need to be deleted (another costly operation)
- Not ideal for validation since it can't prevent invalid writes
- Can't return success/error messages to the frontend

There are also other Juno hooks, but in general, they provide a way to execute custom logic whenever data is added, modified, or deleted from a Juno datastore collection.

---

### Custom Endpoints using Serverless Functions

Custom Endpoints are Juno serverless functions that expose new API endpoints through Candid (the Internet Computer's interface description language). They provide a validation layer through custom API routes before data reaches Juno's datastore, allowing for complex multi-step operations with custom validation logic.

:::caution

This example is provided as-is and is intended for demonstration purposes only. It does not include comprehensive security validations.

:::

```rust
use junobuild_satellite::{set_doc_store, SetDoc};  // SetDoc is the struct type for document creation/updates
use junobuild_utils::encode_doc_data;
use ic_cdk::caller;
use candid::{CandidType, Deserialize};

// Simple user data structure
#[derive(CandidType, Deserialize)]
struct UserData {
    username: String,
}

// Custom endpoint for user creation with basic validation
#[ic_cdk_macros::update]
async fn create_user(key: String, user_data: UserData) -> Result<(), String> {
    // Step 1: Validate username (only alphanumeric characters)
    if !user_data.username.chars().all(|c| c.is_alphanumeric()) {
        return Err("Username must contain only letters and numbers".to_string());
    }

    // Step 2: Create and store document
    // First encode our data into a blob that Juno can store into the 'data' field
    let encoded_data = encode_doc_data(&user_data)
        .map_err(|e| format!("Failed to encode user data: {}", e))?;

    // Create a SetDoc instance - this is the required format for setting documents in Juno
    // SetDoc contains only what we want to store - Juno handles all metadata:
    // - created_at/updated_at timestamps
    // - owner (based on caller's Principal)
    // - version management
    let doc = SetDoc {
        data: encoded_data,        // The actual data we want to store (as encoded blob)
        description: None,         // Optional field for filtering/searching
        version: None             // None for new docs, Some(version) for updates
    };

    // Use set_doc_store to save the document
    // This is Juno's low-level storage function that:
    // 1. Takes ownership of the document (caller's Principal)
    // 2. Adds timestamps (created_at, updated_at)
    // 3. Handles versioning
    // 4. Stores the document in the specified collection
    set_doc_store(
        caller(),                 // Who is creating this document
        String::from("users"),    // Which collection to store in
        key,                      // The document's unique key
        doc                       // The SetDoc we prepared above
    ).await
}
```

While custom endpoints offer great flexibility for building specialized workflows, they come with significant security challenges. The main problem is that the original `setDoc` endpoint remains fully accessible to users, allowing them to bypass your custom validation entirely by simply calling the standard Juno SDK functions directly.

The common workaround is to restrict the datastore collection to "controller" access so the public can't write to it directly, forcing users to interact only through your custom functions. However, this approach creates its own problems:

1. All documents will now be "owned" by the controller, not individual users
2. You lose Juno's built-in permission system for user-specific data access
3. You'll need to build an entirely new permission system from scratch
4. This creates a complex, error-prone "hacky workaround" instead of using Juno as designed

**Key Limitations:**

- Original `setDoc` endpoint remains accessible to users
- Users can bypass custom endpoint entirely by using Juno's default endpoints directly (setDoc, setDocs, etc)
- Restricting collections to controller access breaks Juno's permission model
- Requires building a custom permission system from scratch
- Splits validation logic from data storage

---

### assert_set_doc Hooks (Recommended)

The `assert_set_doc` hook runs BEFORE any data is written to the database, allowing you to validate and reject invalid submissions immediately. This is the most secure validation method in Juno as it integrates directly with the core data storage mechanism.

When a user calls `setDoc` through the Juno SDK, the `assert_set_doc` hook is automatically triggered before any data is written to the blockchain. If your validation logic returns an error, the entire operation is cancelled, and the error is returned to the frontend. This ensures invalid data never reaches your datastore in the first place, saving computational resources and maintaining data integrity.

Unlike other approaches, `assert_set_doc` hooks:

- Cannot be bypassed by end users
- Integrate seamlessly with Juno's permission model
- Allow users to continue using the standard Juno SDK
- Keep validation logic directly in your data model
- Conserve blockchain resources by validating before storage
- Can reject invalid data with descriptive error messages that flow back to the frontend (unlike on_set_doc which runs after storage and can't return validation errors to users)

```rust
// Simple assert_set_doc example
#[assert_set_doc(collections = ["users"])]
fn assert_set_doc(context: AssertSetDocContext) -> Result<(), String> {
    match context.data.collection.as_str() {
        "users" => {
            // Access username from the document
            let data = context.data.data.proposed.data.as_object()
                .ok_or("Invalid data format")?;

            let username = data.get("username")
                .and_then(|v| v.as_str())
                .ok_or("Username is required")?;

            // Validate username
            if username.len() < 3 {
                return Err("Username must be at least 3 characters".to_string());
            }

            Ok(())
        },
        _ => Ok(())
    }
}
```

**Key Advantages:**

- Always runs BEFORE data is written - prevents invalid data entirely
- Zero overhead - validation happens in memory before expensive on-chain operations
- Cannot be bypassed or circumvented
- Prevents invalid data from ever being written
- Conserves resources by validating before storage
- Integrates directly with Juno's permission model
- Keeps validation (assert_set_doc) separate from business logic triggers (on_set_doc)
- Makes use of Juno's built-in permissions system
- Allows users to use setDoc as intended in Juno
- Can return custom error messages to the frontend

---

## Hook Execution Flow

Here's the sequence of events during a document write operation:

1. User calls `setDoc`
2. `assert_set_doc` hook runs (pre-validation)
   - If validation passes → continue
   - If validation fails → operation cancelled entirely
3. Data is written to Datastore
4. `on_set_doc` hook runs (post-processing)
5. Operation completes

---

## When and How to Use Each Approach

### Use assert_set_doc Hooks For

- Essential data validation
- Structure and format verification
- Required field checking
- Value range constraints
- Uniqueness validation
- Relationship verification

### Use on_set_doc Hooks For:

- Post-processing operations
- Notifications and logging
- Derived data calculation
- Asynchronous side effects
- Cascading updates
- Analytics and metrics

### Use Custom Endpoints For:

- Complex multi-step workflows
- User interface integration
- Specialized flows with custom logic
- Operations requiring external APIs
- Batch processing
- Rate limiting

---

## Best Practices Summary

1. **Use assert_set_doc for Validation**: Always validate data before storage
2. **Keep Validation Close to Data**: Build validation directly into your data model
3. **Layer Your Security**: Combine multiple approaches for defense in depth
4. **Set Appropriate Permissions**: Configure collection access rights correctly
5. **Use Version Control**: Prevent race conditions with proper versioning
6. **Implement Error Handling**: Provide clear feedback for validation failures
7. **Maintain Audit Trails**: Log validation events for security analysis

---

## Production Use-Case Examples

Below are more detailed, production-ready examples for each validation approach:

### assert_set_doc Example

```rust
use junobuild_satellite::{
    set_doc, list_docs, decode_doc_data, encode_doc_data,
    Document, ListParams, ListMatcher
};
use ic_cdk::api::time;
use std::collections::HashMap;

#[assert_set_doc(collections = ["users", "votes", "tags"])]
fn assert_set_doc(context: AssertSetDocContext) -> Result<(), String> {
    match context.data.collection.as_str() {
        "users" => validate_user_document(&context),
        "votes" => validate_vote_document(&context),
        "tags" => validate_tag_document(&context),
        _ => Err(format!("Unknown collection: {}", context.data.collection))
    }
}

fn validate_user_document(context: &AssertSetDocContext) -> Result<(), String> {
    // Decode and validate the user data structure
    let user_data: UserData = decode_doc_data(&context.data.data.proposed.data)
        .map_err(|e| format!("Invalid user data format: {}", e))?;

    // Validate username format (3-20 chars, alphanumeric + limited symbols)
    if !is_valid_username(&user_data.username) {
        return Err("Username must be 3-20 characters and contain only letters, numbers, and underscores".to_string());
    }

    // Check username uniqueness by searching existing documents
    let search_pattern = format!("username={};", user_data.username.to_lowercase());
    let existing_users = list_docs(
        String::from("users"),
        ListParams {
            matcher: Some(ListMatcher {
                description: Some(search_pattern),
                ..Default::default()
            }),
            ..Default::default()
        },
    );

    // If this is an update operation, exclude the current document
    let is_update = context.data.data.before.is_some();
    for (doc_key, _) in existing_users.items {
        if is_update && doc_key == context.data.key {
            continue;
        }

        return Err(format!("Username '{}' is already taken", user_data.username));
    }

    Ok(())
}

fn validate_vote_document(context: &AssertSetDocContext) -> Result<(), String> {
    // Decode vote data
    let vote_data: VoteData = decode_doc_data(&context.data.data.proposed.data)
        .map_err(|e| format!("Invalid vote data format: {}", e))?;

    // Validate vote value constraints
    if vote_data.value < -1.0 || vote_data.value > 1.0 {
        return Err(format!("Vote value must be -1, 0, or 1 (got: {})", vote_data.value));
    }

    // Validate vote weight constraints
    if vote_data.weight < 0.0 || vote_data.weight > 1.0 {
        return Err(format!("Vote weight must be between 0.0 and 1.0 (got: {})", vote_data.weight));
    }

    // Validate tag exists
    let tag_params = ListParams {
        matcher: Some(ListMatcher {
            key: Some(vote_data.tag_key.clone()),
            ..Default::default()
        }),
        ..Default::default()
    };

    let existing_tags = list_docs(String::from("tags"), tag_params);
    if existing_tags.items.is_empty() {
        return Err(format!("Tag not found: {}", vote_data.tag_key));
    }

    // Prevent self-voting
    if vote_data.author_key == vote_data.target_key {
        return Err("Users cannot vote on themselves".to_string());
    }

    Ok(())
}

fn validate_tag_document(context: &AssertSetDocContext) -> Result<(), String> {
    // Decode tag data
    let tag_data: TagData = decode_doc_data(&context.data.data.proposed.data)
        .map_err(|e| format!("Invalid tag data format: {}", e))?;

    // Validate tag name format and uniqueness
    if !is_valid_tag_name(&tag_data.name) {
        return Err("Tag name must be 3-50 characters and contain only letters, numbers, and underscores".to_string());
    }

    // Check tag name uniqueness
    let search_pattern = format!("name={};", tag_data.name.to_lowercase());
    let existing_tags = list_docs(
        String::from("tags"),
        ListParams {
            matcher: Some(ListMatcher {
                description: Some(search_pattern),
                ..Default::default()
            }),
            ..Default::default()
        },
    );

    let is_update = context.data.data.before.is_some();
    for (doc_key, _) in existing_tags.items {
        if is_update && doc_key == context.data.key {
            continue;
        }
        return Err(format!("Tag name '{}' is already taken", tag_data.name));
    }

    // Validate description length
    if tag_data.description.len() > 1024 {
        return Err(format!(
            "Tag description cannot exceed 1024 characters (current length: {})",
            tag_data.description.len()
        ));
    }

    // Validate time periods
    validate_time_periods(&tag_data.time_periods)?;

    // Validate vote reward
    if tag_data.vote_reward < 0.0 || tag_data.vote_reward > 1.0 {
        return Err(format!(
            "Vote reward must be between 0.0 and 1.0 (got: {})",
            tag_data.vote_reward
        ));
    }

    Ok(())
}

fn validate_time_periods(periods: &[TimePeriod]) -> Result<(), String> {
    if periods.is_empty() {
        return Err("Tag must have at least 1 time period".to_string());
    }
    if periods.len() > 10 {
        return Err(format!(
            "Tag cannot have more than 10 time periods (got: {})",
            periods.len()
        ));
    }

    // Last period must be "infinity" (999 months)
    let last_period = periods.last().unwrap();
    if last_period.months != 999 {
        return Err(format!(
            "Last period must be 999 months (got: {})",
            last_period.months
        ));
    }

    // Validate each period's configuration
    for (i, period) in periods.iter().enumerate() {
        // Validate multiplier range (0.05 to 10.0)
        if period.multiplier < 0.05 || period.multiplier > 10.0 {
            return Err(format!(
                "Multiplier for period {} must be between 0.05 and 10.0 (got: {})",
                i + 1, period.multiplier
            ));
        }

        // Validate multiplier step increments (0.05)
        let multiplier_int = (period.multiplier * 100.0).round();
        let remainder = multiplier_int % 5.0;
        if remainder > 0.000001 {
            return Err(format!(
                "Multiplier for period {} must use 0.05 step increments (got: {})",
                i + 1, period.multiplier
            ));
        }

        // Validate month duration
        if period.months == 0 {
            return Err(format!(
                "Months for period {} must be greater than 0 (got: {})",
                i + 1, period.months
            ));
        }
    }

    Ok(())
}
```

Remember: Security is about preventing unauthorized or invalid operations, not just making them difficult. assert_set_doc hooks provide the only guaranteed way to validate all data operations in Juno's Datastore.

---

## Reference: Available Juno Hooks and Context Types

This section provides a comprehensive reference of all available Juno hooks and their corresponding context types.

Note: For up-to date information on the available context types and utilities, refer to the [Juno Satellite API Reference](https://docs.rs/junobuild-satellite/0.0.21/junobuild_satellite/index.html#usage).

### Available Macro Decorators

```rust
use junobuild_macros::{
    assert_delete_asset,          // For asserting asset deletion
    assert_delete_doc,            // For asserting document deletion
    assert_set_doc,               // For asserting document creation/update
    assert_upload_asset,          // For asserting asset upload
    on_delete_asset,              // For handling asset deletion
    on_delete_doc,                // For handling document deletion
    on_delete_filtered_assets,    // For handling filtered asset deletion
    on_delete_filtered_docs,      // For handling filtered document deletion
    on_delete_many_assets,        // For handling batch asset deletion
    on_delete_many_docs,          // For handling batch document deletion
    on_set_doc,                   // For handling document creation/update
    on_set_many_docs,             // For handling batch document creation/update
    on_upload_asset,              // For handling asset upload
};
```

### Available Context Types and Utilities

```rust
use junobuild_satellite::{
    include_satellite,              // Required macro for Juno integration
    AssertDeleteAssetContext,       // Context for asset deletion assertion
    AssertDeleteDocContext,         // Context for document deletion assertion
    AssertSetDocContext,            // Context for document creation/update assertion
    AssertUploadAssetContext,       // Context for asset upload assertion
    OnDeleteAssetContext,           // Context for asset deletion handler
    OnDeleteDocContext,             // Context for document deletion handler
    OnDeleteFilteredAssetsContext,  // Context for filtered asset deletion
    OnDeleteFilteredDocsContext,    // Context for filtered document deletion
    OnDeleteManyAssetsContext,      // Context for batch asset deletion
    OnDeleteManyDocsContext,        // Context for batch document deletion
    OnSetDocContext,                // Context for document creation/update
    OnSetManyDocsContext,           // Context for batch document creation/update
    OnUploadAssetContext,           // Context for asset upload handler
};
```

---

### Where to find the hooks and assertions in your project

When you run `juno dev eject`, all available hooks and assertions are scaffolded in your `lib.rs` module. However, you can selectively enable only the features you need by disabling default features in your `Cargo.toml` and explicitly specifying the ones you want to use.

Example configuration for using only `on_set_doc` and `assert_set_doc`:

```toml
[dependencies]
junobuild-satellite = { version = "0.0.21", default-features = false, features = ["on_set_doc", "assert_set_doc"] }
```
