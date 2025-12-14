import React from 'react';
import { Plus, Trash2, Layers } from 'lucide-react';
import { FilterGroup as FilterGroupType, FilterNode, FilterRule, Column, OPERATORS_BY_TYPE } from '../../types';
import { FilterRule as FilterRuleComponent } from './FilterRule';

interface FilterGroupProps {
  group: FilterGroupType;
  columns: Column[];
  onChange: (updatedGroup: FilterGroupType) => void;
  onDelete: () => void;
  isRoot?: boolean;
}

export const FilterGroup: React.FC<FilterGroupProps> = ({
  group,
  columns,
  onChange,
  onDelete,
  isRoot = false,
}) => {
  
  // Handlers for modifying the children array
  const handleLogicChange = (newLogic: 'AND' | 'OR') => {
    onChange({ ...group, logic: newLogic });
  };

  const handleAddRule = () => {
    const newRule: FilterRule = {
      id: crypto.randomUUID(),
      type: 'rule',
      fieldId: columns[0].id,
      operator: OPERATORS_BY_TYPE[columns[0].type][0].value,
      value: '',
    };
    onChange({ ...group, children: [...group.children, newRule] });
  };

  const handleAddGroup = () => {
    const newGroup: FilterGroupType = {
      id: crypto.randomUUID(),
      type: 'group',
      logic: 'AND',
      children: [
        {
          id: crypto.randomUUID(),
          type: 'rule',
          fieldId: columns[0].id,
          operator: OPERATORS_BY_TYPE[columns[0].type][0].value,
          value: '',
        }
      ],
    };
    onChange({ ...group, children: [...group.children, newGroup] });
  };

  const handleChildChange = (index: number, updatedChild: FilterNode) => {
    const newChildren = [...group.children];
    newChildren[index] = updatedChild;
    onChange({ ...group, children: newChildren });
  };

  const handleChildDelete = (index: number) => {
    const newChildren = group.children.filter((_, i) => i !== index);
    onChange({ ...group, children: newChildren });
  };

  return (
    <div className={`relative ${!isRoot ? 'ml-8 mt-4' : ''}`}>
      {/* Connecting lines for nested groups */}
      {!isRoot && (
        <>
          {/* Vertical line from parent */}
          <div className="absolute -left-8 top-6 w-8 h-px bg-gray-300 rounded-l-full" />
          {/* Curved corner connector could go here for extra polish */}
        </>
      )}

      <div className={`bg-gray-50/50 rounded-lg ${!isRoot ? 'border-l-2 border-gray-300 pl-4 py-2' : ''}`}>
        {/* Group Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex rounded-md bg-white shadow-sm ring-1 ring-inset ring-gray-300">
            <button
              onClick={() => handleLogicChange('AND')}
              className={`px-3 py-1.5 text-xs font-bold rounded-l-md transition-colors ${
                group.logic === 'AND'
                  ? 'bg-red-400 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              AND
            </button>
            <button
              onClick={() => handleLogicChange('OR')}
              className={`px-3 py-1.5 text-xs font-bold rounded-r-md transition-colors ${
                group.logic === 'OR'
                  ? 'bg-red-400 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              OR
            </button>
          </div>

          <div className="flex-1" />

          {/* Action Buttons */}
          <button
            onClick={handleAddRule}
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-1 rounded"
          >
            <Plus size={14} /> Rule
          </button>
          <button
            onClick={handleAddGroup}
            className="inline-flex items-center gap-1 text-xs font-medium text-purple-600 hover:text-purple-800 hover:bg-purple-50 px-2 py-1 rounded"
          >
            <Layers size={14} /> Group
          </button>
          {!isRoot && (
             <button
             onClick={onDelete}
             className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors ml-2"
           >
             <Trash2 size={16} />
           </button>
          )}
        </div>

        {/* Children Render */}
        <div className="flex flex-col gap-2">
          {group.children.length === 0 ? (
             <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg text-center text-sm text-gray-400 bg-gray-50">
               No filters applied. Add a rule or group.
             </div>
          ) : (
            group.children.map((child, index) => {
              if (child.type === 'rule') {
                return (
                  <FilterRuleComponent
                    key={child.id}
                    rule={child}
                    columns={columns}
                    onChange={(updatedRule) => handleChildChange(index, updatedRule)}
                    onDelete={() => handleChildDelete(index)}
                  />
                );
              } else {
                return (
                  <FilterGroup
                    key={child.id}
                    group={child}
                    columns={columns}
                    onChange={(updatedGroup) => handleChildChange(index, updatedGroup)}
                    onDelete={() => handleChildDelete(index)}
                  />
                );
              }
            })
          )}
        </div>
      </div>
    </div>
  );
};