import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from '../i18n/translations';

export function useTranslation() {
  const { language, setLanguage } = useContext(LanguageContext);

  const t = (key: keyof typeof translations['en']) => {
    return translations[language][key] || translations['en'][key];
  };

  return { t, language, setLanguage };
}