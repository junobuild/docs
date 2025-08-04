# Satellite

Unlike Skylab, the image [junobuild/satellite](https://hub.docker.com/r/junobuild/satellite) runs a single Satellite in a headless environment, without the Console UI. It always mounts the same Satellite, using the fixed ID `jx5yt-yyaaa-aaaal-abzbq-cai`.

---

## Configuration

To use this image, your configuration must include the `satellite` field in the `emulator` section.

Make also sure to set the `runner` type to match your container runtime, and define the static Satellite ID expected by the image.

```ts title="juno.config.ts"
import { defineConfig } from "@junobuild/config";

export default defineConfig({
  satellite: {
    ids: {
      development: "jx5yt-yyaaa-aaaal-abzbq-cai",
      production: "<PROD_SATELLITE_ID>"
    },
    source: "dist",
    predeploy: ["npm run build"]
  },
  emulator: {
    runner: {
      type: "docker"
    },
    satellite: {}
  }
});
```

For more advanced options like customizing ports, image name, or CI setup, see the [Emulator Configuration](../configuration.mdx#emulator-configuration) section.
