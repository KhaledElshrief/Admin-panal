import React, { useState } from 'react';
import { Plus, Search, Eye, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Table, { TableColumn } from '../components/ui/Table';
import StatusBadge from '../components/ui/StatusBadge';

interface Ad {
  id: string;
  title: string;
  targetAudience: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'expired';
  views: number;
  clicks: number;
}

const adsData: Ad[] = [
  {
    id: '1',
    title: 'عرض خاص للمدارس الجديدة',
    targetAudience: 'المدارس',
    startDate: '2025-04-01',
    endDate: '2025-04-30',
    status: 'active',
    views: 1250,
    clicks: 89
  },
  {
    id: '2',
    title: 'تحديث نظام إدارة الرحلات',
    targetAudience: 'السائقين',
    startDate: '2025-03-15',
    endDate: '2025-05-15',
    status: 'active',
    views: 2100,
    clicks: 156
  },
  {
    id: '3',
    title: 'دورة تدريبية للمعلمين',
    targetAudience: 'المعلمين',
    startDate: '2025-04-10',
    endDate: '2025-04-20',
    status: 'inactive',
    views: 890,
    clicks: 45
  },
  {
    id: '4',
    title: 'صيانة مجدولة للنظام',
    targetAudience: 'الوكلاء',
    startDate: '2025-04-05',
    endDate: '2025-04-05',
    status: 'active',
    views: 3200,
    clicks: 234
  },
  {
    id: '5',
    title: 'عرض ترويجي منتهي',
    targetAudience: 'المدارس',
    startDate: '2025-01-01',
    endDate: '2025-03-01',
    status: 'expired',
    views: 5600,
    clicks: 412
  }
];

const Ads: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');

  const handleView = (id: string) => {
    console.log('View ad:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete ad:', id);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'warning';
      case 'expired':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'inactive':
        return 'معطل';
      case 'expired':
        return 'منتهي';
      default:
        return status;
    }
  };

  const columns: TableColumn<Ad>[] = [
    {
      key: 'title',
      title: t('table.title'),
      sortable: true,
      render: (value) => (
        <span className="font-medium text-white">{value}</span>
      )
    },
    {
      key: 'targetAudience',
      title: t('table.targetAudience'),
      sortable: true,
      render: (value) => (
        <span className="text-gray-300">{value}</span>
      )
    },
    {
      key: 'startDate',
      title: t('table.startDate'),
      sortable: true,
      render: (value) => (
        <span className="text-gray-400 text-sm">{value}</span>
      )
    },
    {
      key: 'endDate',
      title: t('table.endDate'),
      sortable: true,
      render: (value) => (
        <span className="text-gray-400 text-sm">{value}</span>
      )
    },
    {
      key: 'status',
      title: t('table.status'),
      sortable: true,
      render: (value) => (
        <StatusBadge 
          status={getStatusText(value)} 
          variant={getStatusVariant(value) as any}
        />
      )
    },
    {
      key: 'actions',
      title: t('table.actions'),
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleView(record.id)}
            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-600/20 rounded-lg transition-colors"
            title="عرض"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(record.id)}
            className="p-2 text-error-400 hover:text-error-300 hover:bg-error-600/20 rounded-lg transition-colors"
            title="حذف"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const filteredAds = adsData.filter(ad => {
    const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ad.targetAudience.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'الكل' || 
                         (statusFilter === 'نشط' && ad.status === 'active') ||
                         (statusFilter === 'معطل' && ad.status === 'inactive') ||
                         (statusFilter === 'منتهي' && ad.status === 'expired');

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t('pages.adsManagement')}</h1>
          <p className="text-gray-400 mt-1">{t('pages.adsSubtitle')}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
          إضافة إعلان جديد
        </motion.button>
      </div>

      <div className="bg-dark-300 rounded-xl p-6 space-y-6">
        {/* Ads Table Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">جدول الإعلانات</h2>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('filters.searchAds')}
              className="w-full bg-dark-400 border border-dark-200 rounded-lg pr-10 pl-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">{t('table.status')}</span>
            <select
              className="bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent min-w-[120px]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="الكل">{t('filters.all')}</option>
              <option value="نشط">{t('filters.active')}</option>
              <option value="معطل">{t('filters.inactive')}</option>
              <option value="منتهي">{t('filters.expired')}</option>
            </select>
          </div>

          <button className="bg-dark-200 hover:bg-dark-100 text-white px-4 py-2 rounded-lg transition-colors">
            {t('filters.reset')}
          </button>
        </div>

        {/* Statistics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-dark-200 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-400">
              {adsData.reduce((sum, ad) => sum + ad.views, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">إجمالي المشاهدات</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success-400">
              {adsData.reduce((sum, ad) => sum + ad.clicks, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">إجمالي النقرات</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning-400">
              {adsData.filter(ad => ad.status === 'active').length}
            </div>
            <div className="text-sm text-gray-400">نشط إعلاني</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-error-400">
              {adsData.filter(ad => ad.status === 'expired').length}
            </div>
            <div className="text-sm text-gray-400">منتهي إعلاني</div>
          </div>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          data={filteredAds}
          rowKey="id"
          hoverable={true}
          emptyText={t('pagination.noData')}
        />

        {/* Results Summary */}
        <div className="flex items-center justify-between pt-4 border-t border-dark-200">
          <div className="text-sm text-gray-400">
            {t('pagination.showing')} {filteredAds.length} {t('pagination.of')} {adsData.length} {t('pagination.results')}
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-dark-200 hover:bg-dark-100 text-white rounded text-sm transition-colors">
              {t('pagination.previous')}
            </button>
            <span className="px-3 py-1 bg-primary-600 text-white rounded text-sm">1</span>
            <button className="px-3 py-1 bg-dark-200 hover:bg-dark-100 text-white rounded text-sm transition-colors">
              {t('pagination.next')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ads;