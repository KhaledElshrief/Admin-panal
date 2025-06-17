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
  LineChart
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

interface PaymentSetting {
  id: string;
  label: string;
  enabled: boolean;
}

const Subscriptions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('نظرة عامة');
  const [paymentSettings, setPaymentSettings] = useState<PaymentSetting[]>([
    { id: 'electronic_payment', label: 'الدفع الإلكتروني', enabled: true },
    { id: 'bank_transfer', label: 'التحويل البنكي', enabled: true },
    { id: 'installments', label: 'الاستردادات', enabled: true },
    { id: 'commissions', label: 'العمولات', enabled: true },
    { id: 'advanced_payment', label: 'الدفع المتأخر', enabled: true }
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

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">إعدادات المدفوعات</h2>
        <p className="text-gray-400">إدارة طرق الدفع والإعدادات المالية للنظام</p>
      </div>

      <div className="bg-dark-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-6">الميزات العامة</h3>
        
        <div className="space-y-6">
          {paymentSettings.map((setting, index) => (
            <motion.div
              key={setting.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between py-4 border-b border-dark-300 last:border-b-0"
            >
              <div className="flex-1">
                <label 
                  htmlFor={setting.id}
                  className="text-lg font-medium text-white cursor-pointer"
                >
                  {setting.label}
                </label>
              </div>
              
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id={setting.id}
                    checked={setting.enabled}
                    onChange={() => handleTogglePaymentSetting(setting.id)}
                    className="sr-only peer"
                  />
                  <div className={`
                    relative w-14 h-7 rounded-full transition-colors duration-200 ease-in-out
                    ${setting.enabled 
                      ? 'bg-primary-600' 
                      : 'bg-gray-600'
                    }
                    peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300/20
                  `}>
                    <div className={`
                      absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in-out
                      ${setting.enabled 
                        ? 'translate-x-7 rtl:-translate-x-7' 
                        : 'translate-x-0.5 rtl:-translate-x-0.5'
                      }
                    `}></div>
                  </div>
                </label>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="pt-6 border-t border-dark-300 mt-6">
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors">
            حفظ الإعدادات
          </button>
        </div>
      </div>
    </div>
  );

  const renderSubscriptions = () => (
    <div className="text-center py-12">
      <CreditCard className="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-400 mb-2">إدارة الاشتراكات</h3>
      <p className="text-gray-500">صفحة إدارة الاشتراكات قيد التطوير</p>
    </div>
  );

  const renderCommissions = () => (
    <div className="text-center py-12">
      <DollarSign className="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-400 mb-2">إدارة العمولات</h3>
      <p className="text-gray-500">صفحة إدارة العمولات قيد التطوير</p>
    </div>
  );

  const renderSettings = () => (
    <div className="text-center py-12">
      <Settings className="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-400 mb-2">الإعدادات</h3>
      <p className="text-gray-500">صفحة الإعدادات قيد التطوير</p>
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
        return renderPaymentSettings();
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