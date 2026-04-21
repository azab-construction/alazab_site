# Development Guide - العزب للمقاولات

This document outlines the architecture, patterns, and best practices for the AlAzab Construction website.

## Project Structure

```
src/
├── components/           # React components
│   ├── cards/           # Reusable card components
│   ├── ui/              # shadcn/ui components
│   └── *.tsx            # Page components
├── constants/           # Data constants and configuration
├── hooks/               # Custom React hooks
├── integrations/        # Third-party integrations (Supabase)
├── services/            # API service layer
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
├── App.tsx              # Root component
└── index.css            # Global styles
```

## Key Improvements

### Phase 1: Foundation & Cleanup ✅
- **Extracted Data**: All hardcoded project, service, and company data moved to `src/constants/data.ts`
- **Reusable Components**: Created specialized card components (ProjectCard, ServiceCard, StatsCard, ValueCard)
- **Type Safety**: Implemented comprehensive TypeScript interfaces in `src/types/index.ts`
- **Better Maintainability**: Centralized data makes updates easier

### Phase 2: Performance & Image Optimization ✅
- **Custom Hooks**: Created `useLazyLoad` for intersection observer-based lazy loading
- **Image Optimization**: Built `OptimizedImage` component with placeholder support
- **Skeleton Loaders**: Implemented `SkeletonLoader` for perceived performance improvement
- **Form State**: Created `useFormState` hook for better form management

### Phase 3: UI/UX Polish & Design System ✅
- **Layout Utilities**: Centralized spacing, sizing, and responsive patterns in `src/utils/layout.ts`
- **Validation Utilities**: Comprehensive validation helpers with Arabic support in `src/utils/validation.ts`
- **Design Consistency**: Enhanced CSS with animation classes and hover effects
- **ESLint Configuration**: Stricter linting rules for code quality

### Phase 4: Backend Improvements & Stability ✅
- **API Service Layer**: Built `src/services/api.ts` with retry logic and error handling
- **Centralized Error Handling**: Created `ApiError` class for consistent error management
- **Supabase Integration**: Ready-to-use API methods for projects, contacts, and maintenance tasks
- **Retry Mechanism**: Automatic retry with exponential backoff for resilience

### Phase 5: Polish & Documentation
- **This Development Guide**: Documenting patterns and architecture
- **Code Quality**: ESLint configured with TypeScript rules
- **Best Practices**: Established patterns for consistent development

## Component Architecture

### Card Components (`src/components/cards/`)

All card components follow a consistent pattern:

```tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  data: DataType;
}

const CardComponent: React.FC<Props> = ({ data }) => {
  return (
    <Card className="...">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Content */}
      </CardContent>
    </Card>
  );
};

export default CardComponent;
```

### Custom Hooks (`src/hooks/`)

**useLazyLoad**: For implementing intersection observer pattern
```tsx
const { ref, isVisible } = useLazyLoad({ threshold: 0.1, rootMargin: '50px' });
```

**useFormState**: For managing form state with validation
```tsx
const { formState, errors, updateField, setFieldError, reset } = useFormState(initialState);
```

## API Service Layer

All API calls go through `src/services/api.ts` with automatic retry logic:

```tsx
import { projectsApi, contactApi } from '@/services/api';

// Usage
const projects = await projectsApi.getAll();
const project = await projectsApi.getById(id);
await contactApi.submit({ name, email, message });
```

## Styling Approach

- **Tailwind CSS**: Primary styling framework with custom extensions
- **CSS Utilities**: Layout and animation utilities in `src/utils/layout.ts`
- **Design Tokens**: Color system defined in `tailwind.config.ts` and `src/index.css`
- **RTL Support**: Built-in Arabic text support with proper direction handling

## Type Safety

All components and utilities are fully typed:

```tsx
// In src/types/index.ts
export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  location: string;
  year: string;
  client: string;
  featured?: boolean;
}
```

## Validation

Utility validation functions in `src/utils/validation.ts`:

```tsx
import { isValidEmail, isValidPhone, minLength } from '@/utils/validation';

if (!isValidEmail(email)) {
  setFieldError('email', validationMessages.email);
}
```

## Data Constants

All static data centralized in `src/constants/data.ts`:

```tsx
export const PROJECTS: Project[] = [...]
export const SERVICES: Service[] = [...]
export const COMPANY_INFO = { ... }
export const HERO_STATS = [...]
```

## Error Handling

Consistent error handling pattern:

```tsx
try {
  const data = await projectsApi.getAll();
} catch (error) {
  if (error instanceof ApiError) {
    console.error(error.message, error.code);
  }
}
```

## Performance Optimization

1. **Lazy Loading**: Use `useLazyLoad` hook for images and heavy components
2. **Memoization**: Use `useMemo` for expensive computations
3. **Callbacks**: Use `useCallback` for event handlers
4. **Code Splitting**: Component-level code splitting with React.lazy()
5. **Image Optimization**: Use `OptimizedImage` component for all images

## ESLint Rules

Enhanced rules configured in `eslint.config.js`:

- Disallow `console.log()` (except warn/error)
- Require explicit function return types
- Warn on unused variables
- Disallow `var` (use `const`/`let`)
- Require strict equality (===)

## Best Practices

1. **Component Organization**: One component per file, colocated with tests
2. **Props Validation**: Use TypeScript interfaces for all component props
3. **Naming Conventions**: CamelCase for variables/functions, PascalCase for components
4. **Comments**: Use JSDoc comments for public APIs
5. **Error Messages**: Use the predefined messages in `validationMessages` for consistency
6. **Arabic Support**: All text components support RTL with proper direction handling

## Future Improvements

- [ ] Add unit tests with Vitest
- [ ] Implement E2E tests with Playwright
- [ ] Add performance monitoring with Sentry
- [ ] Implement analytics tracking
- [ ] Add PWA support
- [ ] Implement image optimization with sharp
- [ ] Add database migrations with proper versioning
- [ ] Create admin dashboard with role-based access

## Troubleshooting

### Compilation Errors
1. Check if all imports are correct
2. Verify TypeScript types match interface definitions
3. Run `npm run lint` to check ESLint errors

### Supabase Connection Issues
1. Check environment variables are set correctly
2. Verify Supabase project is active
3. Check Row-Level Security (RLS) policies

### Styling Issues
1. Ensure Tailwind classes are properly imported
2. Check RTL direction is set for Arabic content
3. Verify CSS specificity doesn't conflict with components

## Contributing

When adding new features:

1. Create data structures in `src/constants/data.ts`
2. Define TypeScript interfaces in `src/types/index.ts`
3. Create reusable components in appropriate folders
4. Use existing utilities and hooks
5. Follow the established patterns
6. Update this document with architectural changes
