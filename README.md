# Advanced React Filter Builder

A powerful, recursive, and type-safe React component for building complex nested data filters. Designed with a clean UI inspired by modern data grid tools, it supports infinite nesting of AND/OR groups and automatically adapts input fields based on column data types.

![Advanced Filter Builder Screenshot](screenshot.png)

> **Note**: The UI is styled to match the reference image provided, featuring color-coded inputs (Green for Fields, Orange for Operators) and a clean, hierarchical tree structure.

## 🚀 Features

### 1. Recursive Logic Builder
- **Infinite Nesting**: Create complex logic trees with unlimited depth (Groups within Groups).
- **AND/OR Logic**: Toggle between boolean logic for each group independently.
- **Visual Hierarchy**: Uses indentation and vertical guide lines to clearly visualize the relationship between parent and child filters.

### 2. Type-Aware Inputs
The component is intelligent. It checks the data type of the selected column and renders the appropriate input widget automatically:
- **String**: Standard Text input.
- **Number**: Numeric input.
- **Boolean**: Dropdown (True/False).
- **Date**: Native browser Date picker.
- **Select**: Dropdown with predefined options (Enums).

### 3. Context-Aware Operators
The list of available operators changes dynamically based on the field type to prevent invalid queries:
- **Strings**: `Equals`, `Contains`, `Starts with`, `Ends with`, `Does not contain`.
- **Numbers**: `=`, `!=`, `>`, `<`, `>=`, `<=`.
- **Dates**: `On`, `Before`, `After`.
- **Booleans/Selects**: `Is`, `Is not`, `Is any of`.

### 4. Developer Experience
- **Structured JSON Output**: The component outputs a clean, recursive JSON object ready for your backend (easily parsable to SQL, MongoDB queries, or elasticsearch).
- **Fully Typed**: Built with TypeScript.
- **Zero External UI Dependencies**: Built with standard HTML elements and Tailwind CSS.

## 🛠️ Tech Stack

- **React 18+**: Functional components and Hooks.
- **Tailwind CSS**: For responsive and atomic styling.
- **Lucide React**: For lightweight, crisp icons.
- **TypeScript**: For type safety and better developer tooling.

## 📦 Data Structures

### Column Definition
Define what users can filter by passing an array of columns:

```typescript
const columns: Column[] = [
  { id: 'firstName', label: 'First Name', type: 'string' },
  { id: 'age', label: 'Age', type: 'number' },
  { id: 'role', label: 'Role', type: 'select', options: ['Admin', 'User'] },
  { id: 'isActive', label: 'Active', type: 'boolean' },
];
```

### Output Format
The `onChange` handler provides the current state of the filter tree:

```json
{
  "id": "root-group",
  "type": "group",
  "logic": "AND",
  "children": [
    {
      "id": "rule-1",
      "type": "rule",
      "fieldId": "role",
      "operator": "equals",
      "value": "Admin"
    },
    {
      "id": "nested-group-1",
      "type": "group",
      "logic": "OR",
      "children": [
        {
          "id": "rule-2",
          "type": "rule",
          "fieldId": "age",
          "operator": "gt",
          "value": 25
        }
      ]
    }
  ]
}
```

## 🔧 Installation & Usage

1. **Copy the Component**: Copy the `components/FilterBuilder` folder and `types.ts` into your project.
2. **Install Dependencies**:
   ```bash
   npm install lucide-react
   # Ensure Tailwind CSS is set up in your project
   ```
3. **Usage**:

```tsx
import { AdvancedFilterBuilder } from './components/FilterBuilder';

function MyPage() {
  const [filter, setFilter] = useState(INITIAL_FILTER);

  return (
    <AdvancedFilterBuilder 
      filter={filter} 
      columns={COLUMNS} 
      onChange={setFilter} 
    />
  );
}
```

## 🎨 Customization

The component uses Tailwind CSS classes for styling.
- **Colors**: You can change `bg-green-50`, `bg-orange-50` in `FilterRule.tsx` to match your brand.
- **Spacing**: Adjust padding and margins in `FilterGroup.tsx` to control compactness.
