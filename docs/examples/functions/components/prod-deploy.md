## Production Deployment

- Create a Satellite on the [Juno Console](https://console.juno.build) for mainnet.
- Update `juno.config.ts` with the production Satellite ID.
- Build and deploy the frontend:

```bash
npm run build
juno hosting deploy
```

- Build and upgrade the serverless functions:

```bash
juno functions build
juno functions upgrade
```
