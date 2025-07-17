import React, { useState } from 'react';
import Table, { TableColumn } from '../ui/Table';
import StatusBadge from '../ui/StatusBadge';

// Mock data (replace with API call if available)
const mockCommissionsData = [
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

const CommissionsTab: React.FC = () => {
  const [commissionsData] = useState(mockCommissionsData);
  const columns: TableColumn[] = [
    {
      key: 'id',
      title: 'الرقم التعريفي',
      sortable: true,
      render: (value) => <span className="font-mono text-sm text-blue-400">{value}</span>
    },
    {
      key: 'agentName',
      title: 'اسم الوكيل',
      sortable: true,
      render: (value) => <span className="font-medium text-white">{value}</span>
    },
    {
      key: 'subscriptionId',
      title: 'رقم الاشتراك',
      sortable: true,
      render: (value) => <span className="text-gray-300 font-mono text-sm">{value}</span>
    },
    {
      key: 'date',
      title: 'التاريخ',
      sortable: true,
      render: (value) => <span className="text-gray-400 text-sm">{value}</span>
    },
    {
      key: 'amount',
      title: 'المبلغ',
      sortable: true,
      render: (value) => <span className="font-semibold text-green-400">{value}</span>
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

export default CommissionsTab; 