import React from 'react';
import Table, { TableColumn } from '../../ui/Table';
import { Star, Search } from 'lucide-react';

interface DriversRatingsProps {
  ratingsData: any[]; 
  ratingsColumns: TableColumn<any>[];
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  ratingFilter: string;
  setRatingFilter: (v: string) => void;
  handleResetFilters: () => void;
}

const DriversRatings: React.FC<DriversRatingsProps> = ({
  ratingsData,
  ratingsColumns,
  searchTerm,
  setSearchTerm,
  ratingFilter,
  setRatingFilter,
  handleResetFilters,
}) => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-500" />
          التقييمات والشكاوى
        </h2>
        <p className="text-gray-400 mt-1">متابعة تقييمات المستخدمين للسائقين وتحليلها</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
          <Star className="w-4 h-4" />
          التقييمات: {ratingsData.length}
        </span>
        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
          الشكاوى: 2
        </span>
      </div>   
    </div>
    {/* Filters */}
    <div className="flex items-center gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="البحث في التقييمات..."
          className="w-full bg-dark-400 border border-dark-200 rounded-lg pr-10 pl-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-400 text-sm">التقييم</span>
        <select
          className="bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white min-w-[120px]"
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
        >
          <option value="الكل">الكل</option>
          <option value="5">5 نجوم</option>
          <option value="4">4 نجوم</option>
          <option value="3">3 نجوم</option>
          <option value="2">2 نجوم</option>
          <option value="1">1 نجمة</option>
        </select>
      </div>
      <button
        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
        onClick={handleResetFilters}
      >
        إعادة تعيين
      </button>
    </div>
    {/* Ratings Table */}
    <Table
      columns={ratingsColumns}
      data={ratingsData}
      rowKey="id"
      hoverable={true}
      emptyText="لا توجد تقييمات"
    />
    {/* Pagination */}
    <div className="flex items-center justify-between pt-4 border-t border-dark-200">
      <div className="text-sm text-gray-400">
        عرض 1 إلى {ratingsData.length} من {ratingsData.length} سجلات
      </div>
    </div>
  </div>
);

export default DriversRatings; 