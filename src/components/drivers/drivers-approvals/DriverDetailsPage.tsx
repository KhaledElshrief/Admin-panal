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

  // Extract driver info fields from selectedDriver.data
  const driver = selectedDriver.data;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">تفاصيل السائق</h2>
      <div className="bg-dark-200 p-6 rounded-lg mb-6">
        <p className="text-lg text-green-500">{selectedDriver?.message?.arabic}</p>
        <p className="text-gray-400 mt-2">{selectedDriver?.message?.english}</p>
      </div>
      {driver && (
        <div className="bg-dark-100 p-6 rounded-lg">
          {driver.name && (
            <h3 className="text-2xl font-bold mb-4 text-primary-500">{driver.name}</h3>
          )}
          <h3 className="text-xl font-semibold mb-4">بيانات السائق</h3>
          <table className="w-full text-left text-white">
            <tbody>
              {driver.user && driver.user.userName && (
                <tr><td className="py-1 pr-4">اسم المستخدم (من user):</td><td>{driver.user.userName}</td></tr>
              )}
              {driver.user && driver.user.phone && (
                <tr><td className="py-1 pr-4">الهاتف (من user):</td><td>{driver.user.phone}</td></tr>
              )}
              {driver.DriverVehicle && (
                <tr><td className="py-1 pr-4">مركبة السائق:</td><td>{
                  Array.isArray(driver.DriverVehicle) && driver.DriverVehicle.length > 0
                    ? [driver.DriverVehicle[0].carModel, driver.DriverVehicle[0].modelYear, driver.DriverVehicle[0].keyNumber].filter(Boolean).join(' - ')
                    : (typeof driver.DriverVehicle === 'object' && driver.DriverVehicle !== null
                        ? [driver.DriverVehicle.carModel, driver.DriverVehicle.modelYear, driver.DriverVehicle.keyNumber].filter(Boolean).join(' - ')
                        : (driver.DriverVehicle ? String(driver.DriverVehicle) : ''))
                }</td></tr>
              )}
              {driver.name && (
                <tr><td className="py-1 pr-4">الاسم:</td><td>{driver.name}</td></tr>
              )}
              {driver.phone && (
                <tr><td className="py-1 pr-4">الهاتف:</td><td>{driver.phone}</td></tr>
              )}
              {driver.email && (
                <tr><td className="py-1 pr-4">البريد الإلكتروني:</td><td>{driver.email}</td></tr>
              )}
              {driver.nationalId && (
                <tr><td className="py-1 pr-4">رقم الهوية:</td><td>{driver.nationalId}</td></tr>
              )}
              {driver.licenseNumber && (
                <tr><td className="py-1 pr-4">رقم الرخصة:</td><td>{driver.licenseNumber}</td></tr>
              )}
              {driver.vehicleType && (
                <tr><td className="py-1 pr-4">نوع المركبة:</td><td>{driver.vehicleType}</td></tr>
              )}
              {driver.createdAt && (
                <tr><td className="py-1 pr-4">تاريخ الإنشاء:</td><td>{driver.createdAt}</td></tr>
              )}
              {driver.updatedAt && (
                <tr><td className="py-1 pr-4">تاريخ التحديث:</td><td>{driver.updatedAt}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DriverDetailsPage;
