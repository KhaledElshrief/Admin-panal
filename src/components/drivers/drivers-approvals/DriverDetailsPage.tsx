import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDriverById } from '../../../store/slices/driversSlice';
import { RootState } from '../../../store';
import type { AppDispatch } from '../../../store';

// Add the type for the driver by id response
type DriverByIdResponse = {
  code: number;
  data: any;
  message: {
    arabic: string;
    english: string;
  };
};

const DriverDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  // Use a type assertion for the selector
  const { selectedDriver, selectedDriverLoading, selectedDriverError } = useSelector(
    (state: RootState) => state.drivers
  ) as {
    selectedDriver: DriverByIdResponse | null;
    selectedDriverLoading: boolean;
    selectedDriverError: string | null;
  };

  useEffect(() => {
    if (id) dispatch(fetchDriverById(id));
  }, [id, dispatch]);

  if (selectedDriverLoading) return <div>Loading...</div>;
  if (selectedDriverError) return <div>Error: {selectedDriverError}</div>;
  if (!selectedDriver) return <div>لا توجد بيانات لهذا السائق</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">تفاصيل السائق</h2>
      <div className="bg-dark-200 p-6 rounded-lg">
        <p className="text-lg text-green-500">{selectedDriver?.message?.arabic}</p>
        <p className="text-gray-400 mt-2">{selectedDriver?.message?.english}</p>
      </div>
    </div>
  );
};

export default DriverDetailsPage;
