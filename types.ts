export type ColumnType = 'string' | 'number' | 'boolean' | 'date' | 'select';

export interface Column {
  id: string;
  label: string;
  type: ColumnType;
  options?: string[]; // For 'select' type
}

export type LogicOperator = 'AND' | 'OR';

export interface FilterRule {
  id: string;
  type: 'rule';
  fieldId: string;
  operator: string;
  value: any;
}

export interface FilterGroup {
  id: string;
  type: 'group';
  logic: LogicOperator;
  children: (FilterRule | FilterGroup)[];
}

export type FilterNode = FilterRule | FilterGroup;

// Define specific operators available for each type
export const OPERATORS_BY_TYPE: Record<ColumnType, { value: string; label: string }[]> = {
  string: [
    { value: 'equals', label: 'Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'startsWith', label: 'Starts with' },
    { value: 'endsWith', label: 'Ends with' },
    { value: 'notContains', label: 'Does not contain' },
  ],
  number: [
    { value: 'equals', label: '=' },
    { value: 'notEquals', label: '!=' },
    { value: 'gt', label: '>' },
    { value: 'gte', label: '>=' },
    { value: 'lt', label: '<' },
    { value: 'lte', label: '<=' },
  ],
  boolean: [
    { value: 'equals', label: 'Is' },
  ],
  date: [
    { value: 'equals', label: 'On' },
    { value: 'before', label: 'Before' },
    { value: 'after', label: 'After' },
  ],
  select: [
    { value: 'equals', label: 'Is' },
    { value: 'notEquals', label: 'Is not' },
    { value: 'in', label: 'Is any of' },
  ],
};