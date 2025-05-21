export const code = {
  lang: "language-javascript",
  value: `// Hosting behavior can be configured using 
// JavaScript, TypeScript, or JSON configuration files
import { defineConfig } from "@junobuild/config";

// Data is served directly from the blockchain 
// without compromising web functionality. 
// Headers, redirects, rewrites, 404s, etc., are supported.
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
