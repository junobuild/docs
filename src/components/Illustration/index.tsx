import { DotLottie } from "@lottiefiles/dotlottie-web";
import { useEffect, useRef } from "react";

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
  const canvas = useRef(null);

  useEffect(() => {
    new DotLottie({
      autoplay: true,
      loop: true,
      canvas: canvas.current,
      src: "/animations/astronaut.lottie"
    });
  }, [canvas]);

  return (
    <picture aria-label="An astronaut floating in space around planet Juno orbited by satellites, stars in the background.">
      <canvas ref={canvas} />
    </picture>
  );
}
