import styles from "./styles.module.scss";

export default function Feature({
  icon,
  title,
  link,
  external = false
}): JSX.Element {
  let attr = {
    ...(external && { rel: "noopener noreferrer", target: "_blank" })
  };

  return (
    <a href={link} aria-label={title} {...attr} className={styles.link}>
      {icon}
    </a>
  );
}
