import React from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNotifications } from '../../hooks/useNotifications';
import { useAppDispatch } from '../../hooks/redux';
import { showToast } from '../../store/slices/toastSlice';
import { fetchNotifications } from '../../store/slices/notificationsSlice';

interface DeleteNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notificationId: string | null;
  currentPage: number;
  pageSize: number;
}

const DeleteNotificationModal: React.FC<DeleteNotificationModalProps> = ({
  isOpen,
  onClose,
  notificationId,
  currentPage,
  pageSize
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { removeNotificationById, removeLoading } = useNotifications();

  if (!isOpen || !notificationId) return null;

  const handleDelete = async () => {
    try {
      await removeNotificationById(notificationId);
      dispatch(showToast({
        message: t('notifications.success.deleted'),
        type: 'success'
      }));

      // refresh list after delete
      dispatch(fetchNotifications({
        page: currentPage,
        pageSize,
        type: 'APP_NOTIFICATION'
      }));

      onClose();
    } catch (error) {
      dispatch(showToast({
        message: t('notifications.error.deleteFailed'),
        type: 'error'
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-dark-300 rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            {t('notifications.modal.deleteTitle', 'Delete Notification')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-300 mb-6">
          {t('notifications.modal.deleteConfirm', 'Are you sure you want to delete this notification?')}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-dark-200 text-gray-300 rounded-lg hover:bg-dark-100 transition-colors"
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={handleDelete}
            disabled={removeLoading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {removeLoading ? t('common.deleting') : t('common.delete')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteNotificationModal;
