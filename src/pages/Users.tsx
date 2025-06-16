import React, { useState } from 'react';
import { Plus, Download, RotateCcw } from 'lucide-react';
import Table, { TableColumn } from '../components/ui/Table';
import { ViewAction, EditAction } from '../components/ui/TableActions';
import StatusBadge from '../components/ui/StatusBadge';
import UserAvatar from '../components/ui/UserAvatar';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  accountStatus: 'active' | 'inactive' | 'suspended';
  createdDate: string;
  userType: 'employee' | 'admin' | 'supervisor';
  identifier: string;
}

const usersData: User[] = [
  {
    id: 'usr-001',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '07701234567',
    role: 'مدير',
    accountStatus: 'active',
    createdDate: '15 يناير 2023',
    userType: 'employee',
    identifier: 'usr-001'
  },
  {
    id: 'usr-002',
    name: 'فاطمة علي',
    email: 'fatima@example.com',
    phone: '07712345678',
    role: 'مدير اقليمي',
    accountStatus: 'active',
    createdDate: '10 فبراير 2023',
    userType: 'employee',
    identifier: 'usr-002'
  },
  {
    id: 'usr-003',
    name: 'حسين جاسم',
    email: 'hussein@example.com',
    phone: '07723456789',
    role: 'مشرف',
    accountStatus: 'inactive',
    createdDate: '5 مارس 2023',
    userType: 'employee',
    identifier: 'usr-003'
  },
  {
    id: 'usr-004',
    name: 'زينب عباس',
    email: 'zainab@example.com',
    phone: '07734567890',
    role: 'معلم',
    accountStatus: 'active',
    createdDate: '18 أبريل 2023',
    userType: 'employee',
    identifier: 'usr-004'
  },
  {
    id: 'usr-005',
    name: 'محمد جواد',
    email: 'mohammad@example.com',
    phone: '07745678901',
    role: 'مدير',
    accountStatus: 'suspended',
    createdDate: '22 مايو 2023',
    userType: 'employee',
    identifier: 'usr-005'
  }
];

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('اختر...');
  const [roleFilter, setRoleFilter] = useState('اختر...');
  const [userTypeFilter, setUserTypeFilter] = useState('اختر...');

  const handleSuspendAccount = (userId: string) => {
    console.log('Suspend account:', userId);
  };

  const handleActivateAccount = (userId: string) => {
    console.log('Activate account:', userId);
  };

  const handleViewDetails = (userId: string) => {
    console.log('View details:', userId);
  };

  const columns: TableColumn<User>[] = [
    {
      key: 'select',
      title: '',
      width: '50px',
      render: () => (
        <input
          type="checkbox"
          className="w-4 h-4 text-primary-600 bg-dark-400 border-dark-200 rounded focus:ring-primary-500"
        />
      )
    },
    {
      key: 'identifier',
      title: 'المعرف',
      sortable: true,
      render: (value) => (
        <span className="text-gray-400 text-sm font-mono">{value}</span>
      )
    },
    {
      key: 'name',
      title: 'اسم المستخدم',
      sortable: true,
      render: (_, record) => (
        <UserAvatar 
          name={record.name} 
          email={record.email}
          size="md"
        />
      )
    },
    {
      key: 'email',
      title: 'البريد الالكتروني',
      sortable: true,
      render: (value) => (
        <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
          {value}
        </span>
      )
    },
    {
      key: 'phone',
      title: 'رقم الهاتف',
      sortable: true,
      render: (value) => (
        <span className="font-mono text-sm">{value}</span>
      )
    },
    {
      key: 'role',
      title: 'الدور',
      sortable: true,
      render: (value) => (
        <span className="text-gray-300">{value}</span>
      )
    },
    {
      key: 'accountStatus',
      title: 'حالة الحساب',
      sortable: true,
      render: (value) => {
        const statusMap = {
          active: { text: 'نشط', variant: 'success' as const },
          inactive: { text: 'غير نشط', variant: 'warning' as const },
          suspended: { text: 'معلق', variant: 'error' as const }
        };
        const status = statusMap[value];
        return <StatusBadge status={status.text} variant={status.variant} />;
      }
    },
    {
      key: 'createdDate',
      title: 'تاريخ الإنشاء',
      sortable: true,
      render: (value) => (
        <span className="text-gray-400 text-sm">{value}</span>
      )
    },
    {
      key: 'userType',
      title: 'نوع المستخدم',
      sortable: true,
      render: (value) => {
        const typeMap = {
          employee: 'موظف',
          admin: 'مدير',
          supervisor: 'مشرف'
        };
        return <span className="text-gray-300">{typeMap[value]}</span>;
      }
    },
    {
      key: 'actions',
      title: 'الإجراءات',
      render: (_, record) => (
        <div className="flex items-center gap-2">
          {record.accountStatus === 'suspended' ? (
            <button
              onClick={() => handleActivateAccount(record.id)}
              className="px-3 py-1 bg-success-600 hover:bg-success-700 text-white text-sm rounded-lg transition-colors"
            >
              تفعيل الحساب
            </button>
          ) : (
            <button
              onClick={() => handleSuspendAccount(record.id)}
              className="px-3 py-1 bg-error-600 hover:bg-error-700 text-white text-sm rounded-lg transition-colors"
            >
              تعليق الحساب
            </button>
          )}
          <ViewAction onClick={() => handleViewDetails(record.id)} />
        </div>
      )
    }
  ];

  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'اختر...' || user.accountStatus === statusFilter;
    const matchesRole = roleFilter === 'اختر...' || user.role === roleFilter;
    const matchesUserType = userTypeFilter === 'اختر...' || user.userType === userTypeFilter;

    return matchesSearch && matchesStatus && matchesRole && matchesUserType;
  });

  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('اختر...');
    setRoleFilter('اختر...');
    setUserTypeFilter('اختر...');
  };

  const handleSelectAll = () => {
    console.log('Select all users');
  };

  const handleDeselectAll = () => {
    console.log('Deselect all users');
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-sm">
            قائمة المستخدمين
          </span>
          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
            إجمالي المستخدمين: {usersData.length}
          </span>
        </div>
      </div>

      <div className="bg-dark-300 rounded-xl p-6 space-y-6">
        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Plus className="w-4 h-4" />
              إضافة مستخدم جديد
            </button>
            <button className="bg-success-600 hover:bg-success-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Download className="w-4 h-4" />
              تصدير البيانات
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSelectAll}
              className="bg-dark-200 hover:bg-dark-100 text-white px-3 py-2 rounded-lg text-sm transition-colors"
            >
              تحديد الكل
            </button>
            <button
              onClick={handleDeselectAll}
              className="bg-dark-200 hover:bg-dark-100 text-white px-3 py-2 rounded-lg text-sm transition-colors"
            >
              إلغاء تحديد الكل
            </button>
            <button
              onClick={handleReset}
              className="bg-dark-200 hover:bg-dark-100 text-white px-3 py-2 rounded-lg text-sm transition-colors"
            >
              إعادة تعيين
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <input
              type="text"
              placeholder="البحث بالاسم، البريد الإلكتروني، الهاتف..."
              className="w-full bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <select
              className="w-full bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>فلترة حسب الحالة</option>
              <option value="اختر...">اختر...</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
              <option value="suspended">معلق</option>
            </select>
          </div>

          <div>
            <select
              className="w-full bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option>فلترة حسب الدور</option>
              <option value="اختر...">اختر...</option>
              <option value="مدير">مدير</option>
              <option value="مدير اقليمي">مدير اقليمي</option>
              <option value="مشرف">مشرف</option>
              <option value="معلم">معلم</option>
            </select>
          </div>

          <div>
            <select
              className="w-full bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              value={userTypeFilter}
              onChange={(e) => setUserTypeFilter(e.target.value)}
            >
              <option>فلترة حسب نوع المستخدم</option>
              <option value="اختر...">اختر...</option>
              <option value="employee">موظف</option>
              <option value="admin">مدير</option>
              <option value="supervisor">مشرف</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          data={filteredUsers}
          rowKey="id"
          hoverable={true}
          striped={false}
        />

        {/* Results Summary */}
        <div className="flex items-center justify-between pt-4 border-t border-dark-200">
          <div className="text-sm text-gray-400">
            عرض {filteredUsers.length} من أصل {usersData.length} مستخدم
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
    </div>
  );
};

export default Users;