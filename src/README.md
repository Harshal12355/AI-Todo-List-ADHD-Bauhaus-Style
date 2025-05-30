# Source Code (`src/`)

This directory contains all the core source code for the Bauhaus Taskflow Timer application.

## Entry Points

-   **`main.tsx`**: The main entry point of the application. It initializes React, imports global CSS (`index.css`), and renders the root `App` component into the DOM.
-   **`App.tsx`**: The root React component. It sets up global providers (React Query, Tooltip, Toasters), defines application routes using `react-router-dom`, handles basic authentication logic, and renders the appropriate page component based on the URL.

## Core Directories

-   **`components/`**: Contains reusable React components used throughout the application, categorized into UI elements (`ui/`), page layouts (`layouts/`), authentication components (`auth/`), and specific components like `TaskItem.tsx`.
-   **`pages/`**: Holds the top-level components for each distinct page or view of the application (e.g., Home, Login, Tasks, Timer). These are rendered by the router in `App.tsx`.
-   **`hooks/`**: Contains custom React hooks to encapsulate reusable logic and stateful behavior (e.g., `use-toast`, `use-mobile`).
-   **`contexts/`**: Provides global state management using React Context API (e.g., `ThemeContext.tsx`).
-   **`services/`**: Includes modules responsible for interacting with external APIs or backends (`api.ts`). Often works in conjunction with React Query for data fetching and management.
-   **`integrations/`**: Houses code specific to third-party service integrations (e.g., `supabase/`).
-   **`lib/`**: Contains utility functions and helper modules (`utils.ts`) shared across the application.
-   **`styles/`**: Stores global CSS files (`globals.css`) or styles not specific to a single component. Component-specific styles might be co-located or defined within component files. `index.css` and `App.css` provide base and application-level styling.
-   **`images/`**: Stores static image assets used in the application.

## Other Files

-   **`index.css`**: Global styles applied to the entire application.
-   **`App.css`**: Styles specific to the root `App` component layout or structure.
-   **`vite-env.d.ts`**: TypeScript definition file for Vite environment variables. 