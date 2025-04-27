# Hooks (`src/hooks/`)

This directory contains custom React Hooks used to encapsulate reusable stateful logic, side effects, or utility functions within the application.

## Purpose

Custom hooks help to:

-   Keep components clean and focused on rendering.
-   Share logic between multiple components without prop drilling or complex component composition.
-   Abstract away complex implementation details (e.g., interacting with browser APIs, managing timers, fetching data).

## Examples Found

-   **`use-toast.ts`**: Likely provides a convenient way to trigger notifications using the toaster components set up in `App.tsx`.
-   **`use-mobile.tsx`**: Probably detects if the application is running on a mobile device, allowing components to adapt their rendering or behavior.

## Integration

Hooks are imported and used within React functional components (primarily in `src/pages/` and `src/components/`) to add specific behaviors or access shared logic. 