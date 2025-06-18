import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar,
  Settings,
  BarChart3,
  PieChart,
  LineChart,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Save
} from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import Table, { TableColumn } from '../components/ui/Table';
import StatusBadge from '../components/ui/StatusBadge';

// Sample data for charts
const userGrowthData = [
  { month: 'يناير', users: 2000 },
  { month: 'فبراير', users: 1800 },
  { month: 'مارس', users: 1600 },
  { month: 'أبريل', users: 1400 },
  { month: 'مايو', users: 1200 },
  { month: 'يونيو', users: 1100 }
];

const subscriptionPlanData = [
  { name: 'فردي', value: 30, color: '#6366f1' },
  { name: 'مدرسية', value: 45, color: '#22c55e' },
  { name: 'مؤسسة', value: 15, color: '#f59e0b' },
  { name: 'مخصص', value: 10, color: '#ef4444' }
];

const revenueData = [
  { month: 'يناير', subscriptions: 4500, renewals: 2000 },
  { month: 'فبراير', users: 4200, renewals: 1800 },
  { month: 'مارس', subscriptions: 3900, renewals: 1600 },
  { month: 'أبريل', subscriptions: 4100, renewals: 1400 },
  { month: 'مايو', subscriptions: 3800, renewals: 1200 },
  { month: 'يونيو', subscriptions: 4000, renewals: 1300 }
];

// Sample subscription data
const subscriptionsData = [
  {
    id: 'SUB-2023-001',
    subscriber: 'John Doe',
    plan: 'فردي',
    status: 'نشط',
    startDate: '1 يناير 2023',
    endDate: '31 ديسمبر 2023',
    price: '199.99 د.ج',
    paymentMethod: 'بطاقة ائتمان',
    autoRenewal: true
  },
  {
    id: 'SUB-2023-002',
    subscriber: 'Jane Smith',
    plan: 'مدرسة',
    status: 'نشط',
    startDate: '1 فبراير 2023',
    endDate: '31 ديسمبر 2023',
    price: '299.99 د.ج',
    paymentMethod: 'تحويل بنكي',
    autoRenewal: true
  },
  {
    id: 'SUB-2023-003',
    subscriber: 'Robert Johnson',
    plan: 'مؤسسة',
    status: 'نشط',
    startDate: '1 مارس 2023',
    endDate: '31 ديسمبر 2023',
    price: '499.99 د.ج',
    paymentMethod: 'بطاقة ائتمان',
    autoRenewal: true
  },
  {
    id: 'SUB-2023-004',
    subscriber: 'Emily Davis',
    plan: 'فردي',
    status: 'منتهي',
    startDate: '1 أبريل 2023',
    endDate: '30 يونيو 2023',
    price: '199.99 د.ج',
    paymentMethod: 'تحويل بنكي',
    autoRenewal: false
  },
  {
    id: 'SUB-2023-005',
    subscriber: 'Michael Wilson',
    plan: 'مدرسة',
    status: 'نشط',
    startDate: '1 مايو 2023',
    endDate: '31 ديسمبر 2023',
    price: '399.99 د.ج',
    paymentMethod: 'بطاقة ائتمان',
    autoRenewal: true
  }
];

// Sample payments data
const paymentsData = [
  {
    id: 'PAY-2023-001',
    subscriptionId: 'SUB-2023-001',
    payer: 'John Doe',
    amount: '199.99 د.ج',
    date: '1 يونيو 2023',
    paymentMethod: 'بطاقة ائتمان',
    status: 'ناجح'
  },
  {
    id: 'PAY-2023-002',
    subscriptionId: 'SUB-2023-002',
    payer: 'Jane Smith',
    amount: '299.99 د.ج',
    date: '2 يونيو 2023',
    paymentMethod: 'تحويل بنكي',
    status: 'قيد الانتظار'
  },
  {
    id: 'PAY-2023-003',
    subscriptionId: 'SUB-2023-003',
    payer: 'Robert Johnson',
    amount: '499.99 د.ج',
    date: '3 يونيو 2023',
    paymentMethod: 'بطاقة ائتمان',
    status: 'ناجح'
  },
  {
    id: 'PAY-2023-004',
    subscriptionId: 'SUB-2023-004',
    payer: 'Emily Davis',
    amount: '199.99 د.ج',
    date: '4 يونيو 2023',
    paymentMethod: 'تحويل بنكي',
    status: 'ناجح'
  },
  {
    id: 'PAY-2023-005',
    subscriptionId: 'SUB-2023-005',
    payer: 'Michael Wilson',
    amount: '399.99 د.ج',
    date: '5 يونيو 2023',
    paymentMethod: 'بطاقة ائتمان',
    status: 'ناجح'
  }
];

