# Controllers

Controllers play a crucial role in granting permissions to [mission controls] and [satellites] within Juno.

An administrative controller can perform tasks such as configuring or deploying an app, topping up a mission control or satellite, creating a new collection in the [datastore](build/datastore.md) or [storage](build/storage.md), or configuring a custom domain in the [hosting](build/hosting.md).

When you sign in to Juno's [console], you - **and no one else** (including not Juno) - become the controller of your own [mission control].

When you create a [satellite], you and your [mission control] become its controllers. Per extension, you - **and no one else** (including not Juno) - own your [satellite].

One "controller" is identified by a [principal](../terminology.md#principal).

## Adding Controllers

You can add additional controllers. When doing so, you can choose to grant them administrative privileges or restrict their scope to reading and writing data.

:::note

You have the ability to add up to 10 administrative controllers, as per the limitation set by the [Internet Computer](https://internetcomputer.org/docs/current/references/ic-interface-spec#ic-create_canister).

:::

When creating a new satellite, it is highly likely that you will need to assign controllers to enable its operation from your local machine or continuous integration setup.

To accomplish this, you have two available options.

### Reuse an existing controller

When creating an additional [satellite], you may want to **reuse an existing controller** that you have already configured on your local machine. To accomplish this, follow the step-by-step instructions below:

1. Execute the command `juno whoami` in your terminal. This will display the [principal] of the controller you are currently using. It should appear as follows:

```
Profile: Juno
Controller: 55555-44444-xxxxxx-fffff-hhhhh-oooooo-zzzzz-nnnnn-zzzzzz-xxxxx-gqe
```

2. Copy the value of the "Controller" field that was printed out.

3. Open your newly created satellite in the [console].

:::tip

You can do this by executing `juno open --console` in your project's root folder. This will directly open the related satellite in the browser.

:::

4. Open the "Controllers" tab.

5. Select "Add a controller" to start the wizard.

6. Choose "Manually enter a controller" and paste the principal you copied in Step 2.

7. Select a scope for the controller ("Read-write" or "Administrator").

8. Confirm your selection by clicking "Submit".

By following these steps, your existing controller will be set as a new "Controller" for the newly created [satellite], allowing you to operate it accordingly.

### Generate a new controller

To **generate a new controller** and attach it to your desired [mission controls] and [satellites], you can execute a new `juno login` command using the CLI. The [console] will guide you through the process.

However, please note that this action will overwrite the previously saved controller that was used for configuring your CLI locally.

It is generally recommended to use this method if you wish to generate a completely new controller and apply it to all your components.

:::note

You also have the option to generate new controllers directly in the [console]. This feature is particularly beneficial if you intend to configure [GitHub Actions](../miscellaneous/github_actions) to automate the deployment of your application.

:::

[console]: ../terminology.md#console
[satellite]: ../terminology.md#satellite
[satellites]: ../terminology.md#satellite
[mission control]: ../terminology.md#mission-control
[mission controls]: ../terminology.md#mission-control
