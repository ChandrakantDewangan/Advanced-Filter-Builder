import React, { useState } from 'react';
import { AdvancedFilterBuilder } from './components/FilterBuilder';
import { Column, FilterGroup, OPERATORS_BY_TYPE } from './types';
import { Filter, X, Save, RefreshCw } from 'lucide-react';

// 1. Define your data schema
const AVAILABLE_COLUMNS: Column[] = [
  { id: 'id', label: 'ID', type: 'number' },
  { id: 'firstName', label: 'First Name', type: 'string' },
  { id: 'lastName', label: 'Last Name', type: 'string' },
  { id: 'email', label: 'Email', type: 'string' },
  { id: 'role', label: 'Role', type: 'select', options: ['Admin', 'Editor', 'Viewer', 'User'] },
  { id: 'isActive', label: 'Status', type: 'boolean' },
  { id: 'lastLogin', label: 'Last Login', type: 'date' },
  { id: 'revenue', label: 'Revenue', type: 'number' },
];

// 2. Initial State
const INITIAL_FILTER: FilterGroup = {
  id: 'root',
  type: 'group',
  logic: 'AND',
  children: [
    {
      id: 'rule-1',
      type: 'rule',
      fieldId: 'isActive',
      operator: 'equals',
      value: true,
    },
    {
      id: 'group-1',
      type: 'group',
      logic: 'OR',
      children: [
        {
          id: 'rule-2',
          type: 'rule',
          fieldId: 'firstName',
          operator: 'contains',
          value: 'John',
        },
        {
          id: 'rule-3',
          type: 'rule',
          fieldId: 'email',
          operator: 'endsWith',
          value: '@example.com',
        },
      ],
    },
  ],
};

const App: React.FC = () => {
  const [filterState, setFilterState] = useState<FilterGroup>(INITIAL_FILTER);
  const [isOpen, setIsOpen] = useState(true);
  const [jsonOutput, setJsonOutput] = useState<string>('');

  const handleApply = () => {
    // Process the filter for backend here
    const json = JSON.stringify(filterState, null, 2);
    setJsonOutput(json);
    console.log("Filter Payload:", filterState);
  };

  const handleReset = () => {
      setFilterState({
          id: crypto.randomUUID(),
          type: 'group',
          logic: 'AND',
          children: []
      });
      setJsonOutput('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Data Grid Pro</h1>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-md shadow-sm border border-gray-300 hover:bg-gray-50"
          >
            <Filter size={16} /> Open Filters
          </button>
        </div>

        {/* Modal-like Container */}
        {isOpen && (
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden relative animation-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-semibold text-gray-700">Advanced Filter</h2>
              <div className="flex items-center gap-3">
                 <div className="flex bg-gray-200 rounded-md p-1">
                     <button className="px-3 py-1 bg-white rounded-sm shadow-sm text-xs font-semibold text-blue-600">Filter Builder</button>
                     <button className="px-3 py-1 text-gray-500 text-xs font-medium hover:text-gray-700">Query String</button>
                 </div>
                 <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={20} />
                 </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-2 sm:p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <AdvancedFilterBuilder
                filter={filterState}
                columns={AVAILABLE_COLUMNS}
                onChange={setFilterState}
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
                <button 
                    onClick={handleReset}
                    className="text-gray-500 hover:text-red-500 text-sm flex items-center gap-1 font-medium"
                >
                    <RefreshCw size={14} /> Reset Filter
                </button>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 text-gray-600 text-sm font-medium hover:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleApply}
                        className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-slate-900/20"
                    >
                        <Save size={16} /> Apply Filter
                    </button>
                </div>
            </div>
          </div>
        )}

        {/* Debug Output */}
        {jsonOutput && (
          <div className="mt-8 bg-slate-900 rounded-xl p-6 shadow-xl text-slate-300">
            <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
                <h3 className="text-lg font-mono text-blue-400 font-bold">Backend Payload (JSON)</h3>
                <span className="text-xs uppercase tracking-wider text-slate-500">Read-only</span>
            </div>
            <pre className="overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed">
              {jsonOutput}
            </pre>
          </div>
        )}
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default App;