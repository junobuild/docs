#!/usr/bin/env node
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const JUNO_SUBNET_ID =
  "6pbhf-qzpdk-kuqbr-pklfa-5ehhf-jfjps-zsj6q-57nrl-kzhpd-mu7hc-vae";

const getJunoSubnet = async () => {
  const response = await fetch(
    "https://ic-api.internetcomputer.org/api/v3/subnets/6pbhf-qzpdk-kuqbr-pklfa-5ehhf-jfjps-zsj6q-57nrl-kzhpd-mu7hc-vae"
  );

  if (!response.ok) {
    throw new Error("Fetching the Dashboard API failed!");
  }

  const metadata = await response.json();

  return {
    subnetId: JUNO_SUBNET_ID,
    specialization: "Juno's Subnet",
    ...(metadata !== undefined && {
      // The dashboard was instructed long ago to display verified_application as application
      type:
        metadata.subnet_type === "verified_application"
          ? "application"
          : metadata.subnet_type,
      canisters: {
        stopped: metadata.stopped_canisters,
        running: metadata.running_canisters
      },
      nodes: {
        up: metadata.up_nodes,
        total: metadata.total_nodes
      }
    })
  };
};

const listSubnets = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/junobuild/juno/refs/heads/main/src/frontend/src/lib/env/subnets.json"
  );

  if (!response.ok) {
    throw new Error("Fetching the Dashboard API failed!");
  }

  return await response.json();
};

const capitalize = (text) => {
  const [firstLetter, ...rest] = text;
  return `${firstLetter.toUpperCase()}${rest.join("")}`;
};

const generateMarkdown = (subnets) => {
  let markdown =
    "| Subnet ID | Type | Canisters (Running/Stopped) | Nodes (Up/Total) |\n";
  markdown +=
    "|-----------|----------------|---------------------|------------------|\n";

  subnets.forEach(({ subnetId, specialization, canisters, nodes }) => {
    markdown += `| ${subnetId} | ${specialization !== undefined ? capitalize(specialization) : ""} | ${canisters !== undefined ? `${canisters.running}/${canisters.stopped}` : ""} | ${nodes !== undefined ? `${nodes.up}/${nodes.total}` : ""} |\n`;
  });

  return markdown;
};

const junoSubnet = await getJunoSubnet();
const subnets = await listSubnets();

subnets.sort(({ specialization: a }, { specialization: b }) =>
  (b ?? "").localeCompare(a ?? "")
);

const markdown = generateMarkdown([
  junoSubnet,
  ...subnets.filter(({ subnetId }) => subnetId !== JUNO_SUBNET_ID)
]);

const SUBNETS_FILE = join(process.cwd(), "docs", "components", "subnets.md");

writeFileSync(SUBNETS_FILE, markdown, "utf8");
