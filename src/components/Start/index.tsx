import Link from "@docusaurus/Link";
import { ReactNode } from "react";

type StartProps = {
  position: string;
  className?: string;
  children: ReactNode;
};

export default function Start({
  position,
  className = "",
  children
}: StartProps): JSX.Element {
  return (
    <Link
      className={`button button--hero ${className}`}
      href="https://console.juno.build"
      target="_self"
    >
      {children}
    </Link>
  );
}
