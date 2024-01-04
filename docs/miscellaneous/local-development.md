---
sidebar_position: 4
---

# Local development

When you get started with Juno, you are using your smart contract deployed on the blockchain in production. If you are interested in developing or testing your apps in continuous integration workflows, this guide will show you how you can run a Satellite in a Docker sandbox.

## Before you begin

Make sure you have Docker installed on your machine ([Windows](https://docs.docker.com/desktop/install/windows-install/), [MacOS](https://docs.docker.com/desktop/install/mac-install/), or [Linux](https://docs.docker.com/desktop/install/linux-install/)).

## Running

In the folder, create a `docker-compose.yml` file.

```yml
services:
  juno-satellite:
    image: junobuild/satellite:latest
    ports:
      - 5987:5987
    volumes:
      - my_dapp:/juno/.juno
      - ./juno.dev.json:/juno/juno.dev.json

volumes:
  my_dapp:
```

Subsequently, modify the following information according to your needs:

### Ports

The default port is 5987. If, for example, you would like to use port 8080, modify the value `5987:5987` to `8080:5987`. The latter is the port exposed by the container.

### Volumes

The image requires a volume to preserve its state. This ensures that when you stop and restart your container, it will resume with the previous state - for instance, if you persist data in its Datastore or Storage, those files will be retained.

The Docker Compose feature automatically creates the volume, so all you need to do is specify it once.

Naming the volume is particularly useful when developing multiple dApps locally, as it allows you to maintain separate states for each project.

Replace `my_dapp` in the above snippet with another volume name to suit your needs.

For example, if you are developing a "Hello World" project, you could change the volume name to "hello_world".

```yml
services:
  juno-satellite:
    image: junobuild/satellite:latest
    ports:
      - 5987:5987
    volumes:
      - hello_world:/juno/.juno # <-------- hello_world modified here
      - ./juno.dev.json:/juno/juno.dev.json

volumes:
  hello_world: # <-------- and here
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

## Configuration

The behavior of the Satellite running in the Docker container can be configured with the help of a local configuration file. Each time the container starts, the configuration is read and applied. Therefore, each time you modify your config, do not forget to restart your container to apply the changes.

To create a configuration, create a file named `juno.dev.json` next to your Docker Compose file and populate it with the required fields.

```json
{
  "satellite": {
    "collections": {}
  }
}
```

This configuration file enables you to configure the collections of the Datastore and Storage that run locally, but it also allows for defining additional controllers for your satellite.

The definition is as follows:

```typescript
type PermissionText = "public" | "private" | "managed" | "controllers";
type MemoryText = "Heap" | "Stable";

interface SatelliteCollection {
  collection: string;
  read: PermissionText;
  write: PermissionText;
  memory: MemoryText;
  max_size?: number;
  mutablePermissions: boolean;
}

interface SatelliteCollections {
  db?: SatelliteCollection[];
  storage?: SatelliteCollection[];
}

interface SatelliteController {
  id: string;
  scope: "write" | "admin";
}

interface SatelliteConfig {
  collections: SatelliteCollections;
  controllers?: SatelliteController[];
}

export interface JunoDevConfig {
  satellite: SatelliteConfig;
}
```

### Example

If, for example, we want to configure a "metadata" collection in the Datastore, a "content" collection in the Storage, and provide an additional controller, we could use the following configuration:

```json
{
  "satellite": {
    "collections": {
      "db": [
        {
          "collection": "metadata",
          "read": "managed",
          "write": "managed",
          "memory": "stable"
        }
      ],
      "storage": [
        {
          "collection": "content",
          "read": "public",
          "write": "public",
          "memory": "stable"
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

```yml
services:
  juno-satellite:
    image: junobuild/satellite:latest
    ports:
      - 5987:5987
    volumes:
      - my_dapp:/juno/.juno
      - /your/custom/path/your_config_file.json:/juno/juno.dev.json # <-------- Modify location and file name of the left hand part

volumes:
  my_dapp:
```

## Usage

When integrating your application with the container during Juno initialization, you have two primary options. The first is to set a specific parameter to `true`, which applies the default container configuration. The second option is to provide a custom `string` as the URL of the container, which is especially beneficial if you're using a custom port.

In addition, you should also set the satellite ID to the static ID used in the container - that is, `jx5yt-yyaaa-aaaal-abzbq-cai`.

The initialization would look like this:

```typescript
import { initJuno } from "@junobuild/core";

await initJuno({
  // TODO: replace DEV flag according your need and the production satellite ID as well
  satelliteId: DEV
    ? "jx5yt-yyaaa-aaaal-abzbq-cai"
    : "aaaaa-bbbbb-ccccc-ddddd-cai",
  container: true,
});
```

For those utilizing the [Vite Plugin](plugins.md#vite-plugin), the configuration is similar. Specify the option within the plugin settings:

```javascript
// vite.config.js
import juno from "@junobuild/vite-plugin";

export default defineConfig({
  plugins: [
    juno({
      container: true,
    }),
  ],
});
```

To further streamline the process, you can map environment variables for initialization:

```javascript
await initJuno({
  satelliteId: import.meta.env.VITE_SATELLITE_ID,
  container: import.meta.env.VITE_CONTAINER,
});
```

This approach ensures a more dynamic and flexible setup, catering to various development environments and scenarios.
