export const code = {
  lang: "language-javascript",
  value: `// Analytics events are collected using a tiny library (< 3KB gzipped)
import { initOrbiter, trackEvent } from "@junobuild/analytics";

initOrbiter();

// In addition to standard metrics such as sessions, page views, etc.,
// it can also gather web vitals out of the box
initOrbiter({
  options: {
    performance: true
  }
});

// Tracking anonymous custom events to follow your
// user's journey is also supported
const onClick = async () => {
  await trackEvent({
    name: "user_did_something",
    metadata: {
      "info": "something"
    }
  });
};

<button onClick={onClick}>Do something</button>
`
};
