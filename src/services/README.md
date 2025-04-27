# Services (`src/services/`)

This directory contains modules responsible for communication with external resources, primarily backend APIs.

## Purpose

Service modules abstract the details of data fetching, data mutation, and interaction with external endpoints. This helps to:

-   Centralize API logic.
-   Keep components and pages focused on presentation and UI state.
-   Make API interactions reusable across different parts of the application.

## Examples Found

-   **`api.ts`**: Likely contains functions for making HTTP requests to the application's backend (e.g., `fetchTasks`, `createTask`, `updateTask`). It might use `fetch`, `axios`, or a library integrated with React Query.

## Integration

Functions exported from service modules are typically called from:

-   **React Query hooks**: Often used within custom hooks (`src/hooks/`) or directly in page/component components (`src/pages/`, `src/components/`) via React Query's `useQuery` and `useMutation` hooks.
-   **Event handlers**: Directly within components to trigger data mutations (e.g., submitting a form).

The `QueryClientProvider` setup in `App.tsx` manages the caching and state related to these service calls. 