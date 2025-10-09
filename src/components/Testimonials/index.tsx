import Testimonial, {
  TestimonialProps
} from "@site/src/components/Testimonial";
import styles from "./styles.module.scss";

export default function Testimonials(): JSX.Element {
  const testimonials: TestimonialProps[] = [
    {
      name: "Krzysztof Woś",
      twitter: "krzysztofwos",
      img: "https://pbs.twimg.com/profile_images/1905138464590594048/Y5MsHA2V_400x400.jpg",
      text: "Juno is the best Web3 app out there."
    },
    {
      name: "daisuke",
      twitter: "freedomforcode",
      img: "https://pbs.twimg.com/profile_images/1643476680667979778/HfVPe0mL_400x400.jpg",
      text: "Yes so easy build MVP with Juno 😍"
    },
    {
      name: "Jacob Crabtree",
      twitter: "crabtr26",
      img: "https://pbs.twimg.com/profile_images/1854279105920823304/-0-W42jG_400x400.jpg",
      text: "Juno is my favorite hosting service, Web3 or otherwise."
    },
    {
      name: "Jay F. Grissom",
      twitter: "jfgrissom",
      img: "https://pbs.twimg.com/profile_images/1602168015482519553/UFJ5_rcZ_400x400.jpg",
      text: "This is the next iteration of the internet I signed up for.🔥"
    },
    {
      name: "DeeAye.bio",
      twitter: "DeeAyee3",
      img: "https://pbs.twimg.com/profile_images/1970688408386445317/DmUvbYXx_400x400.jpg",
      text: "CI integration with that CLI is pure chef’s kiss mate."
    },
    {
      name: "Sam-the-tutor™",
      twitter: "samthetutor2",
      img: "https://pbs.twimg.com/profile_images/1679878586369449984/qv_eQ3oX_400x400.jpg",
      text: "I know you will love it when you try it out. I was amazed by how it is very easy to deploy an app on Juno."
    },
    {
      name: "Swissy ∞",
      twitter: "swissy_icp",
      img: "https://pbs.twimg.com/profile_images/1870241290094301184/StoU-tQ6_400x400.jpg",
      text: "I’m still amazed at how Juno has simplified the development process on ICP. It’s like a magic wand for devs - I get to focus on frontend and Juno handles the rest."
    },
    {
      name: "Coti",
      twitter: "JuanRezzio",
      img: "https://pbs.twimg.com/profile_images/1925235715077545984/i9OMCPHB_400x400.jpg",
      text: "Thanks to Juno's well-documented get-started guide, we had it up and running in under 5 minutes. Our first decentralized analytics tool is now live and kicking!"
    },
    {
      name: "Nezovskii Konstantin",
      twitter: "nezovskii",
      img: "https://pbs.twimg.com/profile_images/1673509145104850945/V87HzJPL_400x400.jpg",
      text: "If you're looking to start building on ICP, you definitely need to check out Juno! It's been a game-changer for me."
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
      <p className={styles.title} id="testimonials">
        What people are saying
      </p>

      <ul className={styles.grid}>
        {testimonials.map((testimonial, i) => (
          <Testimonial testimonial={testimonial} key={i} />
        ))}
      </ul>
    </>
  );
}
