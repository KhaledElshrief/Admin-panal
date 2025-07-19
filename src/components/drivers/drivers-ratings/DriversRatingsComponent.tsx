import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDriverRatings } from '../../../store/slices/driversSlice';
import { RootState } from '../../../store';
import DriversRatings from './DriversRatingsTap';
import { TableColumn } from '../../ui/Table';
import type { AppDispatch } from '../../../store';

interface DriversRatingsComponentProps {
  driverId: string;
}

const DriversRatingsComponent: React.FC<DriversRatingsComponentProps> = ({ driverId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { ratingsData, ratingsLoading, ratingsError } = useSelector((state: RootState) => state.drivers);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('الكل');

  useEffect(() => {
    if (driverId) {
      const params: any = { driverId, page: 1, pageSize: 10 };
      if (searchTerm) params.comment = searchTerm;
      if (ratingFilter !== 'الكل') params.rate = ratingFilter;
      dispatch(fetchDriverRatings(params));
    }
  }, [dispatch, driverId, searchTerm, ratingFilter]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setRatingFilter('الكل');
  };

  const ratingsColumns: TableColumn<any>[] = [
    {
      key: 'userName',
      title: 'اسم ولي الأمر',
      render: (_: any, record: any) => record.rate?.user?.userName || '-',
    },
    {
      key: 'driverName',
      title: 'اسم السائق',
      render: (_: any, record: any) => record.driver?.user?.userName || '-',
    },
    {
      key: 'rating',
      title: 'التقييم',
      render: (_: any, record: any) => (
        <span className="text-yellow-400">
          {'★'.repeat(record.rate?.rating || 0)}
          {'☆'.repeat(5 - (record.rate?.rating || 0))}
        </span>
      ),
    },
    {
      key: 'comment',
      title: 'التعليق',
      render: (_: any, record: any) => record.rate?.comment || '-',
    },
    {
      key: 'date',
      title: 'التاريخ',
      render: (_: any, record: any) =>
        record.rate?.createdAt ? new Date(record.rate.createdAt).toLocaleDateString('ar-EG') : '-',
    },
  ];

  if (ratingsLoading) return <div>Loading...</div>;
  if (ratingsError) return <div>Error: {ratingsError}</div>;

  console.log('driverId:', driverId);
  console.log('ratingsData:', ratingsData);

  return (
    <DriversRatings
      ratingsData={ratingsData}
      ratingsColumns={ratingsColumns}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      ratingFilter={ratingFilter}
      setRatingFilter={setRatingFilter}
      handleResetFilters={handleResetFilters}
    />
  );
};

export default DriversRatingsComponent;
