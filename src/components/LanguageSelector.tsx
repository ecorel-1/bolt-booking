import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { languages } from '../i18n/languages';

export function LanguageSelector() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg 
                    hover:bg-white/20 transition-colors border border-white/20 text-white">
        <Globe className="h-4 w-4" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as any)}
          className="appearance-none bg-transparent border-none focus:outline-none cursor-pointer"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code} className="text-gray-900">
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}