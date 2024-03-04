import styles from "./styles.module.scss";

export default function Feature({
  icon,
  title,
  text,
  link,
  tutorial = undefined
}): JSX.Element {
  return (
    <article className={styles.container}>
      <div className={styles.title}>
        {icon}

        <h4>{title}</h4>
      </div>

      <p className={styles.text}>{text}</p>

      {link}

      {tutorial !== undefined && <> | {tutorial}</>}
    </article>
  );
}
