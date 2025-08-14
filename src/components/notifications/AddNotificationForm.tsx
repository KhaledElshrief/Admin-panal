import React from 'react';
import { useTranslation } from 'react-i18next';
import { Save, RotateCcw } from 'lucide-react';
import type { CreateNotificationRequest } from '../../store/slices/notificationsSlice';

interface NotificationFormData {
  titleAr: string;
  titleEn: string;
  titleKu: string;
  descriptionAr: string;
  descriptionEn: string;
  descriptionKu: string;
  type: 'APP_NOTIFICATION' | 'APP_ADS';
  image: string;
  startDate: string;
  endDate: string;
}

interface AddNotificationFormProps {
  formData: NotificationFormData;
  onFormChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onReset: () => void;
  loading: boolean;
  error: string | null;
}

const AddNotificationForm: React.FC<AddNotificationFormProps> = ({
  formData,
  onFormChange,
  onSubmit,
  onReset,
  loading,
  error
}) => {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-dark-200 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6">
          {t('notifications.addNew', 'إضافة إشعار جديد')}
        </h2>
        
        {/* Display errors */}
        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}
        
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Notification Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('notifications.type', 'نوع الإشعار')}
            </label>
            <select 
              value={formData.type}
              onChange={(e) => onFormChange('type', e.target.value)}
              className="w-full bg-dark-400 border border-dark-300 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            >
              <option value="APP_NOTIFICATION">
                {t('notifications.types.appNotification', 'إشعار التطبيق')}
              </option>
              <option value="APP_ADS">
                {t('notifications.types.appAds', 'إعلان التطبيق')}
              </option>
            </select>
          </div>

          {/* Title Fields */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              {t('notifications.title', 'العنوان')}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('notifications.titleArabic', 'العنوان (عربي)')} *
                </label>
                <input
                  type="text"
                  value={formData.titleAr}
                  onChange={(e) => onFormChange('titleAr', e.target.value)}
                  className="w-full bg-dark-400 border border-dark-300 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  placeholder={t('notifications.titleArabicPlaceholder', 'أدخل العنوان بالعربية')}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('notifications.titleEnglish', 'العنوان (إنجليزي)')} *
                </label>
                <input
                  type="text"
                  value={formData.titleEn}
                  onChange={(e) => onFormChange('titleEn', e.target.value)}
                  className="w-full bg-dark-400 border border-dark-300 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  placeholder={t('notifications.titleEnglishPlaceholder', 'Enter title in English')}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('notifications.titleKurdish', 'العنوان (كردي)')} *
                </label>
                <input
                  type="text"
                  value={formData.titleKu}
                  onChange={(e) => onFormChange('titleKu', e.target.value)}
                  className="w-full bg-dark-400 border border-dark-300 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  placeholder={t('notifications.titleKurdishPlaceholder', 'ناونیشان بە کوردی بنووسە')}
                  required
                />
              </div>
            </div>
          </div>

          {/* Description Fields */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              {t('notifications.description', 'الوصف')}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('notifications.descriptionArabic', 'الوصف (عربي)')} *
                </label>
                <textarea
                  rows={3}
                  value={formData.descriptionAr}
                  onChange={(e) => onFormChange('descriptionAr', e.target.value)}
                  className="w-full bg-dark-400 border border-dark-300 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent resize-none"
                  placeholder={t('notifications.descriptionArabicPlaceholder', 'أدخل الوصف بالعربية')}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('notifications.descriptionEnglish', 'الوصف (إنجليزي)')} *
                </label>
                <textarea
                  rows={3}
                  value={formData.descriptionEn}
                  onChange={(e) => onFormChange('descriptionEn', e.target.value)}
                  className="w-full bg-dark-400 border border-dark-300 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent resize-none"
                  placeholder={t('notifications.descriptionEnglishPlaceholder', 'Enter description in English')}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('notifications.descriptionKurdish', 'الوصف (كردي)')} *
                </label>
                <textarea
                  rows={3}
                  value={formData.descriptionKu}
                  onChange={(e) => onFormChange('descriptionKu', e.target.value)}
                  className="w-full bg-dark-400 border border-dark-300 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent resize-none"
                  placeholder={t('notifications.descriptionKurdishPlaceholder', 'وەسف بە کوردی بنووسە')}
                  required
                />
              </div>
            </div>
          </div>

          {/* Optional Image */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('notifications.imageUrl', 'رابط الصورة')} ({t('common.optional', 'اختياري')})
            </label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => onFormChange('image', e.target.value)}
              className="w-full bg-dark-400 border border-dark-300 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder={t('notifications.imageUrlPlaceholder', 'https://example.com/image.jpg')}
            />
          </div>

          {/* Date fields for APP_ADS */}
          {formData.type === 'APP_ADS' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('notifications.startDate', 'تاريخ البدء')}
                </label>
                <input
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={(e) => onFormChange('startDate', e.target.value)}
                  className="w-full bg-dark-400 border border-dark-300 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('notifications.endDate', 'تاريخ الانتهاء')}
                </label>
                <input
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) => onFormChange('endDate', e.target.value)}
                  className="w-full bg-dark-400 border border-dark-300 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-600/50 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {t('notifications.sending', 'جاري الإرسال...')}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {t('notifications.send', 'إرسال الإشعار')}
                </>
              )}
            </button>
            <button
              type="button"
              className="bg-dark-400 hover:bg-dark-300 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
              onClick={onReset}
            >
              <RotateCcw className="w-4 h-4" />
              {t('notifications.clearForm', 'مسح النموذج')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotificationForm;