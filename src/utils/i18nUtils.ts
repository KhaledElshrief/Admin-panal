import { TFunction } from 'react-i18next';

/**
 * Get localized status text
 */
export const getLocalizedStatus = (status: string, t: TFunction): string => {
  const statusMap: Record<string, string> = {
    'active': t('drivers.active'),
    'suspended': t('drivers.suspended'),
    'banned': t('drivers.banned'),
    'pending': t('common.pending', 'معلق'),
    'complete': t('drivers.complete'),
    'incomplete': t('drivers.incomplete'),
    'verified': t('drivers.verified'),
    'not_activated': t('drivers.notActivated'),
    'male': t('users.male'),
    'female': t('users.female'),
    'student': t('users.student'),
    'parent': t('users.parent'),
    'driver': t('users.driver')
  };
  
  return statusMap[status.toLowerCase()] || status;
};

/**
 * Get localized date format based on language
 */
export const getLocalizedDateFormat = (language: string): string => {
  switch (language) {
    case 'ar':
      return 'ar-EG';
    case 'ku':
      return 'ku-IQ';
    case 'en':
    default:
      return 'en-US';
  }
};

/**
 * Format date according to current language
 */
export const formatLocalizedDate = (date: string | Date, language: string): string => {
  if (!date) return '-';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const locale = getLocalizedDateFormat(language);
  
  return dateObj.toLocaleDateString(locale);
};

/**
 * Get RTL/LTR class names based on language
 */
export const getDirectionClasses = (isRTL: boolean) => {
  return {
    textAlign: isRTL ? 'text-right' : 'text-left',
    marginStart: isRTL ? 'mr-auto' : 'ml-auto',
    marginEnd: isRTL ? 'ml-auto' : 'mr-auto',
    paddingStart: isRTL ? 'pr-4' : 'pl-4',
    paddingEnd: isRTL ? 'pl-4' : 'pr-4',
    borderStart: isRTL ? 'border-r' : 'border-l',
    borderEnd: isRTL ? 'border-l' : 'border-r',
    roundedStart: isRTL ? 'rounded-r' : 'rounded-l',
    roundedEnd: isRTL ? 'rounded-l' : 'rounded-r'
  };
};