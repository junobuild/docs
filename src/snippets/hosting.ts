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
    id: "ucnx3-aqaaa-aaaal-ab3ea-cai",
    source: "build",
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

// Deploy your app using the CLI
❯ npm i -g @junobuild/cli
❯ juno deploy

// Or with GitHub Actions
- name: Deploy to Juno
  uses: junobuild/juno-action@main
  with:
    args: deploy
  env:
    JUNO_TOKEN: ...
`
};
