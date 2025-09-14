# React Refactoring Task

## Goal
Improve an existing React component by making it cleaner, more maintainable, and more efficient, **without changing its current functionality**.

---

## Step-by-Step Instructions

### 1. Convert to Functional Components
- Rewrite class components as **functional components** using hooks (`useState`, `useEffect`, `useReducer` if needed).

### 2. Keep State Immutable
- Never mutate arrays/objects directly.  
- Use spread, `map`, `filter`, `concat`, or utilities like `immer`.

### 3. Split Into Smaller Components
- Break large components into focused, reusable ones.  
- Store each component in its **own file** and import it where needed.  
- Compose pages and layouts from these smaller components.  
- Avoid over-splitting—only extract if it has its own responsibility or reuse.


### 4. Optimize Rendering
- Use `React.memo` for stable child components.  
- Use `useCallback` / `useMemo` **only when necessary** (avoid premature optimization).

### 5. Clean Code & Best Practices
- Use ES6+ features, clear naming, minimal nesting, and single-responsibility components.  
- Prefer **composition over props drilling** (use Context/hooks if props go too deep).  
- Use explicit `Props` types (TypeScript).

### 6. Preserve Functionality
- Ensure the refactor keeps UI/logic identical.

### 7. Shadcn UI Components
- Use Shadcn primitives (`src/components/ui`) as the base.  
- If a **complex component** is needed, build it from Shadcn components and place it in `app/` (or a feature folder), **not in `ui/`**.  
- This keeps `ui/` as a clean design system layer and `app/` for app-specific components.

### 8. Extra Good Practices
- Extract repeated logic into **custom hooks**.  
- Use **error boundaries / Suspense** for async data.  
- Ensure **accessibility** (ARIA, keyboard navigation).  
- Keep or add **tests** to confirm behavior.  
