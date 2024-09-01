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
      text: "Juno is the best Web3 app out there."
    },
    {
      name: "daisuke",
      twitter: "freedomforcode",
      img: "https://pbs.twimg.com/profile_images/1643476680667979778/HfVPe0mL_400x400.jpg",
      text: "Yes so easy build MVP with Juno 😍"
    },
    {
      name: "Sam-the-tutor™",
      twitter: "samthetutor2",
      img: "https://pbs.twimg.com/profile_images/1679878586369449984/qv_eQ3oX_400x400.jpg",
      text: "I know you will love it when you try it out. I was amazed by how it is very easy to deploy an app on Juno."
    },
    {
      name: "SwissyP ∞",
      twitter: "swissyp_",
      img: "https://pbs.twimg.com/profile_images/1752515991186313216/oWgCb-aX_400x400.png",
      text: "I’m still amazed at how Juno has simplified the development process on ICP. It’s like a magic wand for devs - I get to focus on frontend and Juno handles the rest."
    },
    {
      name: "Coti",
      twitter: "JuanRezzio",
      img: "https://pbs.twimg.com/profile_images/1789664405740736512/PBu6OhgZ_400x400.jpg",
      text: "Thanks to Juno's well-documented get-started guide, we had it up and running in under 5 minutes. Our first decentralized analytics tool is now live and kicking!"
    },
    {
      name: "DFINITY Developers ∞",
      twitter: "DFINITYDev",
      img: "https://pbs.twimg.com/profile_images/1700228415327023104/l4MdrvwA_400x400.jpg",
      text: "Juno enables easy dapp deployment across multiple UI frameworks including SvelteKit. ICP teams such as StackICP are using it to speed up their development."
    }
  ];

  return (
    <>
      <p className={styles.title} id="testimonials">What people are saying</p>

      <div className={styles.grid}>
        {testimonials.map((testimonial, i) => (
          <Testimonial testimonial={testimonial} key={i} />
        ))}
      </div>
    </>
  );
}
