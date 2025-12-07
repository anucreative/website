# @monorepo/ui

Reusable Lit web components library for the anucreative monorepo. Provides CV/portfolio components with theme support.

## Components

### CVHeader

Header component displaying name, title, summary, and profile links.

```tsx
import { CVHeader } from '@monorepo/ui/components'

export function MyHeader() {
  return (
    <CVHeader
      name="Your Name"
      label="Software Engineer"
      summary="Brief bio"
      profiles={[
        { network: 'GitHub', url: 'https://github.com/...' },
        { network: 'LinkedIn', url: 'https://linkedin.com/...' },
      ]}
    />
  )
}
```

**Properties:**

- `name: string` - Full name
- `label: string` - Job title/label
- `summary: string` - Brief summary (optional)
- `profiles: Array<{ network: string; url: string }>` - Social/profile links

**CSS Variables:**

- `--color-primary` - Primary text color
- `--color-link` - Link color
- `--font-xl` - Extra large font size
- `--spacing-lg`, `--spacing-md`, `--spacing-sm` - Spacing utilities

### CVCard

Card component for CV entries (work experience, education, etc.).

```tsx
import { CVCard } from '@monorepo/ui/components'

export function JobEntry() {
  return (
    <CVCard
      title="Senior Engineer"
      subtitle="Acme Corp"
      date="Jan 2020 - Present"
      description="Responsibilities and achievements..."
    />
  )
}
```

**Properties:**

- `title: string` - Entry title (e.g., job title)
- `subtitle: string` - Subtitle (e.g., company name)
- `date: string` - Date range
- `description: string` - Entry description

**CSS Variables:**

- `--color-primary` - Primary text
- `--color-secondary` - Secondary text
- `--color-accent` - Border/highlight color
- `--color-bg-secondary` - Card background
- `--color-text-muted` - Muted text (date)
- `--font-lg`, `--font-md`, `--font-sm` - Typography
- `--spacing-md`, `--spacing-xs` - Spacing

### CVSection

Wrapper component for CV sections with title header.

```tsx
import { CVSection, CVCard } from '@monorepo/ui/components'

export function WorkSection() {
  return (
    <CVSection title="Work Experience">
      <CVCard
        title="Senior Engineer"
        subtitle="Acme Corp"
        date="Jan 2020 - Present"
        description="..."
      />
    </CVSection>
  )
}
```

**Properties:**

- `title: string` - Section title

**CSS Variables:**

- `--color-primary` - Title color
- `--color-accent` - Title underline
- `--spacing-lg`, `--spacing-md`, `--spacing-xs` - Spacing

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

Use components directly in React with JSX (React 19 supports web components):

```tsx
import { CVHeader, CVCard, CVSection } from '@monorepo/ui/components'

export function CV() {
  return (
    <>
      <CVHeader
        name="John Doe"
        label="Full Stack Engineer"
        profiles={[{ network: 'GitHub', url: 'https://github.com/...' }]}
      />
      <CVSection title="Experience">
        <CVCard
          title="Senior Engineer"
          subtitle="Tech Company"
          date="2020 - Present"
          description="Built scalable systems..."
        />
      </CVSection>
    </>
  )
}
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
   - CVCard - work experience, education, and other variants
   - CVSection - section wrapper with multiple cards
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
