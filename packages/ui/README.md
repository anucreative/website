# @monorepo/ui

Reusable Lit web components library for the anucreative monorepo. Provides CV/portfolio components with theme support.

## Components

### CVHeader

Header component displaying name, title, summary, and profile links.

```tsx
import { CVHeader } from '@monorepo/ui/components'

export function MyHeader() {
  return <cv-header name="Your Name" label="Software Engineer" summary="Brief bio"></cv-header>
}
```

**Properties:**

- `name: string` - Full name
- `label: string` - Job title/label
- `summary: string` - Brief summary (optional)
- `profiles: Array<{ network: string; url: string }>` - Social/profile links (set via property: `element.profiles = [...]`)

**CSS Variables:**

- `--color-primary` - Primary text color
- `--color-link` - Link color
- `--font-xl` - Extra large font size
- `--spacing-lg`, `--spacing-md`, `--spacing-sm` - Spacing utilities

### CVSection

Wrapper component for CV sections with title header.

```tsx
export function WorkSection() {
  return <cv-section>Section content goes here</cv-section>
}
```

**CSS Variables:**

- `--color-primary` - Title color
- `--color-accent` - Title underline
- `--spacing-lg`, `--spacing-md`, `--spacing-xs` - Spacing

### CVSectionTitle

Title component for section headers.

```tsx
export function SectionTitle() {
  return <cv-section-title>Work Experience</cv-section-title>
}
```

**Properties:**

- Accepts text content via slot

**CSS Variables:**

- `--color-primary` - Title color
- `--color-accent` - Title underline
- `--font-lg` - Title font size
- `--spacing-md`, `--spacing-sm` - Spacing

### CVSubsection

Subsection component for organizing content within sections.

```tsx
export function ExperienceSubsection() {
  return (
    <cv-subsection label="Technical Lead">
      Subsection content like job details or accomplishments
    </cv-subsection>
  )
}
```

**Properties:**

- `label: string` - Subsection label

**CSS Variables:**

- `--color-primary` - Title color
- `--font-lg` - Title font size
- `--spacing-md`, `--spacing-sm` - Spacing utilities

## Themes

Themes are defined in `@monorepo/shared` with the following structure:

- **Colors:** `primary`, `secondary`, `accent`, `text`, `background`, `border`, etc.
- **Typography:** `fontFamily`, `fontSize`, `h1Size`, `h1Weight`, `h2Size`, etc.
- **Spacing:** `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
- **Layout:** `maxWidth`
- **Format:** `borderRadius`, etc.

## Installation

```bash
yarn add @monorepo/ui
```

### Development with Storybook

To develop components interactively:

```bash
cd packages/ui
yarn storybook
```

This opens Storybook at http://localhost:6006 where you can:

- View all components with different prop combinations
- Test theming (switch between default and alan themes)
- Check accessibility compliance
- See live code examples

## Usage

Use components directly in React with standard HTML syntax. React 19 provides excellent support for web components:

```tsx
export function CV() {
  return (
    <>
      <cv-header name="John Doe" label="Full Stack Engineer"></cv-header>
      <cv-section title="Experience">Experience content goes here</cv-section>
    </>
  )
}
```

**Note:** For complex data like arrays (e.g., `profiles` in CVHeader), set properties imperatively:

```tsx
const ref = useRef<HTMLElement>(null)

useEffect(() => {
  if (ref.current) {
    ref.current.profiles = [
      { network: 'GitHub', url: 'https://github.com/...' },
      { network: 'LinkedIn', url: 'https://linkedin.com/...' },
    ]
  }
}, [])

return <cv-header ref={ref} name="John" label="Engineer"></cv-header>
```

See `apps/react/src/routes/__root.tsx` for how themes are integrated in the root layout.

## CSS Variable Override

Override theme variables in your CSS:

```css
:root {
  --color-primary: #333;
  --color-accent: #ff6b7a;
  --font-lg: 1.3rem;
}
```

## Development

```bash
# Build components
yarn build

# Type check
yarn type-check

# Run Storybook for interactive component testing
yarn storybook

# Build Storybook for static deployment
yarn storybook:build

# Clean output
yarn clean
```

### Storybook

Storybook is set up for interactive component development and testing:

1. **Run Storybook:** `yarn storybook` (opens at http://localhost:6006)
2. **Browse Stories:** Navigate to "Components" section to see:
   - CVHeader - with different theme examples
   - CVSection - section wrapper component
   - CVSectionTitle - section title component
   - CVSubsection - subsection wrapper component
3. **Test Themes:** Each component has stories for both `default` and `alan` themes
4. **Accessibility Testing:** Built-in accessibility panel checks for WCAG violations
5. **Vitest Integration:** Run component tests within Storybook with the Vitest addon

Story files are located in `src/components/*.stories.ts` and use Lit's `html` template syntax.

## Architecture

- **Lit 3.1.0** - Web components framework
- **TypeScript** - Type safety with experimental decorators
- **CSS Variables** - Theme system based on CSS custom properties
- **Monorepo** - Integrated with Turborepo build pipeline

## CSS Variable Mapping

Components use CSS variables prefixed with `--`:

| Category | Variables |
| --- | --- |
| Colors | `color-primary`, `color-secondary`, `color-accent`, `color-text`, `color-text-muted`, `color-bg-secondary`, `color-link`, `color-link-hover` |
| Typography | `font-xl`, `font-lg`, `font-md`, `font-sm`, `font-xs`, `font-bold` |
| Spacing | `spacing-lg`, `spacing-md`, `spacing-sm`, `spacing-xs` |

Set these in `:root` or on component containers to customize styling globally or locally.
