import React, { useState, useEffect, useRef } from 'react';

interface ComboboxOption {
  id: string | number;
  [key: string]: any;
}

interface ComboboxProps<T extends ComboboxOption> {
  options: T[];
  value?: T[];
  onChange?: (selected: T[]) => void;
  displayKey?: string;
  searchKeys?: string[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  name?: string;
}
const Combobox = <T extends ComboboxOption>({

  options,
  value = [],
  onChange,
  displayKey = 'name',
  searchKeys = ['name', 'title', 'id'],
  placeholder = 'Select options...',
  className = '',
  disabled = false,
  name,
}: ComboboxProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<T[]>(value);
  const comboboxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync with external value changes
  useEffect(() => {
    if (!arraysEqual(value, selectedOptions)) {
      setSelectedOptions(value);
    }
  }, [value]);

  // Helper to compare arrays
  const arraysEqual = (a: T[], b: T[]) => {
    if (a.length !== b.length) return false;
    return a.every((item, index) => item.id === b[index]?.id);
  };

  // Filter options based on search term
  const filteredOptions = options.filter(option => {
    if (!searchTerm) return true;
    return searchKeys.some(key => 
      String(option[key]).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check if an option is selected
  const isSelected = (option: T) => {
    return selectedOptions.some(selected => selected.id === option.id);
  };

  // Handle option selection
  const handleOptionClick = (option: T) => {
    let newSelected;
    if (isSelected(option)) {
      newSelected = selectedOptions.filter(selected => selected.id !== option.id);
    } else {
      newSelected = [...selectedOptions, option];
    }
    
    setSelectedOptions(newSelected);
    if (onChange) {
      onChange(newSelected);
    }
  };

  // Remove selected option
  const removeSelected = (option: T) => {
    const newSelected = selectedOptions.filter(selected => selected.id !== option.id);
    setSelectedOptions(newSelected);
    if (onChange) {
      onChange(newSelected);
    }
  };

  return (
    <div ref={comboboxRef} className={`relative ${className}`}>
      {/* Selected tags display */}
      <div 
        className="flex flex-wrap items-center border rounded p-1 min-h-10 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* {selectedOptions.length > 0 ? (
          selectedOptions.map(option => (
            <div 
              key={option.id} 
              className="bg-gray-200 rounded px-2 py-1 mr-1 mb-1 flex items-center"
            >
              {option[displayKey]}
              <button 
                type="button" 
                onClick={(e) => {
                  e.stopPropagation();
                  removeSelected(option);
                }} 
                className="ml-1 text-gray-500 hover:text-gray-700"
                aria-label={`Remove ${option[displayKey]}`}
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <span className="text-gray-400 pl-2">{""}</span>
        )} */}
      </div>
      
      {/* Search input */}
      <input
        ref={inputRef}
        type="text"
        className="absolute top-0 left-0 w-full p-2"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        disabled={disabled}
        placeholder={placeholder}
      />
      
      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 border rounded shadow-lg bg-white max-h-60 overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="p-2 text-gray-500">No options found</div>
          ) : (
            filteredOptions.map(option => (
              <div
                key={option.id}
                className={`p-2 hover:bg-gray-100 cursor-pointer ${
                  isSelected(option) ? 'bg-blue-50' : ''
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option[displayKey]}
                {isSelected(option) && <span className="ml-2">✓</span>}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Combobox;