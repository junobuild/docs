import lottie from "lottie-web";
import React from "react";
import animationData from "./lottie-animation.json";

import styles from "./styles.module.scss";

const Illustration = () => {
  return (
    <div className={styles.illustration}>
      <LottieAnimation />
    </div>
  );
};

export default Illustration;

// --

function LottieAnimation() {
  const container = React.useRef(null);

  React.useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData
    });
  }, []);

  return (
    <picture
      aria-label="An astronaut floating in space around planet Juno orbited by satellites, stars in the background."
      ref={container}
    />
  );
}
