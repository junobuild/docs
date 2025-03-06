---
id: local-development
title: Local Development
description: Set-up the local emulator with Docker
sidebar_position: 11
---

# Local Development

When you get started with Juno, you are using your smart contract deployed on the blockchain in production. If you are interested in developing or testing your apps in continuous integration workflows, this guide will show you how you can run a Satellite in a Docker sandbox.

---

## Before you begin

Make sure you have Docker installed on your machine ([Windows](https://docs.docker.com/desktop/install/windows-install/), [MacOS](https://docs.docker.com/desktop/install/mac-install/), or [Linux](https://docs.docker.com/desktop/install/linux-install/)).

:::note

For MacBooks with M processors, it is important to use Docker Desktop version 4.25.0 or later, ideally the latest available version.

:::

---

## Getting Started

There are two ways to start a local developer environment:

### Automated

If you've installed Juno's CLI on your machine, you can start a local container by simply running the `juno dev start` command in your terminal.

The first time you execute this command, it will prompt you to automatically populate the required configuration.

To start the container, run this command whenever needed. Use `juno dev stop` to halt the container.

### Manually

In a folder, create a `docker-compose.yml` file.

```yml title="docker-compose.yml"
services:
  juno-satellite:
    image: junobuild/satellite:latest
    ports:
      - 5987:5987
      - 5999:5999
    volumes:
      - my_dapp:/juno/.juno
      - ./juno.dev.config.json:/juno/juno.dev.config.json
      - ./target/deploy:/juno/target/deploy/

volumes:
  my_dapp:
```

In addition, create a file named `juno.dev.config.json` next to your Docker Compose file and populate it with the required fields.

```json title="juno.dev.config.json"
{
  "satellite": {
    "collections": {}
  }
}
```

Once the configuration is set, start the container using the following Docker command:

```
docker compose up
```

That's all it takes to run the local environment. At this point, you should have a container that exposes a Satellite and an Internet Identity for local development or end-to-end testing purposes.

:::note

You can run or compose the Juno Docker image from your terminal. This guide explains the latter.

It's worth noting that you can run multiple containers simultaneously, as long as they operate on different ports. Additionally, you can apply various configurations for different projects.

:::

---

## Hot Reload

The local container supports live reloading. When you modify your [configuration](#configuration) or build custom [Functions](../build/functions/index.md) to enhance Juno's capabilities with serverless features, those changes will be automatically redeployed.

---

## Options

Modify the following information of the `docker-compose.yml` file to tweak the container behavior to your needs:

### Ports

The default port `5987` is used for communication with the locally deployed satellites and other modules in the local environment (replica). This is the primary port for interaction with the application.

The container also exposes a small admin server for internal management on port `5999`.

If you want to use a different port, such as 8080, update for example the mapping from `5987:5987` to `8080:5987`, where the first value (8080) is the port you can call, and the second (5987) is the actual container port.

### Volumes

The image requires a volume to preserve its state. This ensures that when you stop and restart your container, it will resume with the previous state - for instance, if you persist data in its Datastore or Storage, those files will be retained.

The Docker Compose feature automatically creates the volume, so all you need to do is specify it once.

Naming the volume is particularly useful when developing multiple dApps locally, as it allows you to maintain separate states for each project.

Replace `my_dapp` in the configuration with another volume name to suit your needs.

For example, if you are developing a "Hello World" project, you could change the volume name to "hello_world".

```yml title="docker-compose.yml"
services:
  juno-satellite:
    image: junobuild/satellite:latest
    ports:
      - 5987:5987
      - 5999:5999
    volumes:
      - hello_world:/juno/.juno # <-------- hello_world modified here
      - ./juno.dev.config.json:/juno/juno.dev.config.json
      - ./target/deploy:/juno/target/deploy/

volumes:
  hello_world: # <-------- and here
```

---

## Configuration

The behavior of the Satellite running in the Docker container can be configured with the help of a local configuration file commonly named `juno.dev.config.json`.

This configuration file enables you to define the collections of the Datastore and Storage that run locally, but it also allows for defining additional controllers for your satellite.

The definition is as follows:

```typescript
export type PermissionText = "public" | "private" | "managed" | "controllers";
export type MemoryText = "heap" | "stable";
export type RulesType = "db" | "storage";

export interface Rule {
  collection: string;
  read: PermissionText;
  write: PermissionText;
  memory: MemoryText;
  createdAt?: bigint;
  updatedAt?: bigint;
  maxSize?: number;
  maxCapacity?: number;
  mutablePermissions: boolean;
  maxTokens?: number;
}

export type SatelliteDevDbCollection = Omit<
  Rule,
  "createdAt" | "updatedAt" | "maxSize"
>;

export type SatelliteDevStorageCollection = Omit<
  Rule,
  "createdAt" | "updatedAt" | "maxCapacity"
>;

export interface SatelliteDevCollections {
  db?: SatelliteDevDbCollection[];
  storage?: SatelliteDevStorageCollection[];
}

export interface SatelliteDevController {
  id: string;
  scope: "write" | "admin";
}

export interface SatelliteDevConfig {
  collections: SatelliteDevCollections;
  controllers?: SatelliteDevController[];
}

export interface JunoDevConfig {
  satellite: SatelliteDevConfig;
}
```

### Example

If, for example, we want to configure a "metadata" collection in the Datastore, a "content" collection in the Storage, and provide an additional controller, we could use the following configuration:

```json title="juno.dev.config.json"
{
  "satellite": {
    "collections": {
      "db": [
        {
          "collection": "metadata",
          "read": "managed",
          "write": "managed",
          "memory": "stable",
          "mutablePermissions": true
        }
      ],
      "storage": [
        {
          "collection": "content",
          "read": "public",
          "write": "public",
          "memory": "stable",
          "mutablePermissions": true
        }
      ]
    },
    "controllers": [
      {
        "id": "535yc-uxytb-gfk7h-tny7p-vjkoe-i4krp-3qmcl-uqfgr-cpgej-yqtjq-rqe",
        "scope": "admin"
      }
    ]
  }
}
```

### Path and name

The configuration can be placed in a location other than next to the compose file and can be named whatever suits your needs. If you do so, make sure to adapt the compose file accordingly.

```yml title="docker-compose.yml"
services:
  juno-satellite:
    image: junobuild/satellite:latest
    ports:
      - 5987:5987
      - 5999:5999
    volumes:
      - my_dapp:/juno/.juno
      - /your/custom/path/your_config_file.json:/juno/juno.dev.config.json # <-------- Modify location and file name of the left hand part

volumes:
  my_dapp:
```

---

## Usage

When integrating your application with the container during Juno initialization, you have two primary options. The first is to set a specific parameter to `true`, which applies the default container configuration. The second option is to provide a custom `string` as the URL of the container, which is especially beneficial if you're using a custom port.

### Plugins

If you are utilizing the [Vite](../miscellaneous/plugins.md#vite-plugin) or [NextJS](../miscellaneous/plugins.md#nextjs-plugin), you can configure the container directly within the plugin settings:

```javascript title="vite.config.js"
import juno from "@junobuild/vite-plugin";

export default defineConfig({
  plugins: [
    juno({
      container: true
    })
  ]
});
```

The plugin will automatically load the necessary environment variables for the container configuration so that your app uses it when you develop.

### Manual Initialization

If you are not using the plugins, you should set the satellite ID to the static ID used in the container, which is `jx5yt-yyaaa-aaaal-abzbq-cai`. The initialization would look like this:

```typescript
import { initSatellite } from "@junobuild/core";

await initSatellite({
  // TODO: replace DEV flag according your need and the production satellite ID as well
  satelliteId: DEV
    ? "jx5yt-yyaaa-aaaal-abzbq-cai"
    : "aaaaa-bbbbb-ccccc-ddddd-cai",
  container: true
});
```

---

## Administration

The admin server running on port `5999` provides a variety of internal management. Below are some tips and example scripts to make use of this little server.

### Example: Get ICP

You might want to transfer some ICP from the ledger to a specified principal, which can be particularly useful when you're just getting started developing your app and no users currently own ICP. This can be achieved by querying:

```
http://localhost:5999/ledger/transfer/?to=$PRINCIPAL
```

For example, you can use the following script:

```bash
#!/usr/bin/env bash

# Check if a principal is passed as an argument; otherwise, prompt for it
if [ -z "$1" ]; then
  read -r -p "Enter the Wallet ID (owner account, principal): " PRINCIPAL
else
  PRINCIPAL=$1
fi

# Make a transfer request to the admin server
curl "http://localhost:5999/ledger/transfer/?to=$PRINCIPAL"
```

---

## Tips and Tricks

In the local environment, several modules (also known as "canisters" on the Internet Computer) are automatically spun up. This ensures that developers have everything they need to start building right out of the box. Thanks to built-in plugins and tooling, these modules are automatically integrated into the environment, eliminating the need for devs to manually manage their bindings.

However, in some cases, it may be useful to explicitly reference module IDs. Below is a list of the modules and their respective IDs that are automatically mounted.

:::note

Except for the Satellite ID, which differs from your production environment, all other IDs match the actual smart contract IDs on the mainnet.

:::

| Module                                                                                           | ID                            |
| ------------------------------------------------------------------------------------------------ | ----------------------------- |
| Satellite (local only)                                                                           | `x5yt-yyaaa-aaaal-abzbq-cai`  |
| [Internet Identity](https://dashboard.internetcomputer.org/canister/rdmx6-jaaaa-aaaaa-aaadq-cai) | `rdmx6-jaaaa-aaaaa-aaadq-cai` |
| [ICP Ledger](https://dashboard.internetcomputer.org/canister/ryjl3-tyaaa-aaaaa-aaaba-cai)        | `ryjl3-tyaaa-aaaaa-aaaba-cai` |
| [ICP Index](https://dashboard.internetcomputer.org/canister/qhbym-qaaaa-aaaaa-aaafq-cai)         | `qhbym-qaaaa-aaaaa-aaafq-cai` |

If you're using the Docker image intended for developing the Console, you get access to some extra modules that we may eventually merge into the development container. Let us know if you're interested!

| Module                                                                                        | ID                            |
| --------------------------------------------------------------------------------------------- | ----------------------------- |
| [CMC](https://dashboard.internetcomputer.org/canister/rkp4c-7iaaa-aaaaa-aaaca-cai)            | `rkp4c-7iaaa-aaaaa-aaaca-cai` |
| [NNS Governance](https://dashboard.internetcomputer.org/canister/rrkah-fqaaa-aaaaa-aaaaq-cai) | `rrkah-fqaaa-aaaaa-aaaaq-cai` |
