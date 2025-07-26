// Arabic month names
const arabicMonths = [
  'يناير',
  'فبراير', 
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر'
];

/**
 * Convert month number (1-12) to Arabic month name
 */
export const getArabicMonthName = (monthNumber: number): string => {
  if (monthNumber >= 1 && monthNumber <= 12) {
    return arabicMonths[monthNumber - 1];
  }
  return 'غير معروف';
};

/**
 * Convert monthly users data to chart format
 */
export const formatMonthlyUsersForChart = (monthlyUsers: Array<{ month: number; count: number }>) => {
  return monthlyUsers.map(item => ({
    name: getArabicMonthName(item.month),
    value: item.count
  }));
};

/**
 * Convert monthly subscriptions data to chart format
 */
export const formatMonthlySubscriptionsForChart = (monthlySubscriptions: Array<{ month: number; paid: number; pending: number }>) => {
  return monthlySubscriptions.map(item => ({
    name: getArabicMonthName(item.month),
    paid: item.paid,
    pending: item.pending
  }));
}; 

// Decode a JWT token and return its payload
export function decodeJWT(token: string): any {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (e) {
    return null;
  }
}

// Check if a JWT token is expired
export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    if (!exp) return true;
    return Date.now() >= exp * 1000;
  } catch {
    // If token is malformed, treat as expired
    return true;
  }
} 