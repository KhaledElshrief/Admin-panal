import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { removeAd, clearRemoveState } from '../../store/slices/adsSlice';
import { showToast } from '../../store/slices/toastSlice';

interface DeleteAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  adId: string | null;
}

const DeleteAdModal: React.FC<DeleteAdModalProps> = ({ isOpen, onClose, adId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { removeLoading, removeError } = useSelector((state: RootState) => state.ads);

  if (!isOpen || !adId) return null;

  const handleClose = () => {
    dispatch(clearRemoveState());
    onClose();
  };

  const handleDelete = async () => {
    if (!adId) return;

    try {
      await dispatch(removeAd(adId)).unwrap();

      // ✅ Success toast
      dispatch(
        showToast({
          message: t('ads.success.deleted'),
          type: 'success',
        })
      );

      handleClose();
    } catch (error) {
      // ❌ Error toast
      dispatch(
        showToast({
          message: t('ads.error.deleteFailed'),
          type: 'error',
        })
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-dark-300 rounded-xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            {t('common.delete')}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4">
          <p className="text-gray-300">
            {t('ads.modal.deleteConfirmMessage')}
          </p>

          {removeError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm">{removeError}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 pt-6">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2 text-gray-300 bg-dark-200 rounded-lg hover:bg-dark-100 transition-colors"
          >
            {t('common.cancel')}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={removeLoading}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {removeLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                {t('common.deleting')}
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                {t('common.delete')}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAdModal;
