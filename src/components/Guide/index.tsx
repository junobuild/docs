import React from "react";

export default function Feature({
  icon,
  title,
  link,
  external = false,
}): JSX.Element {
  let attr = {
    ...(external && { rel: "noopener noreferrer", target: "_blank" }),
  };

  return (
    <a href={link} aria-label={title} {...attr}>
      {icon}
    </a>
  );
}
