import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities } from '../store/slices/citySlice';
import type { RootState, AppDispatch } from '../store';
import type { City as CityType } from '../store/slices/citySlice';

const City: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cities, loading, error } = useSelector((state: RootState) => state.city);

  useEffect(() => {
    dispatch(fetchCities({ page: 1, pageSize: 10 }));
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">صفحة المدينة</h1>
      {loading && <p className="text-gray-400">جاري التحميل...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <ul className="space-y-2">
          {cities.map((city: CityType) => (
            <li key={city.id} className="bg-dark-200 p-4 rounded-lg flex flex-col md:flex-row md:items-center md:gap-4">
              <span className="font-bold text-lg">{city.name}</span>
              <span className="text-gray-400 text-sm">{city.nameEn}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default City; 