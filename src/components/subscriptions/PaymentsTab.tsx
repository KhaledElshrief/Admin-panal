import React, { useState } from 'react';
import Table, { TableColumn } from '../ui/Table';
import StatusBadge from '../ui/StatusBadge';

// Mock data (replace with API call if available)
const mockPaymentsData = [
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

const PaymentsTab: React.FC = () => {
  const [paymentsData] = useState(mockPaymentsData);
  const columns: TableColumn[] = [
    {
      key: 'id',
      title: 'الرقم التعريفي',
      sortable: true,
      render: (value) => <span className="font-mono text-sm text-blue-400">{value}</span>
    },
    {
      key: 'payer',
      title: 'الدافع',
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
      key: 'paymentMethod',
      title: 'طريقة الدفع',
      render: (value) => <span className="text-gray-300 text-sm">{value}</span>
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

export default PaymentsTab; 