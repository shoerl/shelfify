# Architecture Overview

This document provides a high-level overview of the Shelfify frontend application's architecture.

## Frontend Architecture

Shelfify is a single-page application (SPA) built using **React** with **TypeScript**. It leverages **Vite** as a build tool for a fast development experience.

## Key Architectural Layers and Technologies

1.  **Entry Point (`src/main.tsx`):** The application starts in `src/main.tsx`, where the React app is mounted to the DOM. This file also sets up key providers like `QueryClientProvider` (for TanStack Query), `ThemeProvider` (for Material UI), and `BrowserRouter` (for React Router).

2.  **Main Application (`src/App.tsx`):** The main `App` component in `src/App.tsx` defines the application's routing using **React Router**. It wraps the routed content within an `AppShell` component from the `components/Layout` directory, providing a consistent layout.

3.  **Pages (`src/pages/`):** This directory contains the top-level components for each route in the application. Each file typically represents a distinct view or page (e.g., `MyShelves.tsx`, `ShelfDetail.tsx`).

4.  **Components (`src/components/`):** This directory houses reusable UI components used across different pages. Components are organized into subdirectories based on their function or the feature they belong to (e.g., `Layout/`, `item/`, `collection/`, `shared/`, `proposal/`).

5.  **API Interaction (`src/api/`):** The application communicates with the backend API via modules in the `src/api/` directory. **Axios** is used for making HTTP requests. The base API configuration (including the base URL from the `VITE_API_URL` environment variable and handling credentials) is in `src/api/client.ts`. Specific API endpoints are grouped into files like `ownedItems.ts`, `catalog.ts`, etc.

6.  **Data Fetching and State Management (`src/hooks/` and TanStack Query):** **TanStack Query** is used for managing server state, including data fetching, caching, and synchronization. Custom hooks in the `src/hooks/` directory (e.g., `useOwnedItems`, `useCatalog`) encapsulate the logic for fetching and interacting with data using TanStack Query hooks (`useQuery`, `useMutation`, etc.). This centralizes data fetching logic and provides hooks that can be easily consumed by page or component components.

7.  **UI Library (Material UI):** The application uses **Material UI (MUI)** for its component library and styling. The custom theme configuration is located in `src/theme.ts`.

8.  **Type Definitions (`src/types/`):** TypeScript type interfaces and definitions used throughout the application are stored in the `src/types/` directory, ensuring type safety.

## Project Structure

The main parts of the project are located within the `src/` directory:

-   `src/pages/`: Contains the top-level components for each route in the application. Examples include `MyShelves.tsx`, `ShelfDetail.tsx`, `AllCopies.tsx`, etc., representing distinct views or pages.
-   `src/components/`: Houses reusable UI components used across different pages. Components are organized into subdirectories based on their function or the feature they belong to:
    -   `Layout/`: Contains components for the overall application layout, such as the `AppShell`.
    -   `item/`: Components related to displaying or interacting with individual items.
    -   `collection/`: Components specific to managing or displaying collections/shelves.
    -   `shared/`: General-purpose reusable components.
    -   `proposal/`: (If applicable) Components related to a specific feature or proposed changes.
-   `src/api/`: Contains modules for interacting with the backend API. Each file generally corresponds to a different domain or set of related API endpoints:
    -   `ownedItems.ts`: API calls related to managing items owned by the user.
    -   `catalog.ts`: API calls for interacting with a wider item catalog.
    -   `client.ts`: Configures the base Axios client for API requests, setting the `baseURL` using the `VITE_API_URL` environment variable and handling credentials.
    -   `collectionTypes.ts`: API calls for fetching different types of collections.
-   `src/hooks/`: Custom React hooks to encapsulate component logic and facilitate data fetching and mutations using TanStack Query. Each hook typically interacts with one or more functions from the `src/api/` modules.
    -   `useCollectionTypes.ts`: Hook for fetching collection types.
    -   `useCreateOwnedItem.ts`: Hook for creating new owned items.
    -   `useOwnedItems.ts`: Hook for fetching owned items.
    -   `useCatalog.ts`: Hook for fetching catalog data.
-   `src/types/`: TypeScript type interfaces and definitions used throughout the application, ensuring type safety for data structures.
-   `src/theme.ts`: Configuration for the Material UI theme, defining the application's visual styles, colors, and typography.

## API Interaction

The frontend application is separated from the backend API. Communication occurs over HTTP using **Axios**. The base URL for API requests is configured in `src/api/client.ts` using the `VITE_API_URL` environment variable, which should be set in a `.env` file in the project root (e.g., `VITE_API_URL=http://localhost:3000/api`). API calls are organized logically within the `src/api/` directory.

## Data Flow (High-Level)

1.  A user interacts with a component or page, triggering an action (e.g., clicking a button to view items on a shelf).
2.  The component/page calls a relevant custom hook from `src/hooks/` (e.g., `useOwnedItems` filtered by shelf ID).
3.  The custom hook utilizes **TanStack Query** hooks (`useQuery` for fetching data, `useMutation` for creating/updating/deleting data) to manage the asynchronous operation and its state (loading, error, data).
4.  TanStack Query invokes the appropriate API function defined in `src/api/`.
5.  The API function uses **Axios** to make an HTTP request to the backend API endpoint specified by the `VITE_API_URL` and the endpoint path.
6.  The backend API processes the request and responds with data.
7.  Axios receives the response and returns it to the API function.
8.  The API function returns the data to the TanStack Query hook.
9.  TanStack Query caches the received data and updates the query state.
10. The custom hook receives the updated state from TanStack Query and returns it to the component/page.
11. The component/page re-renders based on the new data or state (e.g., displaying a loading spinner, showing the fetched items, displaying an error message).

Mutations (e.g., adding a new item) follow a similar flow but use `useMutation`. Upon successful mutation, TanStack Query's cache invalidation or updates are often used to automatically refetch or update related data, ensuring the UI remains consistent with the backend.

## Diagrams

[// TODO: Add architecture diagrams here, e.g., using Mermaid syntax or linking to image files. Consider diagrams illustrating component hierarchy, data flow for specific actions, or the relationship between frontend modules and API endpoints.] 