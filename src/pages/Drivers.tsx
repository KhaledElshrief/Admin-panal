import React, { useState } from 'react';
import { Eye, FileCheck, FileX, Check, X, Bell, MessageSquare, Settings, BarChart2, Users, FileText, Edit, Trash2, AlertTriangle, Star, User, Download, Calendar, Search, Filter } from 'lucide-react';
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

interface DriverReport {
  id: string;
  name: string;
  complaints: number;
  commitmentRate: string;
  students: number;
  trips: number;
}

interface Notification {
  id: string;
  category: string;
  date: string;
  priority: 'urgent' | 'normal';
  message: string;
  status: 'confirmed' | 'pending' | 'rejected' | 'waiting';
}

interface Rating {
  id: string;
  driverName: string;
  parentName: string;
  comment: string;
  rating: number;
  date: string;
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
  },
  {
    id: 5,
    name: 'علي كاظم',
    phone: '5555 444 750 964+',
    vehicle: 'هوندا أكورد - 2023 - أزرق',
    city: 'الرياض',
    date: '2023-08-05',
    documents: 'complete',
    status: 'active',
    trips: 120,
    rating: 4.5,
    classification: 'مجموعة مكتملة',
    email: 'ali@example.com',
    lastStatusUpdate: '8/5/2023'
  }
];

const reportsData: DriverReport[] = [
  {
    id: '1',
    name: 'علي كاظم',
    complaints: 2,
    commitmentRate: '92%',
    students: 120,
    trips: 35
  },
  {
    id: '2',
    name: 'محمد احسان',
    complaints: 3,
    commitmentRate: '87%',
    students: 98,
    trips: 28
  },
  {
    id: '3',
    name: 'كريم عبدالله',
    complaints: 1,
    commitmentRate: '95%',
    students: 145,
    trips: 42
  },
  {
    id: '4',
    name: 'حسين أحمد',
    complaints: 0,
    commitmentRate: '89%',
    students: 110,
    trips: 31
  },
  {
    id: '5',
    name: 'فاطمة محمد',
    complaints: 2,
    commitmentRate: '91%',
    students: 75,
    trips: 22
  }
];

const notificationsData: Notification[] = [
  {
    id: '1',
    category: 'توثيق',
    date: '09:30 2025-03-24',
    priority: 'urgent',
    message: 'سائق جديد يحتاج إلى مراجعة المستندات',
    status: 'confirmed'
  },
  {
    id: '2',
    category: 'عطيبة',
    date: '08:15 2025-03-24',
    priority: 'normal',
    message: 'تم تحرير الأوراق المحجوزة للسائق أحمد محمد',
    status: 'pending'
  },
  {
    id: '3',
    category: 'توثيق',
    date: '17:45 2025-03-23',
    priority: 'urgent',
    message: 'تم إنهاء رحلة مدرسة الأمل بواسطة السائق',
    status: 'rejected'
  },
  {
    id: '4',
    category: 'توثيق',
    date: '10:20 2025-03-23',
    priority: 'urgent',
    message: 'انتهاء صلاحية رخصة القيادة للسائق خالد العلي',
    status: 'waiting'
  },
  {
    id: '5',
    category: 'عطيبة',
    date: '14:30 2025-03-22',
    priority: 'normal',
    message: 'تم تقديم طلب توثيق جديد من السائق محمد العزيزي',
    status: 'confirmed'
  },
  {
    id: '6',
    category: 'توثيق',
    date: '11:00 2025-03-22',
    priority: 'normal',
    message: 'مدفوعات معلقة بحاجة إلى مراجعة',
    status: 'pending'
  },
  {
    id: '7',
    category: 'عطيبة',
    date: '07:10 2025-03-21',
    priority: 'normal',
    message: 'تأخر السائق عن موعد بدء الرحلة المدرسية',
    status: 'rejected'
  },
  {
    id: '8',
    category: 'توثيق',
    date: '16:20 2025-03-20',
    priority: 'normal',
    message: 'تم تحديث وثائق السائق وحاجة إلى مراجعة',
    status: 'waiting'
  },
  {
    id: '9',
    category: 'توثيق',
    date: '13:40 2025-03-20',
    priority: 'normal',
    message: 'تم رفض طلب توثيق السائق بدر القاسمي',
    status: 'confirmed'
  }
];

