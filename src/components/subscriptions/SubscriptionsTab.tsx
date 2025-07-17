import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Table, { TableColumn } from '../ui/Table';
import StatusBadge from '../ui/StatusBadge';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserSubscriptionsDashboard } from '../../store/slices/subscriptionSlice';
import { useEffect } from 'react';

const SubscriptionsTab: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    userSubscriptionsDashboard,
    userSubscriptionsDashboardLoading,
    userSubscriptionsDashboardError,
    userSubscriptionsDashboardTotalItems,
  } = useAppSelector(state => state.subscription);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');
  const [dateRange, setDateRange] = useState({ start: '5/2025', end: '6/2025' });

  useEffect(() => {
    dispatch(fetchUserSubscriptionsDashboard({ page: 1, pageSize: 20 }));
  }, [dispatch]);

  const subscriptionsData = userSubscriptionsDashboard.map(item => ({
    id: item.id,
    subscriber: item.user?.userName || '',
    plan: item.subscription?.type || '',
    status: item.paidStatus === 'PAID' ? 'نشط' : item.paidStatus === 'PENDING' ? 'معلق' : 'منتهي',
    startDate: item.startDate ? new Date(item.startDate).toLocaleDateString('ar-EG') : '',
    endDate: item.endDate ? new Date(item.endDate).toLocaleDateString('ar-EG') : '',
    price: item.amount ? `${item.amount} د.ج` : '',
    paymentMethod: item.method || '',
    autoRenewal: item.isActive,
  }));

  const columns: TableColumn[] = [
    {
      key: 'id',
      title: 'الرقم التعريفي',
      sortable: true,
      render: (value) => <span className="font-mono text-sm text-blue-400">{value}</span>
    },
    {
      key: 'subscriber',
      title: 'المشترك',
      sortable: true,
      render: (value) => <span className="font-medium text-white">{value}</span>
    },
    {
      key: 'plan',
      title: 'الخطة',
      sortable: true,
      render: (value) => <span className="text-gray-300">{value}</span>
    },
    {
      key: 'price',
      title: 'السعر',
      sortable: true,
      render: (value) => <span className="font-semibold text-green-400">{value}</span>
    },
    {
      key: 'startDate',
      title: 'تاريخ البدء',
      sortable: true,
      render: (value) => <span className="text-gray-400 text-sm">{value}</span>
    },
    {
      key: 'endDate',
      title: 'تاريخ الانتهاء',
      sortable: true,
      render: (value) => <span className="text-gray-400 text-sm">{value}</span>
    },
    {
      key: 'status',
      title: 'الحالة',
      sortable: true,
      render: (value) => {
        const variant = value === 'نشط' ? 'success' : value === 'منتهي' ? 'error' : 'warning';
        return <StatusBadge status={value} variant={variant as any} />;
      }
    },
    {
      key: 'autoRenewal',
      title: 'تجديد تلقائي',
      render: (value) => (
        <div className="flex items-center justify-center">
          <div className={`w-3 h-3 rounded-full ${value ? 'bg-green-500' : 'bg-gray-500'}`}></div>
        </div>
      )
    },
    {
      key: 'paymentMethod',
      title: 'طريقة الدفع',
      render: (value) => <span className="text-gray-300 text-sm">{value}</span>
    }
  ];

  const filteredData = subscriptionsData.filter(subscription => {
    const matchesSearch = subscription.subscriber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscription.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'الكل' || subscription.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (userSubscriptionsDashboardLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (userSubscriptionsDashboardError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {userSubscriptionsDashboardError}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">قائمة الاشتراكات</h2>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          إضافة
        </button>
      </div>
      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative max-w-md">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="بحث في الاشتراكات..."
            className="w-full bg-dark-400 border border-dark-200 rounded-lg pr-10 pl-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">النطاق الزمني</span>
          <input
            type="text"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            className="bg-dark-400 border border-dark-200 rounded-lg px-3 py-2 text-white text-sm w-20 focus:outline-none focus:ring-2 focus:ring-primary-600"
          />
          <input
            type="text"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            className="bg-dark-400 border border-dark-200 rounded-lg px-3 py-2 text-white text-sm w-20 focus:outline-none focus:ring-2 focus:ring-primary-600"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">الحالة</span>
          <select
            className="bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent min-w-[100px]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="الكل">الكل</option>
            <option value="نشط">نشط</option>
            <option value="منتهي">منتهي</option>
            <option value="معلق">معلق</option>
          </select>
        </div>
        <button className="bg-dark-200 hover:bg-dark-100 text-white px-4 py-2 rounded-lg transition-colors">
          إعادة تعيين النظام
        </button>
      </div>
      {/* Table */}
      <Table
        columns={columns}
        data={filteredData}
        rowKey="id"
        hoverable={true}
        emptyText="لا توجد اشتراكات"
      />
      {/* Results Summary */}
      <div className="flex items-center justify-between pt-4 border-t border-dark-200">
        <div className="text-sm text-gray-400">
          عرض {filteredData.length} من أصل {typeof userSubscriptionsDashboardTotalItems === 'number' ? userSubscriptionsDashboardTotalItems : subscriptionsData.length} اشتراك
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 bg-dark-200 hover:bg-dark-100 text-white rounded text-sm transition-colors">
            السابق
          </button>
          <span className="px-3 py-1 bg-primary-600 text-white rounded text-sm">1</span>
          <button className="px-3 py-1 bg-dark-200 hover:bg-dark-100 text-white rounded text-sm transition-colors">
            التالي
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsTab; 