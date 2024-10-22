export const code = `// Import functions from the JavaScript SDK.
import { signIn, signOut, authSubscribe, 
    InternetIdentityProvider 
} from "@junobuild/core";

// Subscribe to changes in the user state at
// the top level of your app.
authSubscribe((user) => {
  console.log("User is defined or null:", user);
});

// Sign-in with the default function
<button onClick={signIn}>Sign-in</button>

// Or sign in with custom options,
// like specifying a specific provider.
await signIn({
  provider: new InternetIdentityProvider({
    domain: "ic0.app"
  })
});

// Obviously, sign-out is also supported
await signOut();

// Automatically sign out users when their session expires
// by initializing the library with a watcher worker.
await initSatellite({
  workers: {
    auth: true
  }
});

`;
