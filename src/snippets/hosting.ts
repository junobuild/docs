export const code = {
  lang: "language-javascript",
  value: `// Configure hosting - and the rest of your setup -
// using a familiar JavaScript or TypeScript define pattern.
import { defineConfig } from "@junobuild/config";

// Serve static assets directly from your container -
// full web behavior supported: headers, redirects, 404, and more.
export default defineConfig({
  satellite: {
    ids: {
      production: "ucnx3-aqaaa-aaaal-ab3ea-cai",
      development: "ffff-eeee-ddddd-ccccc-cai"
    },
    source: "build",
    predeploy: ["npm run build"]
    storage: {
      headers: [
        {
          source: "**/*.svg",
          headers: [["Cache-Control", "max-age=2592000"]]
        }
      ]
    }
  }
});
`
};
