import React, { useMemo } from 'react';
import { Trash2, GripVertical } from 'lucide-react';
import { Column, FilterRule as FilterRuleType, OPERATORS_BY_TYPE } from '../../types';

interface FilterRuleProps {
  rule: FilterRuleType;
  columns: Column[];
  onChange: (updatedRule: FilterRuleType) => void;
  onDelete: () => void;
}

export const FilterRule: React.FC<FilterRuleProps> = ({
  rule,
  columns,
  onChange,
  onDelete,
}) => {
  const selectedColumn = columns.find((c) => c.id === rule.fieldId) || columns[0];
  
  // Memoize operators based on selected column type
  const operators = useMemo(() => {
    return OPERATORS_BY_TYPE[selectedColumn.type] || [];
  }, [selectedColumn.type]);

  // Handle Field Change
  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFieldId = e.target.value;
    const newColumn = columns.find((c) => c.id === newFieldId);
    
    // Reset operator and value when field type changes, or just keep if compatible (simplified here to reset)
    onChange({
      ...rule,
      fieldId: newFieldId,
      operator: OPERATORS_BY_TYPE[newColumn?.type || 'string'][0].value,
      value: '', // Reset value
    });
  };

  const handleOperatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...rule, operator: e.target.value });
  };

  const handleValueChange = (val: any) => {
    onChange({ ...rule, value: val });
  };

  // Render different input based on column type
  const renderValueInput = () => {
    switch (selectedColumn.type) {
      case 'boolean':
        return (
          <select
            value={String(rule.value)}
            onChange={(e) => handleValueChange(e.target.value === 'true')}
            className="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border py-2 px-3"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        );
      case 'date':
        return (
          <input
            type="date"
            value={rule.value}
            onChange={(e) => handleValueChange(e.target.value)}
            className="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border py-2 px-3"
          />
        );
      case 'number':
        return (
          <input
            type="number"
            value={rule.value}
            onChange={(e) => handleValueChange(Number(e.target.value))}
            placeholder="Value"
            className="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border py-2 px-3"
          />
        );
      case 'select':
        return (
          <select
            value={rule.value}
            onChange={(e) => handleValueChange(e.target.value)}
            className="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border py-2 px-3"
          >
            <option value="">Select option...</option>
            {selectedColumn.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      default: // string
        return (
          <input
            type="text"
            value={rule.value}
            onChange={(e) => handleValueChange(e.target.value)}
            placeholder="Value"
            className="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border py-2 px-3"
          />
        );
    }
  };

  return (
    <div className="flex items-center gap-2 py-2 group/rule">
      {/* Drag Handle Visual */}
      <div className="text-gray-300 cursor-move hidden group-hover/rule:block">
        <GripVertical size={16} />
      </div>
      <div className="w-4 group-hover/rule:hidden" /> {/* Spacer */}

      <div className="flex-1 bg-white p-3 border border-gray-200 rounded-md shadow-sm flex flex-col sm:flex-row gap-3 items-center">
        {/* Field Selector */}
        <div className="w-full sm:w-1/3 min-w-[140px]">
           <select
            value={rule.fieldId}
            onChange={handleFieldChange}
            className="block w-full rounded-md border-gray-300 bg-green-50 text-green-800 font-medium shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border-0 py-2 px-3 ring-1 ring-inset ring-gray-200"
          >
            {columns.map((col) => (
              <option key={col.id} value={col.id}>
                {col.label}
              </option>
            ))}
          </select>
        </div>

        {/* Operator Selector */}
        <div className="w-full sm:w-1/4 min-w-[120px]">
          <select
            value={rule.operator}
            onChange={handleOperatorChange}
            className="block w-full rounded-md border-gray-300 bg-orange-50 text-orange-800 font-medium shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border-0 py-2 px-3 ring-1 ring-inset ring-gray-200"
          >
            {operators.map((op) => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>
        </div>

        {/* Value Input */}
        <div className="w-full sm:flex-1 min-w-[150px]">
          {renderValueInput()}
        </div>

        {/* Actions */}
        <button
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
          title="Delete Rule"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};