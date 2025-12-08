# @monorepo/tokens

Design tokens and theme definitions for the anucreative monorepo. Uses Style Dictionary to generate CSS custom properties from centralized token files.

## Structure

- `tokens/default.json` - Default theme design tokens (colors, typography, spacing, layout)
- `tokens/alan.json` - ALAN theme design tokens
- `style-dictionary.config.js` - Style Dictionary configuration
- `dist/` - Generated CSS files (created during build)

## Tokens

Each theme JSON file defines:

- **Colors** - Primary, secondary, accent, text, background, border, link
- **Typography** - Font family, sizes (xs, sm, base, lg, xl), weights (normal, semibold, bold)
- **Spacing** - Scale from xs (4px) to 2xl (48px)
- **Layout** - Max-width and other layout constraints

## Build

```bash
yarn build
```

Generates CSS files in `dist/`:

- `default.css` - Default theme CSS custom properties
- `alan.css` - ALAN theme CSS custom properties

## Usage

Import in other packages:

```tsx
// In packages/ui or apps/react
import '@monorepo/tokens/default.css'
```

CSS custom properties are automatically available:

```css
color: var(--color-primary);
font-size: var(--typography-font-size-lg);
padding: var(--spacing-md);
```

## Adding New Themes

1. Create `tokens/theme-name.json` with the same structure as existing themes
2. Update `style-dictionary.config.js` to include the new theme in the `files` array
3. Run `yarn build` to generate CSS
4. Import and use in apps

## Adding New Token Types

1. Add new token definitions to `tokens/*.json` files
2. Run `yarn build` to generate updated CSS
3. Use in components via CSS custom properties
