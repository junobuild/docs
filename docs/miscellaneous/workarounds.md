---
sidebar_position: 8
---

# Workarounds

This page is dedicated to helping you make the most of Juno features, even when some functionalities are not yet fully supported out of the box. Below, you'll find practical workarounds and guidance for processes which in the future will be resolved by features planned in the [roadmap](../white-paper/roadmap.mdx).

---

## Transferring a Satellite to another "Account"

Although Juno does not yet support direct satellite transfers - such as if you want to hand over a project to your friends or colleagues - you can use the following steps as a workaround:

:::note

There is no "account" on Juno. The Console solely holds a key-pair list of the developer IDs with their respective Mission Control IDs. All data and control are entirely managed by you.

Nevertheless, for this tutorial, "account" refers to someone able to sign in into the Juno Console and who has a Mission Control.

:::

#### 1. Add the new controllers to the Satellite

:::danger

Never ever add controllers to your modules without being absolutely certain of their validity. Double-check everything before performing such a procedure.

:::

In your satellite, assign the controllers of the destination account with administrative permissions:

- The Mission Control ID
- The Developer ID (available under "Preferences")

In other words, ask your friend or colleague for their Developer ID and Mission Control ID, and add those as new controllers. Again, **please be absolutely certain** before adding the controllers.

#### 2. Attach Satellite in destination account

The destination account — your friend or colleague — can use the "Attach Satellite" feature in their [Mission Control](https://console.juno.build/mission-control/). To do this, they will need the Satellite ID.

By doing so, and because you have set them as a controller in the previous step, the Satellite you are transferring will be linked with their account and made available in the Console.

:::tip

At this stage, the satellite is linked to both accounts, making it accessible from each. If your goal is to share the satellite, you can consider this process complete and stop here. Otherwise, continue with the next steps.

:::

#### 3. Remove Unnecessary Controllers

The destination account — your friend or colleague, who is now the owner of the satellite — can then remove the controllers that should no longer be listed, specifically your own Developer ID and your Mission Control ID.

#### 4. Confirm and Detach

Wait for confirmation that the destination account has completed all the steps and successfully taken over the satellite. Once confirmed, you can remove the satellite from your console using the "Detach Satellite" option available in the satellite overview.

---

## How to collaborate on the same "project"

Since team collaboration isn't available yet, developers often find ways to share a satellite with friends or colleagues by either adding controllers—explained in the previous section—or by sharing an Internet Identity. With the latter approach, everyone in the group logs into the Juno Console using the same identity, allowing them to access the same data effortlessly.

While this method falls outside Juno's intended scope, it works similarly to adding multiple passkeys to your own Internet Identity. Here’s a simple guide to help you set it up.

:::important

Sharing the same identity also means sharing access to the same wallet linked to that identity. Be sure to follow this approach only with people you trust.

:::

#### 1. Create a new identity

Go to [identity.internetcomputer.org](https://identity.internetcomputer.org) and create a new identity.

#### 2. Set up

Sign into the [Juno Console](https://console.juno.build) using the new identity to create a new Mission Control and set up your first or subsequent satellites.

#### 3. Plan the identity sharing

Arrange a call or meeting with the person you want to share the identity with, as the upcoming steps require actions to be completed within a short time frame.

#### 4. Sign into your Internet Identity

Once ready, sign again into [identity.internetcomputer.org](https://identity.internetcomputer.org) using the newly created identity.

#### 5. Add a new passkey

Click "Add new passkey" to initiate the process of adding the other person’s device.

#### 6. Share the generated link

A link (e.g.,`https://identity.internetcomputer.org/?action=add-passkey&ii=1122333` for an identity number `1122333`) will be generated and valid for 15 minutes. Copy and send this link to the person you want to share the identity with.

#### 7. Approve the new passkey

The recipient should open the link and approve the passkey by trusting their device.

#### 8. Verify with a code

A six-digit code will be displayed on their screen, which they should provide to you. Enter this code on your screen to finalize the process.

#### 9. Confirm success

Once the code is entered correctly, the new passkey will be added. Your collaborator can now sign into the Juno Console using the shared identity and access the same satellites.

#### 10. Optional: Rename passkeys

It's recommended to rename the newly added passkey in Internet Identity to keep track of which passkey belongs to whom.

:::note

A maximum of 8 passkeys can be assigned to an identity, allowing you to share a project with up to 7 other people.

:::
