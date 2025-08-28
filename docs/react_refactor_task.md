# React Refactoring Task

## Goal

Improve an existing React component by making it cleaner, more maintainable, and more efficient, **without changing its
current functionality**.

---

## Step-by-Step Instructions

### 1. Convert to Functional Components (if needed)

- Rewrite class components as **functional components**.
- Use React Hooks like `useState` and `useEffect` instead of `this.state` and lifecycle methods.

**Example:**

```jsx
// Before (class)
class MyComponent extends React.Component {
    state = {count: 0};

    render() {
        return <div>{this.state.count}</div>;
    }
}

// After (functional)
const MyComponent = () => {
    const [count, setCount] = useState(0);
    return <div>{count}</div>;
};
```

### 2. Make State Immutable

- Avoid mutating arrays or objects directly (`push`, `splice`, direct assignment).
- Use immutable operations like `map`, `filter`, `concat`, or spread syntax (`...`).

**Example:**

```jsx
// Bad
todos.push(newTodo);

// Good
setTodos([...todos, newTodo]);
```

### 3. Split Into Smaller Components

- Identify logical parts of the UI that can become **separate components**.
- Examples: `TodoItem`, `TodoInput`, `TodoList`.
- Pass only necessary props to child components.

### 4. Optimize Rendering

- Use `React.memo` for child components that do not need to re-render on every parent update.
- Use `useCallback` for functions passed to child components.
- Use `useMemo` for expensive calculations inside render. In most cases, useMemo is not necessary unless the computation is expensive or you’re memoizing referential equality for child components. For class names, small conditions, or string concatenations, plain inline computation is faster and cleaner.

**Example:**

```jsx
const TodoItem = React.memo(({todo, onDelete}) => (
    <li>{todo}
        <button onClick={onDelete}>Delete</button>
    </li>
));

const handleDelete = useCallback((index) => {
    setTodos(todos => todos.filter((_, i) => i !== index));
}, []);
```

### 5. Clean Code & Best Practices

- Use modern ES6+ syntax (`arrow functions`, `destructuring`, `template literals`).
- Minimize deeply nested JSX and duplicate logic.
- Use clear variable and function names.
- Keep components focused on a single responsibility.

### 6. Preserve Functionality

- Ensure the refactored component behaves **exactly the same** as before.
- Do not change UI behavior or business logic.

---

This guide ensures the refactoring is safe, modern, and follows React best practices, suitable for automated or manual
refactoring.

