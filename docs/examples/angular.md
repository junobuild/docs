---
title: Angular Example
description: A fullstack note-taking app built with Angular, and Tailwind CSS using Juno for authentication, data, and file storage.
tags: [angular, typescript, frontend, example, template, juno]
sidebar_label: Angular
---

# Angular Example

This project is a note-taking app template built with **Angular**, **TypeScript**, and **Tailwind CSS**, designed to demonstrate integration with [Juno](https://juno.build) for app development. It showcases authentication, data storage, and file storage using Juno's Satellite container.

You can scaffold it using the following command, or browse the source code:

```bash
npm create juno@latest -- --template react-example
```

Source: [github.com/junobuild/create-juno/templates/angular-example](https://github.com/junobuild/create-juno/tree/main/templates/angular-example)

---

## Folder Structure

```
angular-example/
├── public/                # Static assets
├── src/
│   ├── app/               # Angular modules, components, services, and types
│   ├── environments/      # Environment configuration files
│   ├── styles.css         # Tailwind CSS styles
│   └── main.ts            # Angular entry point
├── juno.config.mjs        # Juno Satellite configuration
├── package.json           # Project dependencies and scripts
├── angular.json           # Angular CLI configuration
├── README.md              # User-facing documentation
└── ...                    # Other config and build files
```

---

## Key Features

- **Juno Integration**: Uses Juno's Satellite for authentication, Datastore, and Storage.
- **Authentication**: Login/logout flow.
- **Notes Collection**: Users can create, view, and delete notes (text, with optional file URL).
- **Images Collection**: Supports file storage for images.
- **Responsive UI**: Built with Tailwind CSS for modern styling.
- **Banner**: Warns if the Satellite is not configured for local development.

---

## Main Components

- **app.component.ts**: Main Angular component, bootstraps the app and layout.
- **components/**: Contains UI and logic for authentication, notes table, modal, banner, etc.
- **services/**: Angular services for interacting with Juno and managing app state.
- **types/note.ts**: TypeScript interface for notes.

---

## Data Structure

- **Note** (`src/app/types/note.ts`):
  ```ts
  export interface Note {
    text: string;
    url?: string;
  }
  ```

---

## How to Run

1. **Install dependencies**:
   ```sh
   npm install
   ```

2. **Start Juno local emulator**:

   > Requires the Juno CLI to be available `npm i -g @junobuild/cli`

   ```sh
   juno dev start
   ```

3. **Create a Satellite** for local dev:
    - Visit [http://localhost:5866](http://localhost:5866) and follow the instructions.
    - Update `src/environments/environment.ts` with your Satellite ID.

4. **Start the frontend dev server**:
   ```sh
   npm run start
   ```

5. **Create required collections**:
    - `notes` in Datastore: [http://localhost:5866/datastore](http://localhost:5866/datastore)
    - `images` in Storage: [http://localhost:5866/storage](http://localhost:5866/storage)

---

## Juno-Specific Configuration

- **juno.config.mjs**: Defines Satellite IDs for development/production, build source, and predeploy steps.
- **src/environments/environment.ts**: Contains the Satellite ID for local development.
- **src/environments/environment.prod.ts**: Contains the Satellite ID for production.

---

## Production Deployment

- Create a Satellite on the [Juno Console](https://console.juno.build) for mainnet.
- Update `src/environments/environment.prod.ts` and `juno.config.mjs` with the production Satellite ID.
- Build and deploy:
  ```sh
  npm run build
  juno deploy
  ```

---

## Notes

- The app is intended as a starting point for Juno-based projects.
- All logic is in TypeScript and Angular components/services.
- The app is fully client-side (Server Side Rendering is not supported yet) and interacts with Juno via the Satellite container.  