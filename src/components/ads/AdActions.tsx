import React from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, Send, Trash2 } from 'lucide-react';
import { useAds } from '../../hooks/useAds';
import { showToast } from '../../store/slices/toastSlice';
import { useAppDispatch } from '../../hooks/redux';

interface AdActionsProps {
  adId: string;
  onView?: (id: string) => void;
  onDelete?: (id: string) => void;   // ✅ use Delete Modal
  showViewButton?: boolean;
  showResendButton?: boolean;
  showRemoveButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const AdActions: React.FC<AdActionsProps> = ({
  adId,
  onView,
  onDelete,
  showViewButton = true,
  showResendButton = true,
  showRemoveButton = true,
  size = 'md'
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    resendAdById,
    resendLoading,
    resendError,
    resendSuccess,
    clearResendData,
  } = useAds();

  const getSizeClasses = () => {
    const sizes = { sm: 'p-1', md: 'p-2', lg: 'p-3' };
    return sizes[size];
  };

  const getIconSize = () => {
    const sizes = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-5 h-5' };
    return sizes[size];
  };

  const handleView = () => {
    if (onView) onView(adId);
  };

  const handleResend = async () => {
    try {
      await resendAdById(adId);
      if (resendSuccess) {
        dispatch(showToast({
          message: t('ads.success.resent', 'تم إعادة إرسال الإعلان بنجاح'),
          type: 'success'
        }));
        clearResendData();
      }
    } catch (error) {
      dispatch(showToast({
        message: resendError || t('ads.error.resendFailed', 'فشل في إعادة إرسال الإعلان'),
        type: 'error'
      }));
    }
  };

  const handleRemove = () => {
    if (onDelete) onDelete(adId); // ✅ delegate delete to modal
  };

  return (
    <div className="flex items-center gap-1">
      {showViewButton && (
        <button
          onClick={handleView}
          className={`${getSizeClasses()} text-blue-400 hover:text-blue-300 hover:bg-blue-600/20 rounded-lg transition-colors`}
          title={t('common.view')}
        >
          <Eye className={getIconSize()} />
        </button>
      )}

      {showResendButton && (
        <button
          onClick={handleResend}
          disabled={resendLoading}
          className={`${getSizeClasses()} text-green-400 hover:text-green-300 hover:bg-green-600/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
          title={t('ads.resend', 'إعادة إرسال')}
        >
          {resendLoading ? (
            <div className={`${getIconSize()} animate-spin rounded-full border-b-2 border-green-400`}></div>
          ) : (
            <Send className={getIconSize()} />
          )}
        </button>
      )}

      {showRemoveButton && (
        <button
          onClick={handleRemove}
          className={`${getSizeClasses()} text-red-400 hover:text-red-300 hover:bg-red-600/20 rounded-lg transition-colors`}
          title={t('common.delete')}
        >
          <Trash2 className={getIconSize()} />
        </button>
      )}
    </div>
  );
};

export default AdActions;
