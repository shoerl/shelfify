# Shelfify

## Project Description

Shelfify is a web application built to help users manage their collections of items. Based on the available pages, it seems designed to track items, organize them into shelves, manage copies, maintain a wishlist, view statistics, and see recent activity.

## Features

While still under development, the application includes the following features (based on available pages):

- **Home:** The landing page for the application.
- **My Shelves:** Organize items into custom collections.
- **Shelf Detail:** View the items within a specific shelf.
- **All Copies:** See a list of all owned copies of items.
- **Wishlist:** Keep track of items you want to acquire.
- **Statistics:** View relevant statistics about your collection.
- **Activity Feed:** See a history of recent actions.
- **All Items:** View a list of all items in the system.

## Technologies Used

- **Frontend:** React with TypeScript
- **Build Tool:** Vite
- **Package Manager:** Yarn
- **Routing:** React Router
- **State Management/Data Fetching:** TanStack Query
- **UI Library:** Material UI (MUI)
- **Linting:** ESLint
- **Code Formatting:** Prettier (implied by linting setup)
- **Git Hooks:** Husky & lint-staged

## Setup

To get Shelfify up and running on your local machine, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd shelfify
    ```

2.  **Install dependencies:**

    Shelfify uses Yarn as its package manager. Make sure you have Yarn installed globally. Then, install the project dependencies:

    ```bash
    yarn install
    ```

3.  **Run the development server:**

    Start the Vite development server:

    ```bash
    yarn dev
    ```

    The application should now be running at the address shown in your terminal (usually `http://localhost:5173`).

## Available Scripts

In the project directory, you can run the following scripts:

-   `yarn dev`: Runs the app in development mode.
-   `yarn build`: Builds the app for production to the `dist` folder.
-   `yarn lint`: Runs ESLint to check for code quality issues.
-   `yarn lint:fix`: Runs ESLint and automatically fixes fixable issues.
-   `yarn preview`: Serves the production build locally for previewing.
-   `yarn prepare`: Sets up Husky git hooks.

## Project Structure

The main parts of the project are located within the `src/` directory:

-   `src/pages/`: Contains the main page components for different routes.
-   `src/components/`: Houses reusable React components, including subdirectories like `Layout/`, `item/`, `collection/`, `shared/`, and `proposal/`.
-   `src/api/`: Contains modules for interacting with the backend API, such as `ownedItems.ts`, `catalog.ts`, and `collectionTypes.ts`. The base API client is configured in `client.ts` using Axios and the `VITE_API_URL` environment variable.
-   `src/hooks/`: Custom React hooks for various functionalities like data fetching.
-   `src/types/`: TypeScript type definitions.
-   `src/theme.ts`: Material UI theme configuration.

## API Interaction

The application communicates with a backend API using Axios. The API client is configured in `src/api/client.ts`, using the `VITE_API_URL` environment variable for the base URL. Specific API calls are organized into modules within the `src/api/` directory, such as:

-   `ownedItems.ts`: API calls related to managing owned items.
-   `catalog.ts`: API calls for interacting with the item catalog.
-   `collectionTypes.ts`: API calls for fetching collection types.

## Reusable Components

Common UI elements are developed as reusable React components and located in the `src/components/` directory. Some notable components include:

-   `CollectionCard.tsx`: A component for displaying collection information.
-   `DynamicForm.tsx`: A flexible component likely used for rendering various forms.
-   `ItemTable.tsx`: A component for displaying lists of items, likely using Material UI's DataGrid.
-   `Layout/`: Contains layout-related components, such as the `AppShell`.
-   `item/`, `collection/`, `shared/`, `proposal/`: Subdirectories organizing components by feature or type.

## Custom Hooks

The `src/hooks/` directory contains custom React hooks to encapsulate component logic and facilitate data fetching with TanStack Query. Examples include:

-   `useCollectionTypes.ts`: Hook for fetching collection types.
-   `useCreateOwnedItem.ts`: Hook for creating new owned items.
-   `useOwnedItems.ts`: Hook for fetching owned items.
-   `useCatalog.ts`: Hook for fetching catalog data.

## Contributing

[// ... add contributing guidelines here if applicable ...]

## License

[// ... add license information here ...]
