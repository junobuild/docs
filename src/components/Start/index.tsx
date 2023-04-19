import React from "react";
import Snippet from "@site/src/components/Snippet";
import Link from "@docusaurus/Link";

export default function Start(): JSX.Element {
  return (
    <Link
      className="button button--hero"
      href="https://console.juno.build"
      target="_self"
    >
      Start building
    </Link>
  );
}
