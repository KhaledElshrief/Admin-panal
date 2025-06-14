import React, { useState } from 'react';
import { Eye, FileCheck, FileX, Check, X, Bell, MessageSquare, Settings, BarChart2, Users, FileText, Edit, Trash2, AlertTriangle, Star, User } from 'lucide-react';
import Table, { TableColumn } from '../components/ui/Table';
import { ViewAction, EditAction, DeleteAction, ApproveAction, RejectAction, SuspendAction } from '../components/ui/TableActions';
import StatusBadge from '../components/ui/StatusBadge';
import UserAvatar from '../components/ui/UserAvatar';
import StarRating from '../components/ui/StarRating';

interface Driver {
  id: number;
  name: string;
  phone: string;
  vehicle: string;
  city: string;
  date: string;
  documents: 'complete' | 'incomplete';
  status: 'active' | 'suspended' | 'pending';
  trips: number;
  rating: number;
  classification: string;
  email: string;
  lastStatusUpdate: string;
  suspensionReason?: string;
}

const driversData: Driver[] = [
  {
    id: 1,
    name: 'أحمد محمد',
    phone: '4567 123 750 964+',
    vehicle: 'تويوتا كامري - 2022 - أبيض',
    city: 'الرياض',
    date: '2023-08-10',
    documents: 'complete',
    status: 'active',
    trips: 120,
    rating: 4.2,
    classification: 'مجموعة مكتملة',
    email: 'ahmad@example.com',
    lastStatusUpdate: '8/15/2023'
  },
  {
    id: 2,
    name: 'سارة الأحمد',
    phone: '4321 765 750 964+',
    vehicle: 'هيونداي سوناتا - 2023 - أسود',
    city: 'جدة',
    date: '2023-08-11',
    documents: 'incomplete',
    status: 'suspended',
    trips: 45,
    rating: 2.8,
    classification: 'مجموعة مكتملة',
    email: 'sara@example.com',
    lastStatusUpdate: '9/5/2023',
    suspensionReason: 'تأخر متكرر في مواعيد النقل'
  },
  {
    id: 3,
    name: 'محمد العلي',
    phone: '2222 111 750 964+',
    vehicle: 'نيسان التيما - 2021 - فضي',
    city: 'الدمام',
    date: '2023-07-20',
    documents: 'complete',
    status: 'pending',
    trips: 78,
    rating: 1.8,
    classification: 'مجموعة مكتملة',
    email: 'mohammed@example.com',
    lastStatusUpdate: '7/20/2023',
    suspensionReason: 'مخالفة شروط السلامة'
  },
  {
    id: 4,
    name: 'خالد السعيد',
    phone: '4444 333 750 964+',
    vehicle: 'كيا سيراتو - 2022 - أبيض',
    city: 'الرياض',
    date: '2023-08-01',
    documents: 'complete',
    status: 'active',
    trips: 95,
    rating: 4.6,
    classification: 'مجموعة مكتملة',
    email: 'khalid@example.com',
    lastStatusUpdate: '8/1/2023'
  }
];

const Drivers: React.FC = () => {
  const [activeTab, setActiveTab] = useState('إدارة السائقين');
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('اختر...');
  const [statusFilter, setStatusFilter] = useState('اختر...');

  const menuItems = [
    { icon: <FileText className="w-5 h-5" />, label: 'الموافقات', count: null },
    { icon: <Users className="w-5 h-5" />, label: 'إدارة السائقين', count: null },
    { icon: <BarChart2 className="w-5 h-5" />, label: 'التتبع', count: null },
    { icon: <Settings className="w-5 h-5" />, label: 'التحكم', count: null },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'التقييمات', count: 3 },
    { icon: <Bell className="w-5 h-5" />, label: 'الإشعارات', count: 5 },
    { icon: <BarChart2 className="w-5 h-5" />, label: 'التقارير', count: null },
  ];

  const stats = [
    { title: 'إجمالي', value: '5', icon: <Users className="w-6 h-6" />, color: 'bg-blue-600' },
    { title: 'نشط', value: '2', icon: <User className="w-6 h-6" />, color: 'bg-green-600' },
    { title: 'قيد الانتظار', value: '0', icon: <FileCheck className="w-6 h-6" />, color: 'bg-yellow-600' },
    { title: 'موقوف', value: '1', icon: <X className="w-6 h-6" />, color: 'bg-red-600' },
  ];

  // Table columns for approvals
  const approvalsColumns: TableColumn<Driver>[] = [
    {
      key: 'name',
      title: 'الاسم',
      render: (_, record) => <UserAvatar name={record.name} email={record.phone} />
    },
    {
      key: 'phone',
      title: 'رقم الهاتف'
    },
    {
      key: 'vehicle',
      title: 'معلومات المركبة'
    },
    {
      key: 'city',
      title: 'المدينة'
    },
    {
      key: 'date',
      title: 'تاريخ التقديم'
    },
    {
      key: 'documents',
      title: 'حالة المستندات',
      render: (value) => (
        <span className={`flex items-center gap-2 ${
          value === 'complete' ? 'text-success-400' : 'text-warning-400'
        }`}>
          {value === 'complete' ? (
            <>
              <FileCheck className="w-4 h-4" />
              المستندات مكتملة
            </>
          ) : (
            <>
              <FileX className="w-4 h-4" />
              المستندات غير مكتملة
            </>
          )}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'الإجراءات',
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <ViewAction onClick={() => console.log('View', record.id)} />
          <ApproveAction onClick={() => console.log('Approve', record.id)} />
          <RejectAction onClick={() => console.log('Reject', record.id)} />
        </div>
      )
    }
  ];

  // Table columns for driver management
  const driverManagementColumns: TableColumn<Driver>[] = [
    {
      key: 'name',
      title: 'الاسم',
      sortable: true,
      render: (_, record) => <UserAvatar name={record.name} email={record.phone} />
    },
    {
      key: 'vehicle',
      title: 'معلومات المركبة'
    },
    {
      key: 'city',
      title: 'المدينة',
      sortable: true
    },
    {
      key: 'classification',
      title: 'التصنيف',
      render: (value) => <span className="text-success-400 text-sm">{value}</span>
    },
    {
      key: 'status',
      title: 'الحالة',
      sortable: true,
      render: (value) => {
        const statusMap = {
          active: { text: 'نشط', variant: 'success' as const },
          suspended: { text: 'موقوف', variant: 'warning' as const },
          pending: { text: 'قيد الانتظار', variant: 'info' as const }
        };
        const status = statusMap[value as keyof typeof statusMap];
        return <StatusBadge status={status.text} variant={status.variant} />;
      }
    },
    {
      key: 'rating',
      title: 'التقييم',
      sortable: true,
      render: (value) => <StarRating rating={value} />
    },
    {
      key: 'trips',
      title: 'عدد الرحلات',
      sortable: true,
      render: (value) => <span className="font-medium">{value}</span>
    },
    {
      key: 'verification',
      title: 'التحقق',
      render: () => (
        <div className="flex items-center gap-1">
          <Check className="w-4 h-4 text-success-400" />
          <span className="text-success-400 text-sm">تم التحقق</span>
        </div>
      )
    },
    {
      key: 'actions',
      title: 'الإجراءات',
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <ViewAction onClick={() => console.log('View', record.id)} />
          <EditAction onClick={() => console.log('Edit', record.id)} />
          <SuspendAction onClick={() => console.log('Suspend', record.id)} />
          <DeleteAction onClick={() => console.log('Delete', record.id)} />
        </div>
      )
    }
  ];

  // Table columns for driver control
  const driverControlColumns: TableColumn<Driver>[] = [
    {
      key: 'name',
      title: 'الاسم',
      render: (_, record) => <UserAvatar name={record.name} email={record.email} />
    },
    {
      key: 'phone',
      title: 'رقم الهاتف'
    },
    {
      key: 'status',
      title: 'الحالة',
      render: (value) => {
        const statusMap = {
          active: { text: 'نشط', variant: 'success' as const },
          suspended: { text: 'موقوف', variant: 'warning' as const },
          pending: { text: 'محظور', variant: 'error' as const }
        };
        const status = statusMap[value as keyof typeof statusMap];
        return <StatusBadge status={status.text} variant={status.variant} />;
      }
    },
    {
      key: 'suspensionReason',
      title: 'سبب الإيقاف',
      render: (value) => (
        <span className="text-sm text-gray-400">{value || '-'}</span>
      )
    },
    {
      key: 'lastStatusUpdate',
      title: 'آخر تحديث للحالة',
      render: (value) => (
        <div className="text-sm">
          <div>آخر تحديث للحالة</div>
          <div className="text-gray-400">{value}</div>
        </div>
      )
    },
    {
      key: 'rating',
      title: 'التقييمات',
      render: (value) => <StarRating rating={value} />
    },
    {
      key: 'actions',
      title: 'الإجراءات',
      render: () => (
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
          عرض التفاصيل
        </button>
      )
    }
  ];

  const renderApprovals = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">موافقات السائقين الجدد</h2>
        <p className="text-gray-400">قائمة طلبات السائقين الجدد في انتظار المراجعة والموافقة</p>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="البحث"
          className="flex-1 bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>حالة المستندات</option>
          <option>الكل</option>
          <option>مكتملة</option>
          <option>غير مكتملة</option>
        </select>
        <select
          className="bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
        >
          <option>المدينة</option>
          <option>الكل</option>
          <option>الرياض</option>
          <option>جدة</option>
          <option>الدمام</option>
        </select>
        <button className="bg-dark-200 text-white px-4 py-2 rounded-lg hover:bg-dark-100">
          إعادة تعيين
        </button>
      </div>

      <Table
        columns={approvalsColumns}
        data={driversData}
        rowKey="id"
      />
    </div>
  );

  const renderDriverManagement = () => (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.color} rounded-xl p-6 text-white relative overflow-hidden`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-full">
                {stat.icon}
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.title}</div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full"></div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="البحث عن سائق..."
          className="flex-1 bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white min-w-[120px]"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>الحالة</option>
          <option>اختر...</option>
          <option>نشط</option>
          <option>موقوف</option>
          <option>قيد الانتظار</option>
        </select>
        <select
          className="bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white min-w-[120px]"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
        >
          <option>المدينة</option>
          <option>اختر...</option>
          <option>الرياض</option>
          <option>جدة</option>
          <option>الدمام</option>
        </select>
        <button className="bg-dark-200 text-white px-4 py-2 rounded-lg hover:bg-dark-100">
          إعادة تعيين
        </button>
        <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2">
          <span>+</span>
          إضافة جديد
        </button>
        <button className="bg-dark-200 text-white px-4 py-2 rounded-lg hover:bg-dark-100">
          إعادة تعيين الفلتر
        </button>
      </div>

      <Table
        columns={driverManagementColumns}
        data={driversData}
        rowKey="id"
      />
    </div>
  );

  const renderDriverControl = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">التحكم في السائقين</h2>
        <p className="text-gray-400">إدارة حالات السائقين وتعديل أو إيقاف حساباتهم</p>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="البحث عن سائق..."
          className="flex-1 bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white min-w-[120px]"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>الحالة</option>
          <option>الكل</option>
          <option>نشط</option>
          <option>موقوف</option>
          <option>محظور</option>
        </select>
        <button className="bg-dark-200 text-white px-4 py-2 rounded-lg hover:bg-dark-100">
          إعادة تعيين
        </button>
      </div>

      <Table
        columns={driverControlColumns}
        data={driversData}
        rowKey="id"
      />
    </div>
  );

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">إدارة السائقين</h1>
          <p className="text-gray-400 mt-1">إدارة وتتبع ومراقبة السائقين والرحلات المدرسية</p>
        </div>
      </div>

      <div className="bg-dark-300 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6 overflow-x-auto">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(item.label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === item.label 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-dark-200 text-gray-300 hover:bg-dark-100'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.count && (
                <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'الموافقات' && renderApprovals()}
        {activeTab === 'إدارة السائقين' && renderDriverManagement()}
        {activeTab === 'التحكم' && renderDriverControl()}
        {activeTab === 'التتبع' && (
          <div className="text-center py-12">
            <p className="text-gray-400">صفحة التتبع قيد التطوير</p>
          </div>
        )}
        {activeTab === 'التقييمات' && (
          <div className="text-center py-12">
            <p className="text-gray-400">صفحة التقييمات قيد التطوير</p>
          </div>
        )}
        {activeTab === 'الإشعارات' && (
          <div className="text-center py-12">
            <p className="text-gray-400">صفحة الإشعارات قيد التطوير</p>
          </div>
        )}
        {activeTab === 'التقارير' && (
          <div className="text-center py-12">
            <p className="text-gray-400">صفحة التقارير قيد التطوير</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Drivers;