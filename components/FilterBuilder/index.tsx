import React from 'react';
import { FilterGroup } from './FilterGroup';
import { FilterGroup as FilterGroupType, Column } from '../../types';

interface AdvancedFilterBuilderProps {
  filter: FilterGroupType;
  columns: Column[];
  onChange: (filter: FilterGroupType) => void;
}

export const AdvancedFilterBuilder: React.FC<AdvancedFilterBuilderProps> = ({
  filter,
  columns,
  onChange,
}) => {
  return (
    <div className="p-4">
        <FilterGroup 
            group={filter}
            columns={columns}
            onChange={onChange}
            onDelete={() => {}} // Root cannot be deleted
            isRoot={true}
        />
    </div>
  );
};