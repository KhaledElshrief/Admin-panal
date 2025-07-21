import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityById, updateCity, deleteCity } from '../store/slices/citySlice';
import type { RootState, AppDispatch } from '../store';
import { ArrowLeft } from 'lucide-react';

const CityDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { selectedCity, selectedCityLoading, selectedCityError, deleteLoading, deleteError } = useSelector((state: RootState) => state.city);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...selectedCity });

  useEffect(() => {
    if (id) dispatch(fetchCityById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedCity) setFormData({ ...selectedCity });
  }, [selectedCity]);

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
    if (id) {
      await dispatch(updateCity({ id, data: formData }));
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (id) {
      await dispatch(deleteCity(id));
      navigate('/city');
    }
  };

  if (selectedCityLoading) return <div className="p-6">جاري التحميل...</div>;
  if (selectedCityError) return <div className="p-6 text-red-500">{selectedCityError}</div>;
  if (!selectedCity) return <div className="p-6 text-gray-400">لا توجد بيانات لهذه المدينة</div>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/city')}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        العودة
      </button>
      <h1 className="text-2xl font-bold mb-4">{selectedCity.name}</h1>
      <div className="text-gray-400 mb-2">{selectedCity.nameEn}</div>
      <div className="mb-2">معرف الدولة: {selectedCity.countryId}</div>
      <div className="mb-2">أقل سعر/كم: {selectedCity.lessPricePerKilometer?.min} - {selectedCity.lessPricePerKilometer?.max} (متوسط: {selectedCity.lessPricePerKilometer?.average})</div>
      <div className="mb-2">أقل رسوم طالب: {selectedCity.lessStudentFee?.min} - {selectedCity.lessStudentFee?.max} (متوسط: {selectedCity.lessStudentFee?.average})</div>
      <div className="mb-2">تاريخ الإنشاء: {new Date(selectedCity.createdAt).toLocaleDateString('ar-SA')}</div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          {/* fields for name, nameEn, countryId, lessPricePerKilometer, lessStudentFee */}
          <button type="submit">حفظ التغييرات</button>
          <button type="button" onClick={() => setIsEditing(false)}>إلغاء</button>
        </form>
      ) : (
        // normal city details view
        <>
          <button onClick={() => setIsEditing(true)}>تعديل</button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">حذف</button>
        </>
      )}
    </div>
  );
};

export default CityDetails;
