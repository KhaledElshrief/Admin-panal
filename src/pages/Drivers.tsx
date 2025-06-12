import React, { useState } from 'react';
import { Eye, FileCheck, FileX, Check, X, Bell, MessageSquare, Settings, BarChart2, Users, FileText, Edit, Trash2, AlertTriangle, Star, User } from 'lucide-react';

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
}

const driversData: Driver[] = [
  {
    id: 1,
    name: 'أحمد محمد',
    phone: '0501234567',
    vehicle: 'تويوتا كامري - 2022 - أبيض',
    city: 'الرياض',
    date: '2023-08-10',
    documents: 'complete',
    status: 'active',
    trips: 120,
    rating: 4.8,
    classification: 'مجموعة مكتملة'
  },
  {
    id: 2,
    name: 'خالد عبدالله',
    phone: '0559876543',
    vehicle: 'هيونداي سوناتا - 2023 - أسود',
    city: 'جدة',
    date: '2023-08-11',
    documents: 'incomplete',
    status: 'suspended',
    trips: 45,
    rating: 3.5,
    classification: 'مجموعة مكتملة'
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

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-200">
              <th className="text-right py-3 px-4">الاسم</th>
              <th className="text-right py-3 px-4">رقم الهاتف</th>
              <th className="text-right py-3 px-4">معلومات المركبة</th>
              <th className="text-right py-3 px-4">المدينة</th>
              <th className="text-right py-3 px-4">تاريخ التقديم</th>
              <th className="text-right py-3 px-4">حالة المستندات</th>
              <th className="text-right py-3 px-4">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {driversData.map((driver) => (
              <tr key={driver.id} className="border-b border-dark-200">
                <td className="py-4 px-4">{driver.name}</td>
                <td className="py-4 px-4">{driver.phone}</td>
                <td className="py-4 px-4">{driver.vehicle}</td>
                <td className="py-4 px-4">{driver.city}</td>
                <td className="py-4 px-4">{driver.date}</td>
                <td className="py-4 px-4">
                  <span className={`flex items-center gap-2 ${
                    driver.documents === 'complete' ? 'text-success-400' : 'text-warning-400'
                  }`}>
                    {driver.documents === 'complete' ? (
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
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-white rounded-lg bg-dark-200 hover:bg-dark-100">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-success-400 hover:text-success-300 rounded-lg bg-dark-200 hover:bg-dark-100">
                      <Check className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-error-400 hover:text-error-300 rounded-lg bg-dark-200 hover:bg-dark-100">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
          <option>المنة</option>
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

      {/* Drivers Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-200">
              <th className="text-right py-3 px-4 flex items-center gap-2">
                الاسم
                <button className="text-gray-400 hover:text-white">
                  <BarChart2 className="w-4 h-4" />
                </button>
              </th>
              <th className="text-right py-3 px-4">معلومات المركبة</th>
              <th className="text-right py-3 px-4 flex items-center gap-2">
                المدينة
                <button className="text-gray-400 hover:text-white">
                  <BarChart2 className="w-4 h-4" />
                </button>
              </th>
              <th className="text-right py-3 px-4">التصنيف</th>
              <th className="text-right py-3 px-4 flex items-center gap-2">
                الحالة
                <button className="text-gray-400 hover:text-white">
                  <BarChart2 className="w-4 h-4" />
                </button>
              </th>
              <th className="text-right py-3 px-4 flex items-center gap-2">
                التقييم
                <button className="text-gray-400 hover:text-white">
                  <BarChart2 className="w-4 h-4" />
                </button>
              </th>
              <th className="text-right py-3 px-4 flex items-center gap-2">
                عدد الرحلات
                <button className="text-gray-400 hover:text-white">
                  <BarChart2 className="w-4 h-4" />
                </button>
              </th>
              <th className="text-right py-3 px-4">التحقق</th>
              <th className="text-right py-3 px-4">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {driversData.map((driver) => (
              <tr key={driver.id} className="border-b border-dark-200 hover:bg-dark-200/50">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{driver.name}</div>
                      <div className="text-sm text-gray-400">{driver.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm">{driver.vehicle}</td>
                <td className="py-4 px-4">{driver.city}</td>
                <td className="py-4 px-4">
                  <span className="text-success-400 text-sm">{driver.classification}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    driver.status === 'active' ? 'bg-success-600/20 text-success-400' :
                    driver.status === 'suspended' ? 'bg-error-600/20 text-error-400' :
                    'bg-warning-600/20 text-warning-400'
                  }`}>
                    {driver.status === 'active' ? 'نشط' : 
                     driver.status === 'suspended' ? 'موقوف' : 'قيد الانتظار'}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">({driver.rating})</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                </td>
                <td className="py-4 px-4 font-medium">{driver.trips}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-success-400" />
                    <span className="text-success-400 text-sm">تم التحقق</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-white rounded-lg bg-dark-300 hover:bg-dark-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-blue-400 hover:text-blue-300 rounded-lg bg-dark-300 hover:bg-dark-200">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-yellow-400 hover:text-yellow-300 rounded-lg bg-dark-300 hover:bg-dark-200">
                      <AlertTriangle className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-error-400 hover:text-error-300 rounded-lg bg-dark-300 hover:bg-dark-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

        {activeTab === 'الموافقات' ? renderApprovals() : renderDriverManagement()}
      </div>
    </div>
  );
};

export default Drivers;