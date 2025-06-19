# Satellite

Unlike Skylab, the image [junobuild/satellite](https://hub.docker.com/r/junobuild/satellite) runs a single Satellite in a sandboxed local environment.

You can configure the behavior of Satellite with a specific configuration file to define Datastore and Storage collections, additional administrative access keys, and optional serverless extensions. Like Skylab, it also supports live reloading for these serverless functions through a shared folder.

The CLI watches configuration files and a dedicated `deploy` folder, automatically applying changes and upgrading modules as needed.

---

## Configuration

The behavior of the Satellite running in the Docker container can be configured with the help of a local configuration file commonly named `juno.dev.config.ts` (or JavaScript or JSON).

This configuration file enables you to define the collections of the Datastore and Storage that run locally, but it also allows for defining additional controllers - i.e. administrative access keys - for your satellite.

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