// Sample commissions data
const commissionsData = [
  {
    id: 'COM-001',
    agentName: 'محمد عبد الله',
    subscriptionId: 'SUB-2023-001',
    amount: '120 د.ج',
    date: '20 يناير 2023',
    status: 'قيد الانتظار'
  },
  {
    id: 'COM-002',
    agentName: 'أحمد محمود',
    subscriptionId: 'SUB-2023-003',
    amount: '95 د.ج',
    date: '10 مارس 2023',
    status: 'مدفوع'
  },
  {
    id: 'COM-003',
    agentName: 'سارة أحمد',
    subscriptionId: 'SUB-2023-005',
    amount: '250 د.ج',
    date: '15 مايو 2023',
    status: 'قيد الانتظار'
  }
];

interface PaymentSetting {
  id: string;
  label: string;
  enabled: boolean;
}

const Subscriptions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('نظرة عامة');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');
  const [dateRange, setDateRange] = useState({ start: '5/2025', end: '6/2025' });
  const [paymentSettings, setPaymentSettings] = useState<PaymentSetting[]>([
    { id: 'electronic_payment', label: 'الدفع الإلكتروني', enabled: true },
    { id: 'bank_transfer', label: 'التحويل البنكي', enabled: true },
    { id: 'installments', label: 'الاستردادات', enabled: true },
    { id: 'commissions', label: 'العمولات', enabled: true },
    { id: 'advanced_payment', label: 'الدفع المتأخر', enabled: true }
  ]);

  // Settings state
  const [generalSettings, setGeneralSettings] = useState<PaymentSetting[]>([
    { id: 'default_currency', label: 'العملة الافتراضية', enabled: true },
    { id: 'trial_period', label: 'عدد أيام الفترة التجريبية', enabled: true },
    { id: 'send_reminders', label: 'إرسال تذكيرات', enabled: true },
    { id: 'auto_renewal', label: 'التجديد التلقائي', enabled: true }
  ]);

  const [commissionSettings, setCommissionSettings] = useState<PaymentSetting[]>([
    { id: 'commission_rate', label: 'معدل صرف العمولات', enabled: true },
    { id: 'agent_commission', label: 'نسبة عمولة الوكيل', enabled: true }
  ]);

  const tabs = [
    { name: 'نظرة عامة', icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'الاشتراكات', icon: <CreditCard className="w-4 h-4" /> },
    { name: 'العمولات', icon: <DollarSign className="w-4 h-4" /> },
    { name: 'المدفوعات', icon: <Settings className="w-4 h-4" /> },
    { name: 'الإعدادات', icon: <Settings className="w-4 h-4" /> }
  ];

  const statsCards = [
    {
      title: 'إجمالي الاشتراكات',
      subtitle: 'الاشتراكات النشطة',
      value: '1,234',
      change: '+12.5%',
      isPositive: true,
      icon: <CreditCard className="w-6 h-6" />,
      color: 'bg-blue-600'
    },
    {
      title: 'الإيرادات الشهرية',
      subtitle: 'القيمة الحالية',
      value: '$45,678',
      change: '+8.3%',
      isPositive: true,
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-green-600'
    },
    {
      title: 'المدفوعات المعلقة',
      subtitle: 'بحاجة للمراجعة',
      value: '32',
      change: '+5.2%',
      isPositive: false,
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-yellow-600'
    },
    {
      title: 'إجمالي العمولات',
      subtitle: 'المدفوعات الصادرة',
      value: '$12,345',
      change: '+15.7%',
      isPositive: true,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-purple-600'
    }
  ];

  const handleTogglePaymentSetting = (id: string) => {
    setPaymentSettings(prev => 
      prev.map(setting => 
        setting.id === id 
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const handleToggleGeneralSetting = (id: string) => {
    setGeneralSettings(prev => 
      prev.map(setting => 
        setting.id === id 
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const handleToggleCommissionSetting = (id: string) => {
    setCommissionSettings(prev => 
      prev.map(setting => 
        setting.id === id 
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const handleViewSubscription = (id: string) => {
    console.log('View subscription:', id);
  };

  const handleEditSubscription = (id: string) => {
    console.log('Edit subscription:', id);
  };

  const handleDeleteSubscription = (id: string) => {
    console.log('Delete subscription:', id);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${card.color} rounded-xl p-6 text-white relative overflow-hidden`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-full">
                {card.icon}
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{card.value}</div>
                <div className="text-sm opacity-90">{card.title}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm flex items-center gap-1 ${
                card.isPositive ? 'text-green-200' : 'text-red-200'
              }`}>
                <TrendingUp className={`w-4 h-4 ${!card.isPositive ? 'rotate-180' : ''}`} />
                {card.change}
              </span>
              <span className="text-sm opacity-75">{card.subtitle}</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full"></div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Growth Chart */}
        <div className="bg-dark-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">نمو المستخدمين</h3>
            <LineChart className="w-5 h-5 text-blue-400" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsLineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#6366f1" 
                strokeWidth={3}
                dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#6366f1' }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
          <div className="text-center mt-4">
            <span className="text-blue-400 text-sm">المستخدمين</span>
          </div>
        </div>

        {/* Subscription Plans Pie Chart */}
        <div className="bg-dark-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">الاشتراكات حسب الخطة</h3>
            <PieChart className="w-5 h-5 text-green-400" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPieChart>
              <Pie
                data={subscriptionPlanData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {subscriptionPlanData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {subscriptionPlanData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-400">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-dark-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">الإيرادات عبر الزمن</h3>
            <BarChart3 className="w-5 h-5 text-purple-400" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="subscriptions" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="renewals" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-400">الاشتراكات</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-400">التجديدات</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSubscriptions = () => {
    const columns: TableColumn[] = [
      {
        key: 'id',
        title: 'الرقم التعريفي',
        sortable: true,
        render: (value) => (
          <span className="font-mono text-sm text-blue-400">{value}</span>
        )
      },
      {
        key: 'subscriber',
        title: 'المشترك',
        sortable: true,
        render: (value) => (
          <span className="font-medium text-white">{value}</span>
        )
      },
      {
        key: 'plan',
        title: 'الخطة',
        sortable: true,
        render: (value) => (
          <span className="text-gray-300">{value}</span>
        )
      },
      {
        key: 'price',
        title: 'السعر',
        sortable: true,
        render: (value) => (
          <span className="font-semibold text-green-400">{value}</span>
        )
      },
      {
        key: 'startDate',
        title: 'تاريخ البدء',
        sortable: true,
        render: (value) => (
          <span className="text-gray-400 text-sm">{value}</span>
        )
      },
      {
        key: 'endDate',
        title: 'تاريخ الانتهاء',
        sortable: true,
        render: (value) => (
          <span className="text-gray-400 text-sm">{value}</span>
        )
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
        render: (value) => (
          <span className="text-gray-300 text-sm">{value}</span>
        )
      }
    ];

    const filteredData = subscriptionsData.filter(subscription => {
      const matchesSearch = subscription.subscriber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           subscription.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'الكل' || subscription.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

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
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="bg-dark-400 border border-dark-200 rounded-lg px-3 py-2 text-white text-sm w-20 focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
            <input
              type="text"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
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
            عرض {filteredData.length} من أصل {subscriptionsData.length} اشتراك
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

  const renderCommissions = () => {
    const columns: TableColumn[] = [
      {
        key: 'id',
        title: 'الرقم التعريفي',
        sortable: true,
        render: (value) => (
          <span className="font-mono text-sm text-blue-400">{value}</span>
        )
      },
      {
        key: 'agentName',
        title: 'اسم الوكيل',
        sortable: true,
        render: (value) => (
          <span className="font-medium text-white">{value}</span>
        )
      },
      {
        key: 'subscriptionId',
        title: 'رقم الاشتراك',
        sortable: true,
        render: (value) => (
          <span className="text-gray-300 font-mono text-sm">{value}</span>
        )
      },
      {
        key: 'date',
        title: 'التاريخ',
        sortable: true,
        render: (value) => (
          <span className="text-gray-400 text-sm">{value}</span>
        )
      },
      {
        key: 'amount',
        title: 'المبلغ',
        sortable: true,
        render: (value) => (
          <span className="font-semibold text-green-400">{value}</span>
        )
      },
      {
        key: 'status',
        title: 'الحالة',
        sortable: true,
        render: (value) => {
          const variant = value === 'مدفوع' ? 'success' : 'warning';
          return <StatusBadge status={value} variant={variant as any} />;
        }
      }
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">قائمة العمولات</h2>
        </div>

        <Table
          columns={columns}
          data={commissionsData}
          rowKey="id"
          hoverable={true}
          emptyText="لا توجد عمولات"
        />

        <div className="flex items-center justify-between pt-4 border-t border-dark-200">
          <div className="text-sm text-gray-400">
            عرض {commissionsData.length} من أصل {commissionsData.length} عمولة
          </div>
        </div>
      </div>
    );
  };

  const renderPayments = () => {
    const columns: TableColumn[] = [
      {
        key: 'id',
        title: 'الرقم التعريفي',
        sortable: true,
        render: (value) => (
          <span className="font-mono text-sm text-blue-400">{value}</span>
        )
      },
      {
        key: 'payer',
        title: 'الدافع',
        sortable: true,
        render: (value) => (
          <span className="font-medium text-white">{value}</span>
        )
      },
      {
        key: 'subscriptionId',
        title: 'رقم الاشتراك',
        sortable: true,
        render: (value) => (
          <span className="text-gray-300 font-mono text-sm">{value}</span>
        )
      },
      {
        key: 'paymentMethod',
        title: 'طريقة الدفع',
        render: (value) => (
          <span className="text-gray-300 text-sm">{value}</span>
        )
      },
      {
        key: 'date',
        title: 'التاريخ',
        sortable: true,
        render: (value) => (
          <span className="text-gray-400 text-sm">{value}</span>
        )
      },
      {
        key: 'amount',
        title: 'المبلغ',
        sortable: true,
        render: (value) => (
          <span className="font-semibold text-green-400">{value}</span>
        )
      },
      {
        key: 'status',
        title: 'الحالة',
        sortable: true,
        render: (value) => {
          const variant = value === 'ناجح' ? 'success' : 'warning';
          return <StatusBadge status={value} variant={variant as any} />;
        }
      }
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">قائمة المدفوعات</h2>
        </div>

        <Table
          columns={columns}
          data={paymentsData}
          rowKey="id"
          hoverable={true}
          emptyText="لا توجد مدفوعات"
        />

        <div className="flex items-center justify-between pt-4 border-t border-dark-200">
          <div className="text-sm text-gray-400">
            عرض {paymentsData.length} من أصل {paymentsData.length} مدفوعة
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="space-y-8">
      {/* General Settings */}
      <div className="bg-dark-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">الإعدادات العامة</h3>
          <span className="text-sm text-gray-400">عدد أيام الفترة التجريبية</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              العملة الافتراضية
            </label>
            <select className="w-full bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600">
              <option value="IQD">IQD (د.ع)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              عدد أيام الفترة التجريبية
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value="14"
                className="flex-1 bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
              <button className="p-2 bg-dark-400 border border-dark-200 rounded-lg text-gray-400 hover:text-white">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {generalSettings.map((setting, index) => (
            <div key={setting.id} className="flex items-center justify-between py-3 border-b border-dark-300 last:border-b-0">
              <div>
                <span className="text-white font-medium">{setting.label}</span>
                <div className="text-sm text-gray-400">
                  {setting.id === 'default_currency' && 'العملة المستخدمة في جميع المعاملات المالية'}
                  {setting.id === 'trial_period' && 'عدد الأيام التي يحصل عليها المستخدم في التجربة المجانية'}
                  {setting.id === 'send_reminders' && 'إرسال إشعارات المستخدم من قبل انتهاء اشتراكهم'}
                  {setting.id === 'auto_renewal' && 'تجديد الاشتراكات تلقائياً عند انتهاء المدة'}
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={setting.enabled}
                  onChange={() => handleToggleGeneralSetting(setting.id)}
                  className="sr-only peer"
                />
                <div className={`relative w-11 h-6 rounded-full transition-colors ${
                  setting.enabled ? 'bg-primary-600' : 'bg-gray-600'
                }`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    setting.enabled ? 'translate-x-5 rtl:-translate-x-5' : 'translate-x-0.5 rtl:-translate-x-0.5'
                  }`}></div>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Commission Settings */}
      <div className="bg-dark-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">إعدادات العمولات</h3>
          <span className="text-sm text-gray-400">نسبة عمولة الوكيل</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              معدل صرف العمولات
            </label>
            <select className="w-full bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600">
              <option value="monthly">شهري</option>
              <option value="weekly">أسبوعي</option>
              <option value="daily">يومي</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              نسبة عمولة الوكيل
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value="7"
                className="flex-1 bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
              <span className="text-gray-400">%</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {commissionSettings.map((setting, index) => (
            <div key={setting.id} className="flex items-center justify-between py-3 border-b border-dark-300 last:border-b-0">
              <div>
                <span className="text-white font-medium">{setting.label}</span>
                <div className="text-sm text-gray-400">
                  {setting.id === 'commission_rate' && 'تحديد توقيت صرف العمولات للوكلاء'}
                  {setting.id === 'agent_commission' && 'نسبة العمولة التي يحصل عليها الوكيل من كل اشتراك'}
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={setting.enabled}
                  onChange={() => handleToggleCommissionSetting(setting.id)}
                  className="sr-only peer"
                />
                <div className={`relative w-11 h-6 rounded-full transition-colors ${
                  setting.enabled ? 'bg-primary-600' : 'bg-gray-600'
                }`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    setting.enabled ? 'translate-x-5 rtl:-translate-x-5' : 'translate-x-0.5 rtl:-translate-x-0.5'
                  }`}></div>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-between">
        <button className="bg-dark-200 hover:bg-dark-100 text-white px-6 py-3 rounded-lg transition-colors">
          إلغاء
        </button>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
          <Save className="w-5 h-5" />
          حفظ التغييرات
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'نظرة عامة':
        return renderOverview();
      case 'الاشتراكات':
        return renderSubscriptions();
      case 'العمولات':
        return renderCommissions();
      case 'المدفوعات':
        return renderPayments();
      case 'الإعدادات':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-primary-500" />
            إدارة الاشتراكات
          </h1>
          <p className="text-gray-400 mt-1">إدارة جميع اشتراكات المدارس والمستخدمين في النظام</p>
        </div>
      </div>

      <div className="bg-dark-300 rounded-xl overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-dark-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`
                  flex items-center gap-2 px-6 py-4 whitespace-nowrap font-medium transition-colors border-b-2
                  ${activeTab === tab.name
                    ? 'bg-dark-200 text-white border-primary-600'
                    : 'text-gray-400 hover:text-white hover:bg-dark-200/50 border-transparent'
                  }
                `}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;