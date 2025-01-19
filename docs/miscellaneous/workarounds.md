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
