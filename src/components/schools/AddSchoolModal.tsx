import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSchool, clearCreateError } from '../../store/slices/schoolSlices';
import type { RootState, AppDispatch } from '../../store';
import { X, Plus, Save } from 'lucide-react';

interface AddSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddSchoolModal: React.FC<AddSchoolModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { createLoading, createError } = useSelector((state: RootState) => state.school);

  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    address: '',
    latitude: 0,
    longitude: 0,
    cityId: '',
    countryId: '',
    placeId: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'latitude' || name === 'longitude' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createSchool(formData));
    // Reset form and close modal on success
    if (!createError) {
      setFormData({
        name: '',
        nameEn: '',
        address: '',
        latitude: 0,
        longitude: 0,
        cityId: '',
        countryId: '',
        placeId: '',
      });
      onClose();
    }
  };

  const handleClose = () => {
    dispatch(clearCreateError());
    setFormData({
      name: '',
      nameEn: '',
      address: '',
      latitude: 0,
      longitude: 0,
      cityId: '',
      countryId: '',
      placeId: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-300 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-dark-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-500 rounded-lg">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">إضافة مدرسة جديدة</h2>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {createError && (
          <div className="mx-6 mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-400">{createError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                اسم المدرسة (عربي) *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 bg-dark-400 border border-dark-200 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="أدخل اسم المدرسة بالعربية"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                اسم المدرسة (إنجليزي) *
              </label>
              <input
                type="text"
                name="nameEn"
                value={formData.nameEn}
                onChange={handleInputChange}
                className="w-full p-3 bg-dark-400 border border-dark-200 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="أدخل اسم المدرسة بالإنجليزية"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                العنوان *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-3 bg-dark-400 border border-dark-200 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="أدخل عنوان المدرسة"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                خط العرض
              </label>
              <input
                type="number"
                step="any"
                name="latitude"
                value={formData.latitude}
                onChange={handleInputChange}
                className="w-full p-3 bg-dark-400 border border-dark-200 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="أدخل خط العرض"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                خط الطول
              </label>
              <input
                type="number"
                step="any"
                name="longitude"
                value={formData.longitude}
                onChange={handleInputChange}
                className="w-full p-3 bg-dark-400 border border-dark-200 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="أدخل خط الطول"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                معرف المدينة *
              </label>
              <input
                type="text"
                name="cityId"
                value={formData.cityId}
                onChange={handleInputChange}
                className="w-full p-3 bg-dark-400 border border-dark-200 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="أدخل معرف المدينة"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                معرف الدولة *
              </label>
              <input
                type="text"
                name="countryId"
                value={formData.countryId}
                onChange={handleInputChange}
                className="w-full p-3 bg-dark-400 border border-dark-200 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="أدخل معرف الدولة"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                معرف المكان
              </label>
              <input
                type="text"
                name="placeId"
                value={formData.placeId}
                onChange={handleInputChange}
                className="w-full p-3 bg-dark-400 border border-dark-200 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="أدخل معرف المكان (اختياري)"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-dark-200">
            <button
              type="submit"
              disabled={createLoading}
              className="flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 disabled:opacity-50 transition-colors"
            >
              <Save className="w-4 h-4" />
              {createLoading ? 'جاري الإضافة...' : 'إضافة المدرسة'}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="flex items-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchoolModal; 