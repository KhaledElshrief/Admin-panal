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
  const [filteredRatings, setFilteredRatings] = useState<any[]>([]);

  useEffect(() => {
    if (driverId) {
      dispatch(fetchDriverRatings({ driverId, page: 1, pageSize: 10 }));
    }
  }, [dispatch, driverId]);

  // Apply filters using useEffect
  useEffect(() => {
    const filtered = ratingsData.filter((item: any) => {
      // Filter by search term
      const matchesSearch =
        !searchTerm ||
        item.rate?.user?.userName?.includes(searchTerm) ||
        item.driver?.user?.userName?.includes(searchTerm) ||
        item.rate?.comment?.includes(searchTerm);

      // Filter by rating
      const matchesRating =
        ratingFilter === 'الكل' ||
        (item.rate?.rating && item.rate.rating.toString() === ratingFilter);

      return matchesSearch && matchesRating;
    });

    setFilteredRatings(filtered);
  }, [ratingsData, searchTerm, ratingFilter]);

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
      ratingsData={filteredRatings}
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
