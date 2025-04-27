# Styles (`src/styles/`)

This directory contains global or shared CSS style files.

## Purpose

-   To define base styles, CSS variables, or utility classes that apply across the entire application.
-   To hold styles that are not specific to a single component or are difficult to co-locate.

## Files

-   **`globals.css`**: Typically imported early in the application (often alongside `index.css` or directly in `main.tsx`/`App.tsx`) to set up foundational styles, CSS custom properties (variables), or apply base styling to HTML elements.
-   **`index.css` (in `src/`)**: The primary global stylesheet, usually imported in `main.tsx`. Often includes Tailwind CSS directives (`@tailwind base; @tailwind components; @tailwind utilities;`) and other global styles.
-   **`App.css` (in `src/`)**: Contains styles specifically for the main `App.tsx` component, often related to its layout or root elements.

## Integration

-   `index.css` is imported in `main.tsx`.
-   `App.css` is likely imported in `App.tsx`.
-   `globals.css` might be imported directly or indirectly via `index.css`.

Note: This project likely uses Tailwind CSS, meaning many styles will be applied via utility classes directly in the TSX component files rather than in separate CSS files. 