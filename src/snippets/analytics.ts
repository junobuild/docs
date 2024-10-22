export const code = `// Analytics events are gathered using a web worker
// and a library that requires minimal configuration
import { initOrbiter, trackEvent } from "@junobuild/analytics";

await initOrbiter();

// In addition to standard metrics such as sessions, page views, etc.,
// it also gathers web vitals out of the box
await initOrbiter({
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
`;
