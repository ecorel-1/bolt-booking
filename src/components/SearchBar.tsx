import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const { t } = useTranslation();

  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('search.placeholder')}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                 bg-white shadow-sm placeholder-gray-400
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}