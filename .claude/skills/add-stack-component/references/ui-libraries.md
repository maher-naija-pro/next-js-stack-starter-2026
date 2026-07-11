# UI & App Libraries — integration guide

All client-side; no server/infra changes. Mark components using them with `'use client'` per this project's existing convention (see `src/components/counter.tsx`).

## Tables / data grids — TanStack Table

1. `pnpm add @tanstack/react-table`
2. Build on top of the existing shadcn/ui primitives — TanStack Table is headless, so pair it with shadcn's `table` component: `pnpm dlx shadcn@latest add table`.
3. Typical shape: a `columns: ColumnDef<T>[]` array + `useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })`, rendered into the shadcn `<Table>` markup.

## Charts / dataviz — Recharts

1. `pnpm add recharts`
2. Wrap chart components in `'use client'` files under `src/components/charts/`.
3. Before choosing colors/palettes, check if the `dataviz` Claude Code skill is available in this environment and prefer its guidance over ad hoc colors.

## Animation — Motion

1. `pnpm add motion`
2. Import `{ motion } from 'motion/react'` in client components; replace static elements with `<motion.div>` etc. where animation is wanted. Keep it scoped — don't wrap the whole app in a motion provider unless doing shared layout animations.

## Drag & drop — dnd-kit

1. `pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities`
2. Wrap the draggable region in `<DndContext>`, list items in `<SortableContext>`, and use `useSortable()` per item. Keep drag state in a Zustand store (`src/stores/`) if it needs to persist across components, otherwise local `useState` is fine.

## Dates — date-fns

1. `pnpm add date-fns`
2. Import individual functions (`import { format } from 'date-fns'`) — never `import * as dateFns` — to preserve tree-shaking.

## PDF generation — pdf-lib / @react-pdf/renderer

Two different use cases:
- **Programmatic/editing existing PDFs** (fill forms, merge, stamp): `pnpm add pdf-lib`.
- **Rendering a React component to a new PDF** (invoices, reports): `pnpm add @react-pdf/renderer`, build a `.tsx` document using its `<Document>`/`<Page>`/`<Text>` primitives, render server-side in a route handler with `renderToStream`.
- For pixel-perfect complex layouts neither handles well, fall back to Playwright (already installed for e2e tests): render an HTML page and `page.pdf()`.

Ask the user which use case before installing — they're not interchangeable.

## CSV import/export — Papa Parse

1. `pnpm add papaparse` and `pnpm add -D @types/papaparse`
2. Export: `Papa.unparse(data)` → trigger a client-side download via a Blob.
3. Import: `Papa.parse(file, { header: true, complete: (results) => ... })`, ideally with `worker: true` for large files to avoid blocking the main thread.

## Onboarding tours — driver.js

1. `pnpm add driver.js`
2. Client component initializing `driver({ steps: [...] })` and calling `.drive()` on mount/trigger. Target elements by `data-tour-id` attributes added to the relevant UI, not fragile CSS selectors.

## Public API docs — zod-openapi + Scalar

Only relevant if the project exposes a public API (route handlers meant for external consumers, not just the app's own frontend).
1. `pnpm add zod-openapi @scalar/nextjs-api-reference`
2. Extend existing Zod schemas (the ones already used for validation, e.g. in Server Actions/route handlers) with `.openapi({...})` metadata via `zod-openapi`'s `extendZodWithOpenApi`.
3. Generate the OpenAPI document in a route handler (`src/app/api/openapi.json/route.ts`) via `createDocument()`.
4. Serve the Scalar UI at `src/app/api-docs/page.tsx` using `<ApiReference configuration={{ spec: { url: '/api/openapi.json' } }} />`.
