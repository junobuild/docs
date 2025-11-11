export const code = {
  lang: "language-javascript",
  value: `// Import what you need from the Juno SDK
import { signIn, signOut, authSubscribe } from "@junobuild/core";

// Listen for changes in the authentication state
authSubscribe((user) => {
  console.log("User:", user); // null when signed out
});

// Trigger a sign-in with Google
const handleSignIn = () => signIn({google: {}})

<button onClick={handleSignIn}>Continue with Google</button>

// Sign out the current user
await signOut();

// Automatically handle session expiry
await initSatellite({
  workers: {
    auth: true
  }
});

`
};
