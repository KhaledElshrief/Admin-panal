import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCity } from '../../store/slices/citySlice';
import type { RootState, AppDispatch } from '../../store';
import { X, Plus, Save } from 'lucide-react';

interface AddCityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCityModal: React.FC<AddCityModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { createLoading, createError } = useSelector((state: RootState) => state.city);

  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    countryId: '',
    lessPricePerKilometer: { min: 0, max: 0, average: 0 },
    lessStudentFee: { min: 0, max: 0, average: 0 },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('lessPricePerKilometer.') || name.startsWith('lessStudentFee.')) {
      const [key, sub] = name.split('.') as ['lessPricePerKilometer' | 'lessStudentFee', 'min' | 'max' | 'average'];
      setFormData((prev) => ({
        ...prev,
        [key]: { ...prev[key], [sub]: Number(value) }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(createCity(formData));
    if (!createError) {
      setFormData({
        name: '',
        nameEn: '',
        countryId: '',
        lessPricePerKilometer: { min: 0, max: 0, average: 0 },
        lessStudentFee: { min: 0, max: 0, average: 0 },
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-300 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-dark-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-500 rounded-lg">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">إضافة مدينة جديدة</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        {createError && (
          <div className="mx-6 mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-400">{createError}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">اسم المدينة (عربي) *</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                className="w-full p-3 bg-dark-400 border border-dark-200 rounded-lg text-white" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">اسم المدينة (إنجليزي) *</label>
              <input type="text" name="nameEn" value={formData.nameEn} onChange={handleInputChange}
                className="w-full p-3 bg-dark-400 border border-dark-200 rounded-lg text-white" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">معرف الدولة *</label>
              <input type="text" name="countryId" value={formData.countryId} onChange={handleInputChange}
                className="w-full p-3 bg-dark-400 border border-dark-200 rounded-lg text-white" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">سعر/كم (أقل/أعلى/متوسط)</label>
              <div className="flex gap-2">
                <input type="number" name="lessPricePerKilometer.min" value={formData.lessPricePerKilometer.min}
                  onChange={handleInputChange} className="w-1/3 p-2 bg-dark-400 border border-dark-200 rounded-lg text-white" placeholder="أقل" />
                <input type="number" name="lessPricePerKilometer.max" value={formData.lessPricePerKilometer.max}
                  onChange={handleInputChange} className="w-1/3 p-2 bg-dark-400 border border-dark-200 rounded-lg text-white" placeholder="أعلى" />
                <input type="number" name="lessPricePerKilometer.average" value={formData.lessPricePerKilometer.average}
                  onChange={handleInputChange} className="w-1/3 p-2 bg-dark-400 border border-dark-200 rounded-lg text-white" placeholder="متوسط" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">رسوم طالب (أقل/أعلى/متوسط)</label>
              <div className="flex gap-2">
                <input type="number" name="lessStudentFee.min" value={formData.lessStudentFee.min}
                  onChange={handleInputChange} className="w-1/3 p-2 bg-dark-400 border border-dark-200 rounded-lg text-white" placeholder="أقل" />
                <input type="number" name="lessStudentFee.max" value={formData.lessStudentFee.max}
                  onChange={handleInputChange} className="w-1/3 p-2 bg-dark-400 border border-dark-200 rounded-lg text-white" placeholder="أعلى" />
                <input type="number" name="lessStudentFee.average" value={formData.lessStudentFee.average}
                  onChange={handleInputChange} className="w-1/3 p-2 bg-dark-400 border border-dark-200 rounded-lg text-white" placeholder="متوسط" />
              </div>
            </div>
          </div>
          <div className="flex gap-4 pt-6 border-t border-dark-200">
            <button type="submit" disabled={createLoading}
              className="flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 disabled:opacity-50 transition-colors">
              <Save className="w-4 h-4" />
              {createLoading ? 'جاري الإضافة...' : 'إضافة المدينة'}
            </button>
            <button type="button" onClick={onClose}
              className="flex items-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors">
              <X className="w-4 h-4" />
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCityModal;
