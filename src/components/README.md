# Components (`src/components/`)

This directory holds all reusable React components used to build the application's user interface.

## Structure

Components are organized into subdirectories based on their scope or function:

-   **`ui/`**: Contains general-purpose, often atomic UI elements (e.g., Button, Input, Card, Dialog). These are likely building blocks provided by a UI library like shadcn/ui, styled with Tailwind CSS.
-   **`layouts/`**: Contains components that define the overall structure and layout of pages (e.g., `Header`, `Sidebar`, `PageWrapper`). These components typically consume other components.
-   **`auth/`**: Contains components specifically related to authentication flows (e.g., `LoginForm`, `SignupForm`).
-   **Root Level (`src/components/`)**: May contain more complex, feature-specific components that don't fit neatly into the above categories, such as `TaskItem.tsx` which is likely used within the `Tasks` page.

## Integration

Components from this directory are imported and used within:

-   **Pages (`src/pages/`)**: To construct the UI for different application views.
-   **Other Components**: Larger components compose smaller ones.
-   **`App.tsx`**: For globally used components like Toasters or layout elements if not handled by `layouts/`. 