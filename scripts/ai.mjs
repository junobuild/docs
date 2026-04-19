#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

// Generate /.well-known/agent-skills/index.json for AI discovery as defined by Cloudflare
// @see https://github.com/cloudflare/agent-skills-discovery-rfc
// @see https://isitagentready.com/.well-known/agent-skills/agent-skills/SKILL.md
// test: https://isitagentready.com/juno.build

const TEMPLATE_SKILL_WITHOUT_DIGEST = {
  name: "juno",
  type: "skill-md",
  description:
    "Up-to-date knowledge about Juno's CLI, SDK, and serverless functions for AI coding agents.",
  url: "https://raw.githubusercontent.com/junobuild/skills/main/SKILL.md"
};

const TEMPLATE = {
  $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
  skills: []
};

const OUTPUT_DIR = join("static", ".well-known", "agent-skills");
const OUTPUT_FILE_PATH = join(OUTPUT_DIR, "index.json");

await mkdir(OUTPUT_DIR, { recursive: true });

const computeSkillSha256 = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/junobuild/skills/main/SKILL.md"
  );

  if (!response.ok) {
    throw new Error("Fetching the current SKILL.md failed!");
  }

  const md = await response.text();

  const encoder = new TextEncoder();
  const hash = await crypto.subtle.digest("SHA-256", encoder.encode(md));

  const sha256ToHex = (hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  return sha256ToHex(hash);
};

const sha256 = await computeSkillSha256();

const skill = {
  ...TEMPLATE_SKILL_WITHOUT_DIGEST,
  digest: `sha256:${sha256}`
};

const json = {
  ...TEMPLATE,
  skills: [skill]
};

await writeFile(OUTPUT_FILE_PATH, JSON.stringify(json, null, 2), "utf8");
