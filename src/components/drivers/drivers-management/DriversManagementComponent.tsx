import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrivers } from '../../../store/slices/driversSlice';
import { RootState } from '../../../store';
import type { AppDispatch } from '../../../store';
import { TableColumn } from '../../ui/Table';
import { useNavigate } from 'react-router-dom';
import DriversManagement from './DriversManagementTap';
import { Check, AlertTriangle } from 'lucide-react';

interface City {
  name: string;
  nameEn: string;
}

interface User {
  userName: string;
  image: string;
  city: City;
  country: { name: string; nameEn: string };
  region: string;
  gender: string;
  isVerified: boolean;
  dateOfBirth: string | null;
  phone: string;
}

interface DriverVehicle {
  id: string;
  driverId: string;
  modelYear: number;
  carModel: string;
  vehicleId: string;
  color: string;
  keyNumber: string;
  createdAt: string;
  updatedAt: string;
}

interface Driver {
  id: string;
  homePicture: string[];
  drivingLicense: string[];
  personalCard: string[];
  isVerified: boolean;
  isPause: boolean;
  avgRate: number | null;
  vehicleId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  DriverVehicle: DriverVehicle[];
  user: User;
}

const DriversManagementComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: drivers, loading, error } = useSelector(
    (state: RootState) => state.drivers
  ) as { data: Driver[]; loading: boolean; error: string | null };
  const navigate = useNavigate();

  // Filters (local state)
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('اختر...');
  const [cityFilter, setCityFilter] = React.useState('اختر...');
  const [filteredDrivers, setFilteredDrivers] = React.useState<Driver[]>([]);

  useEffect(() => {
    dispatch(fetchDrivers({}));
  }, [dispatch]);

  useEffect(() => {
    if (!drivers) {
      setFilteredDrivers([]);
      return;
    }
    setFilteredDrivers(
      drivers
        .filter((driver) =>
          searchTerm === '' ||
          driver.user?.userName?.includes(searchTerm) ||
          driver.user?.phone?.includes(searchTerm)
        )
        .filter((driver) =>
          statusFilter === 'اختر...' ||
          (statusFilter === 'نشط' && !driver.isPause) ||
          (statusFilter === 'موقوف' && driver.isPause)
        )
        .filter((driver) =>
          cityFilter === 'اختر...' || driver.user?.city?.name === cityFilter
        )
    );
  }, [drivers, searchTerm, statusFilter, cityFilter]);

  const handleViewDriver = (id: string) => {
    navigate(`/drivers/${id}`);
  };

  // Define columns for the table
  const driverManagementColumns: TableColumn<Driver>[] = [
    {
      key: 'userName',
      title: 'الاسم',
      render: (_: any, record: Driver) => record.user?.userName || '-',
    },
    {
      key: 'phone',
      title: 'رقم الهاتف',
      render: (_: any, record: Driver) => record.user?.phone || '-',
    },
    {
      key: 'DriverVehicle',
      title: 'معلومات المركبة',
      render: (_: any, record: Driver) =>
        record.DriverVehicle && record.DriverVehicle.length > 0
          ? `${record.DriverVehicle[0].carModel} - ${record.DriverVehicle[0].modelYear} - ${record.DriverVehicle[0].keyNumber}`
          : '-',
    },
    {
      key: 'city',
      title: 'المدينة',
      render: (_: any, record: Driver) => record.user?.city?.name || '-',
    },
    {
      key: 'classification',
      title: 'التصنيف',
      render: () => <span className="text-green-400">مجموعة مكتملة</span>,
    },
    {
      key: 'isPause',
      title: 'الحالة',
      render: ( _: any, record: Driver) =>
        record.isPause ? (
          <div className="flex items-center gap-1 text-yellow-400">
            <AlertTriangle className="w-4 h-4" />
            موقوف
          </div>
        ) : (
          <div className="flex items-center gap-1 text-green-400">
            <Check className="w-4 h-4" />
            نشط
          </div>
        ),
    },
    {
      key: 'rating',
      title: 'التقييم',
      render: () => (
        <span className="text-yellow-400 font-bold">★★★★☆ (4.2)</span>
      ),
    },
    {
      key: 'trips',
      title: 'عدد الرحلات',
      render: () => <span className="font-medium">120</span>,
    },
    {
      key: "isVerified",
      title: 'التحقق',
      render: (_: any, record: Driver) =>
        record.isVerified ? (
          <div className="flex items-center gap-1 text-green-400">
            <Check className="w-4 h-4" />
            تم التحقق
          </div>
        ) : (
          <div className="flex items-center gap-1 text-yellow-400">
            <AlertTriangle className="w-4 h-4" />
            غير مفعل
          </div>
        ),
    },
    {
      key: 'actions',
      title: 'الإجراءات',
      render: (_: any, record: Driver) => (
        <div className="flex items-center gap-2">
          <button title="رفض" className="text-red-500 hover:text-red-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <button title="قبول" className="text-green-500 hover:text-green-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </button>
          <button
            title="عرض"
            className="text-gray-400 hover:text-gray-600"
            onClick={() => handleViewDriver(record.id)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0a3 3 0 016 0zm6 0c0 5-9 9-9 9s-9-4-9-9a9 9 0 0118 0z" /></svg>
          </button>
        </div>
      )
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <DriversManagement
      driversData={filteredDrivers}
      driverManagementColumns={driverManagementColumns}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      cityFilter={cityFilter}
      setCityFilter={setCityFilter}
    />
  );
};

export default DriversManagementComponent;
