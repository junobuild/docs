import Testimonial, {
  TestimonialProps
} from "@site/src/components/Testimonial";
import styles from "./styles.module.scss";

export default function Testimonials(): JSX.Element {
  const testimonials: TestimonialProps[] = [
    {
      name: "Krzysztof Woś",
      twitter: "krzysztofwos",
      img: "https://pbs.twimg.com/profile_images/1576076457209913344/mujUWJ8V_400x400.jpg",
      text: "@junobuild and the ICP close that gap. Juno is the best Web3 app out there."
    }
  ];

  return (
    <>
      <p className={styles.title}>What people are saying</p>

      <div className={styles.grid}>
        {testimonials.map((testimonial, i) => (
          <Testimonial testimonial={testimonial} key={i} />
        ))}
      </div>
    </>
  );
}
