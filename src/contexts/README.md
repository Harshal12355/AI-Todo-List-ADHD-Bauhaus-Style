# Contexts (`src/contexts/`)

This directory holds React Context definitions and providers used for managing global state or passing data deeply through the component tree without prop drilling.

## Purpose

React Context is suitable for state that needs to be accessible by many components at different nesting levels, such as:

-   UI Theme (e.g., light/dark mode)
-   User Authentication Status
-   Application Settings
-   Language/Localization Preferences

## Examples Found

-   **`ThemeContext.tsx`**: Provides state and functions for managing and toggling the application's visual theme.

## Integration

Context providers defined here are typically wrapped around parts of the application tree (often in `App.tsx` or layout components) that need access to the shared state. Components can then consume the context using the `useContext` hook. 