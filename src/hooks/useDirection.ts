import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const rtlLanguages = ['ar', 'ku'];

export const useDirection = () => {
  const { i18n } = useTranslation();
  
  const isRTL = rtlLanguages.includes(i18n.language);
  const direction = isRTL ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', i18n.language);
  }, [i18n.language, direction]);

  return {
    isRTL,
    direction,
    language: i18n.language
  };
};