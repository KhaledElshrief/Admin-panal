import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactUs, deleteContactUs } from '../store/slices/contactUsSlice';
import type { RootState, AppDispatch } from '../store';
import { MessageCircle, User, Calendar, Phone, MapPin, Trash2 } from 'lucide-react';
import { showToast } from '../store/slices/toastSlice';
import Table, { TableColumn } from '../components/ui/Table';
import Pagination from '../components/ui/Pagination';
import type { ContactUsItem } from '../store/slices/contactUsSlice';

const ContactUs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { contacts, loading, deleteLoading, error, totalItems, totalPages, message } = useSelector(
    (state: RootState) => state.contactUs
  );

  const [showStatusMessage, setShowStatusMessage] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    dispatch(fetchContactUs({ page: currentPage, pageSize }));
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    if (message?.arabic || message?.english) {
      setShowStatusMessage(true);
      const timer = setTimeout(() => setShowStatusMessage(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [message?.arabic, message?.english]);

  useEffect(() => {
    if (error) {
      dispatch(showToast({ message: error, type: 'error' }));
    }
  }, [error, dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (contactId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا التقرير؟')) {
      const result = await dispatch(deleteContactUs(contactId));
      if (deleteContactUs.fulfilled.match(result)) {
        dispatch(showToast({ message: 'تم حذف التقرير بنجاح', type: 'success' }));
      }
    }
  };

  const columns: TableColumn<ContactUsItem>[] = [
    {
      key: 'name',
      title: 'المستخدم',
      width: '300px',
      render: (_, record) => (
        <div className="flex items-center gap-3">
          {record.User.image && (
            <img
              src={record.User.image.startsWith('/') ? `https://mahfouzapp.com${record.User.image}` : record.User.image}
              alt={record.User.userName}
              className="w-10 h-10 rounded-full object-cover border border-gray-400"
            />
          )}
          <div>
            <div className="font-semibold text-white">{record.name}</div>
            <div className="text-sm text-gray-400 flex items-center gap-1">
              <User className="w-3 h-3" />
              {record.User.userName}
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {record.User.region}
            </div>
            <div className="text-xs text-primary-400 font-medium">
              {record.User.role}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'contactNumber',
      title: 'معلومات التواصل',
      width: '150px',
      render: (value) => (
        <div className="space-y-1">
          <div className="text-sm text-gray-300 flex items-center gap-2">
            <Phone className="w-3 h-3" />
            {value}
          </div>
        </div>
      ),
    },
    {
      key: 'reason',
      title: 'السبب',
      width: '150px',
      render: (value) => (
        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
          {value}
        </span>
      ),
    },
    {
      key: 'message',
      title: 'الرسالة',
      width: '300px',
      render: (value) => (
        <div className="max-w-xs">
          <p className="text-sm text-gray-300 line-clamp-2">
            {value}
          </p>
        </div>
      ),
    },
    {
      key: 'createdAt',
      title: 'التاريخ',
      width: '150px',
      render: (value) => (
        <div>
          <div className="text-sm text-gray-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(value).toLocaleDateString('ar-EG')}
          </div>
          <div className="text-xs text-gray-500">
            {new Date(value).toLocaleTimeString('ar-EG')}
          </div>
        </div>
      ),
    },
    {
      key: 'actions',
      title: 'الإجراءات',
      width: '100px',
      align: 'center',
      render: (_, record) => (
        <button
          onClick={() => handleDelete(record.id)}
          disabled={deleteLoading}
          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
          title="حذف التقرير"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="p-8 max-w-8xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle className="w-8 h-8 text-primary-500" />
        <h1 className="text-3xl font-bold text-white">تقارير التواصل</h1>
        <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          {totalItems}
        </span>
      </div>

      {/* Status Message */}
      {showStatusMessage && message && (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 shadow flex flex-col md:flex-row md:items-center md:gap-4 transition-opacity duration-500">
          <span className="font-bold">{message.arabic}</span>
          <span className="text-gray-500 text-sm">{message.english}</span>
        </div>
      )}

      {/* Contact Us Table */}
      <Table
        columns={columns}
        data={contacts}
        loading={loading}
        emptyText="لا توجد تقارير تواصل"
        hoverable={true}
        striped={false}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ContactUs; 