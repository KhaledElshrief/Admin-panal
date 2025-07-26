import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSchool, clearDeleteError } from '../../store/slices/schoolSlices';
import type { RootState, AppDispatch } from '../../store';
import { X, Trash2, AlertTriangle } from 'lucide-react';
import Modal from '../ui/Modal';
import { showToast } from '../../store/slices/toastSlice';

interface DeleteSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  school: {
    id: string;
    name: string;
    nameEn: string;
  } | null;
}

const DeleteSchoolModal: React.FC<DeleteSchoolModalProps> = ({ isOpen, onClose, school }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { deleteLoading, deleteError } = useSelector((state: RootState) => state.school);

  const handleDelete = async () => {
    if (school) {
      const resultAction = await dispatch(deleteSchool(school.id));
      if (deleteSchool.fulfilled.match(resultAction)) {
        dispatch(showToast({ message: "تم حذف المدرسة بنجاح", type: "success" }));
        onClose();
      } else {
        dispatch(showToast({ message: "حدث خطأ أثناء حذف المدرسة", type: "error" }));
      }
    }
  };

  const handleClose = () => {
    dispatch(clearDeleteError());
    onClose();
  };

  if (!isOpen || !school) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="حذف المدرسة" widthClass="max-w-md">
      {deleteError && (
        <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400">{deleteError}</p>
        </div>
      )}
      <div className="flex items-start gap-4 mb-6">
        <div className="p-2 bg-yellow-500/20 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">تأكيد الحذف</h3>
          <p className="text-gray-400">
            هل أنت متأكد من أنك تريد حذف المدرسة التالية؟ هذا الإجراء لا يمكن التراجع عنه.
          </p>
        </div>
      </div>
      <div className="bg-dark-400 rounded-lg p-4 mb-6">
        <div className="space-y-2">
          <div>
            <span className="text-sm text-gray-400">الاسم (عربي):</span>
            <p className="font-medium text-white">{school.name}</p>
          </div>
          <div>
            <span className="text-sm text-gray-400">الاسم (إنجليزي):</span>
            <p className="font-medium text-white">{school.nameEn}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleDelete}
          disabled={deleteLoading}
          className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          {deleteLoading ? 'جاري الحذف...' : 'حذف المدرسة'}
        </button>
        <button
          onClick={handleClose}
          disabled={deleteLoading}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 disabled:opacity-50 transition-colors"
        >
          <X className="w-4 h-4" />
          إلغاء
        </button>
      </div>
    </Modal>
  );
};

export default DeleteSchoolModal; 