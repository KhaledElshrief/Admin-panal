import React, { useCallback } from 'react';
import PaginatedDropdown from '../components/ui/PaginatedDropdown';

// Fake data generator
const FAKE_DATA = Array.from({ length: 100 }).map((_, i) => ({
  id: i + 1,
  name: `School ${i + 1}`,
}));

const PAGE_SIZE = 10;

const Schools: React.FC = () => {
  // Simulate paginated fetch with search
  const fetchOptions = useCallback(async ({ page, search }: { page: number; search: string }) => {
    let filtered = FAKE_DATA;
    if (search) {
      filtered = filtered.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const data = filtered.slice(start, end);
    return {
      data,
      hasMore: end < filtered.length,
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">إدارة المدارس</h1>
      <div className="bg-dark-300 rounded-lg p-6 mb-6">
        <p className="text-gray-400">صفحة إدارة المدارس قيد التطوير</p>
      </div>
      <div className="max-w-xs">
        <PaginatedDropdown
          fetchOptions={fetchOptions}
          renderOption={(option) => <span>{option.name}</span>}
          getOptionLabel={option => option.name}
          getOptionValue={option => option.id}
          onSelect={option => alert(`Selected: ${option.name}`)}
          placeholder="اختر مدرسة..."
        />
      </div>
    </div>
  );
};

export default Schools;