const ratingsData: Rating[] = [
  {
    id: '1',
    driverName: 'أحمد محمد',
    parentName: 'محمد علي',
    comment: 'سائق ممتاز ومنتظم بالمواعيد',
    rating: 4.5,
    date: '2023-08-10'
  },
  {
    id: '2',
    driverName: 'خالد العتيبي',
    parentName: 'عبدالله محمد',
    comment: 'جيد ولكن يتأخر أحياناً',
    rating: 3.5,
    date: '2023-08-11'
  },
  {
    id: '3',
    driverName: 'سارة الشمري',
    parentName: 'فاطمة نور',
    comment: 'متأكدة عنا ويهتم بسلامة الطلاب',
    rating: 5.0,
    date: '2023-08-12'
  },
  {
    id: '4',
    driverName: 'أحمد محمد',
    parentName: 'سعد خالد',
    comment: 'سائق جيد ومتعاون',
    rating: 4.0,
    date: '2023-08-13'
  },
  {
    id: '5',
    driverName: 'فهد المطيري',
    parentName: 'محمد علي',
    comment: 'هناك مشاكل في الالتزام بالمواعيد',
    rating: 2.5,
    date: '2023-08-14'
  }
];

const Drivers: React.FC = () => {
  const [activeTab, setActiveTab] = useState('إدارة السائقين');
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('اختر...');
  const [statusFilter, setStatusFilter] = useState('اختر...');
  const [dateRange, setDateRange] = useState('3/30/2025 - 3/1/2025');

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

  // Reports columns
  const reportsColumns: TableColumn<DriverReport>[] = [
    {
      key: 'name',
      title: 'الاسم',
      render: (value) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <span className="font-medium text-white">{value}</span>
        </div>
      )
    },
    {
      key: 'complaints',
      title: 'الشكاوى',
      render: (value) => (
        <div className="flex items-center justify-center">
          <span className={`
            w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
            ${value === 0 ? 'bg-green-600 text-white' : 
              value <= 2 ? 'bg-yellow-600 text-white' : 'bg-red-600 text-white'}
          `}>
            {value}
          </span>
        </div>
      )
    },
    {
      key: 'commitmentRate',
      title: 'الالتزام بالمواعيد',
      render: (value) => (
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-dark-400 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                parseInt(value) >= 90 ? 'bg-green-500' : 
                parseInt(value) >= 80 ? 'bg-blue-500' : 'bg-yellow-500'
              }`}
              style={{ width: value }}
            ></div>
          </div>
          <span className="text-sm font-medium">{value}</span>
        </div>
      )
    },
    {
      key: 'students',
      title: 'عدد الطلاب',
      render: (value) => (
        <span className="font-medium">{value}</span>
      )
    },
    {
      key: 'trips',
      title: 'عدد الرحلات',
      render: (value) => (
        <span className="font-medium">{value}</span>
      )
    }
  ];

  // Notifications columns
  const notificationsColumns: TableColumn<Notification>[] = [
    {
      key: 'status',
      title: 'الإجراءات',
      render: (value) => (
        <div className="flex items-center gap-2">
          {value === 'confirmed' && (
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">تأكيد</span>
            </div>
          )}
          <ViewAction onClick={() => console.log('View notification')} />
        </div>
      )
    },
    {
      key: 'date',
      title: 'التاريخ',
      render: (value) => (
        <span className="text-gray-400 text-sm">{value}</span>
      )
    },
    {
      key: 'priority',
      title: 'الأولوية',
      render: (value) => (
        <StatusBadge 
          status={value === 'urgent' ? 'عاجل' : 'عادي'} 
          variant={value === 'urgent' ? 'error' : 'info'} 
        />
      )
    },
    {
      key: 'message',
      title: 'الرسالة',
      render: (value) => (
        <span className="text-white">{value}</span>
      )
    },
    {
      key: 'category',
      title: 'الفئة',
      render: (value) => (
        <StatusBadge 
          status={value} 
          variant={value === 'توثيق' ? 'info' : 'warning'} 
        />
      )
    }
  ];

  // Ratings columns
  const ratingsColumns: TableColumn<Rating>[] = [
    {
      key: 'actions',
      title: 'الإجراءات',
      render: () => (
        <ViewAction onClick={() => console.log('View rating')} />
      )
    },
    {
      key: 'date',
      title: 'التاريخ',
      render: (value) => (
        <span className="text-gray-400 text-sm">{value}</span>
      )
    },
    {
      key: 'parentName',
      title: 'اسم ولي الأمر',
      render: (value) => (
        <span className="text-white font-medium">{value}</span>
      )
    },
    {
      key: 'comment',
      title: 'التعليق',
      render: (value) => (
        <span className="text-gray-300">{value}</span>
      )
    },
    {
      key: 'rating',
      title: 'التقييم',
      render: (value) => (
        <StarRating rating={value} showValue={true} />
      )
    },
    {
      key: 'driverName',
      title: 'الاسم',
      render: (value) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <span className="font-medium text-white">{value}</span>
        </div>
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

  const renderReports = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-primary-500" />
            التقارير والتحليلات
          </h2>
          <p className="text-gray-400 mt-1">عرض ومتابعة وحصائيات ومؤشرات الأداء المختلفة للسائقين</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-sm">نوع التقرير</span>
          <select className="bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white">
            <option>تقرير الأداء</option>
          </select>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex items-center gap-3 mb-6">
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Download className="w-4 h-4" />
          تصدير PDF
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Download className="w-4 h-4" />
          تصدير Excel
        </button>
      </div>

      {/* Search and Date Filter */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="البحث عن السائق..."
            className="w-full bg-dark-400 border border-dark-200 rounded-lg pr-10 pl-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">الفترة الزمنية</span>
          <input
            type="text"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white text-sm w-48"
          />
          <Calendar className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">120,000</div>
              <div className="text-sm opacity-90">إجمالي المدفوعات</div>
            </div>
            <div className="p-3 bg-white/20 rounded-full">
              <BarChart2 className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">8</div>
              <div className="text-sm opacity-90">إجمالي الشكاوى</div>
            </div>
            <div className="p-3 bg-white/20 rounded-full">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">42</div>
              <div className="text-sm opacity-90">السائقين النشطين</div>
            </div>
            <div className="p-3 bg-white/20 rounded-full">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">150</div>
              <div className="text-sm opacity-90">إجمالي الرحلات</div>
            </div>
            <div className="p-3 bg-white/20 rounded-full">
              <BarChart2 className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-dark-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">جدول أداء السائقين</h3>
        <Table
          columns={reportsColumns}
          data={reportsData}
          rowKey="id"
          hoverable={true}
          emptyText="لا توجد تقارير"
        />
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">الإشعارات والتنبيهات</h2>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="البحث عن إشعار..."
            className="w-full bg-dark-400 border border-dark-200 rounded-lg pr-10 pl-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">الفئة</span>
          <select className="bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white min-w-[120px]">
            <option>الكل</option>
            <option>توثيق</option>
            <option>عطيبة</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">الأولوية</span>
          <select className="bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white min-w-[120px]">
            <option>الكل</option>
            <option>عاجل</option>
            <option>عادي</option>
          </select>
        </div>

        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors">
          إعادة تعيين
        </button>
      </div>

      {/* Notifications Table */}
      <Table
        columns={notificationsColumns}
        data={notificationsData}
        rowKey="id"
        hoverable={true}
        emptyText="لا توجد إشعارات"
      />
    </div>
  );

  const renderRatings = () => (
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
            التقييمات: 2
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
          <select className="bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white min-w-[120px]">
            <option>الكل</option>
            <option>5 نجوم</option>
            <option>4 نجوم</option>
            <option>3 نجوم</option>
            <option>2 نجوم</option>
            <option>1 نجمة</option>
          </select>
        </div>

        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors">
          إعادة تعيين
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-4 mb-6">
        <button className="bg-primary-600 text-white px-6 py-2 rounded-lg">
          السائق
        </button>
        <button className="bg-dark-200 hover:bg-dark-100 text-gray-300 px-6 py-2 rounded-lg transition-colors">
          الولي
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
          عرض 1 إلى 5 من 5 سجلات
        </div>
      </div>
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
        {activeTab === 'التقييمات' && renderRatings()}
        {activeTab === 'الإشعارات' && renderNotifications()}
        {activeTab === 'التقارير' && renderReports()}
      </div>
    </div>
  );
};

export default Drivers;