Serverless Functions are triggered by hooks, which respond to events occurring in the Satellite, such as setting a document. Before implementing a hook that manipulates data ("backend"), let's first set up a JavaScript function in your ("frontend") dApp.

Define a setter function in your frontend dApp as follows:

```typescript
interface Example {
  hello: string;
}

let key: string | undefined;

const set = async () => {
  key = crypto.randomUUID();

  const record = await setDoc<Example>({
    collection: "demo",
    doc: {
      key,
      data: {
        hello: "world"
      }
    }
  });

  console.log("Set done", record);
};
```

This code generates a key and persists a document in a collection of the Datastore named "demo".

Additionally, add a getter to your code:

```typescript
const get = async () => {
  if (key === undefined) {
    return;
  }

  const record = await getDoc({
    collection: "demo",
    key
  });

  console.log("Get done", record);
};
```

Without a hook, executing these two operations one after the other would result in a record containing "hello: world".
