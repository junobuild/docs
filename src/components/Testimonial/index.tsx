import styles from "./styles.module.scss";

export interface TestimonialProps {
  name: string;
  twitter: string;
  text: string;
  img: string;
}

export default function Testimonial({
  testimonial: { name, twitter, text, img }
}: {
  testimonial: TestimonialProps;
}): JSX.Element {
  return (
    <article className={styles.container}>
      <blockquote className={styles.quote}>{text}</blockquote>

      <div className={styles.author}>
        <img
          src={img}
          loading="lazy"
          className={styles.img}
          alt={`@${twitter} profile picture`}
        />

        <div className={styles.data}>
          <h5>{name}</h5>
          <a
            href={`https://x.com/${twitter}`}
            aria-label={`${name} on X / Twitter`}
            rel="noopener noreferrer"
            target="_blank"
            className={styles.link}
          >
            @{twitter}
          </a>
        </div>
      </div>
    </article>
  );
}
