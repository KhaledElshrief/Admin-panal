import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNotifications } from '../hooks/useNotifications';
import { showToast } from '../store/slices/toastSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import type { CreateNotificationRequest, Notification } from '../store/slices/notificationsSlice';
import { fetchNotifications } from '../store/slices/notificationsSlice';
import { 
  NotificationsList, 
  AddNotificationForm, 
  NotificationTabs, 
  NotificationStats 
} from '../components/notifications';



const Notifications: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { 
    createNewNotification, 
    createLoading, 
    createError, 
    createSuccess,
    clearErrors,
    clearSuccess 
  } = useNotifications();
  
  // Redux state for notifications
  const { notifications, loading, error } = useAppSelector((state) => state.notifications);
  
  const [activeTab, setActiveTab] = useState(t('notifications.allNotifications'));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Map API notifications to component expected format
  const mappedNotifications = notifications.map(notification => ({
    id: notification.id,
    title: notification.title[i18n.language as keyof typeof notification.title] || notification.title.ar, // Use current language or fallback to Arabic
    content: notification.description[i18n.language as keyof typeof notification.description] || notification.description.ar, // Use current language or fallback to Arabic
    type: (notification.type === 'APP_NOTIFICATION' ? 'system' : 'info') as 'system' | 'warning' | 'info',
    date: new Date(notification.createdAt).toLocaleDateString(i18n.language === 'ar' ? 'ar-EG' : i18n.language === 'ku' ? 'ku-IQ' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    category: notification.type === 'APP_NOTIFICATION' 
      ? t('notifications.stats.system') 
      : t('ads.tableHeader'),
    status: 'unread' as const, // Default status since API doesn't provide it
    priority: 'medium' as const, // Default priority since API doesn't provide it
    recipient: t('notifications.stats.total') // Default recipient since API doesn't provide it
  }));
  
  // Form state for creating notifications
  const [notificationForm, setNotificationForm] = useState({
    titleAr: '',
    titleEn: '',
    titleKu: '',
    descriptionAr: '',
    descriptionEn: '',
    descriptionKu: '',
    type: 'APP_NOTIFICATION' as 'APP_NOTIFICATION' | 'APP_ADS',
    image: '',
    startDate: '',
    endDate: ''
  });

  // Handle form input changes
  const handleFormChange = (field: string, value: string) => {
    setNotificationForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleCreateNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const requestData: CreateNotificationRequest = {
      title: {
        ar: notificationForm.titleAr,
        en: notificationForm.titleEn,
        ku: notificationForm.titleKu
      },
      description: {
        ar: notificationForm.descriptionAr,
        en: notificationForm.descriptionEn,
        ku: notificationForm.descriptionKu
      },
      type: notificationForm.type
    };

    // Add optional fields
    if (notificationForm.image.trim()) {
      requestData.image = notificationForm.image;
    }
    
    if (notificationForm.type === 'APP_ADS') {
      if (notificationForm.startDate) {
        requestData.startDate = notificationForm.startDate;
      }
      if (notificationForm.endDate) {
        requestData.endDate = notificationForm.endDate;
      }
    }

    try {
      await createNewNotification(requestData);
      dispatch(showToast({ message: t('notifications.success.created'), type: "success" }));
      // Reset form
      setNotificationForm({
        titleAr: '',
        titleEn: '',
        titleKu: '',
        descriptionAr: '',
        descriptionEn: '',
        descriptionKu: '',
        type: 'APP_NOTIFICATION',
        image: '',
        startDate: '',
        endDate: ''
      });
      setActiveTab(t('notifications.allNotifications'));
      // Refresh notifications list
      dispatch(fetchNotifications({ 
        page: currentPage, 
        pageSize, 
        type: 'APP_NOTIFICATION' 
      }));
    } catch (error) {
      dispatch(showToast({ message: t('notifications.error.createFailed'), type: "error" }));
    }
  };

  // Fetch notifications when component mounts or page changes
  useEffect(() => {
    dispatch(fetchNotifications({ 
      page: currentPage, 
      pageSize, 
      type: 'APP_NOTIFICATION' 
    }));
  }, [dispatch, currentPage, pageSize]);

  // Clear errors when component unmounts or tab changes
  React.useEffect(() => {
    if (createError) {
      const timer = setTimeout(() => clearErrors(), 5000);
      return () => clearTimeout(timer);
    }
  }, [createError, clearErrors]);

  React.useEffect(() => {
    if (createSuccess) {
      const timer = setTimeout(() => clearSuccess(), 3000);
      return () => clearTimeout(timer);
    }
  }, [createSuccess, clearSuccess]);

  const tabs = [
    { name: t('notifications.allNotifications'), count: mappedNotifications.length },
    { name: t('notifications.limitedNotifications'), count: 2 },
    { name: t('notifications.addNew'), count: null }
  ];

  // Calculate stats for the stats component
  const notificationStats = {
    totalNotifications: mappedNotifications.length,
    unreadCount: mappedNotifications.filter(n => n.status === 'unread').length,
    highPriorityCount: mappedNotifications.filter(n => n.priority === 'medium').length, // Since all are medium priority
    systemNotifications: mappedNotifications.filter(n => n.type === 'system').length
  };

  const handleSelectNotification = (id: string) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(notifId => notifId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === mappedNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(mappedNotifications.map(notif => notif.id));
    }
  };

  const handleDeleteSelected = () => {
    console.log('Delete selected notifications:', selectedNotifications);
    setSelectedNotifications([]);
  };

  const handleMarkAsRead = (id: string) => {
    console.log('Mark as read:', id);
  };

  const handleEdit = (id: string) => {
    console.log('Edit notification:', id);
  };

  const handleView = (id: string) => {
    console.log('View notification:', id);
  };

  const filteredNotifications = mappedNotifications.filter(notification =>
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const renderNotificationsList = () => (
  //   <div className="space-y-4">
  //     {/* Search and Actions */}
  //     <div className="flex items-center justify-between mb-6">
  //       <div className="relative flex-1 max-w-md">
  //         <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
  //         <input
  //           type="text"
  //           placeholder="البحث في الإشعارات..."
  //           className="w-full bg-dark-400 border border-dark-200 rounded-lg pr-10 pl-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
  //           value={searchTerm}
  //           onChange={(e) => setSearchTerm(e.target.value)}
  //         />
  //       </div>
        
  //       <div className="flex items-center gap-3">
  //         <button
  //           onClick={handleSelectAll}
  //           className="px-4 py-2 bg-dark-200 hover:bg-dark-100 text-white rounded-lg text-sm transition-colors"
  //         >
  //           {selectedNotifications.length === notificationsData.length ? 'إلغاء تحديد الكل' : 'تحديد الكل'}
  //         </button>
          
  //         {selectedNotifications.length > 0 && (
  //           <button
  //             onClick={handleDeleteSelected}
  //             className="px-4 py-2 bg-error-600 hover:bg-error-700 text-white rounded-lg text-sm transition-colors flex items-center gap-2"
  //           >
  //             <Trash2 className="w-4 h-4" />
  //             حذف المحدد ({selectedNotifications.length})
  //           </button>
  //         )}
  //       </div>
  //     </div>

  //     {/* Notifications List */}
  //     <div className="space-y-4">
  //       {filteredNotifications.map((notification, index) => (
  //         <motion.div
  //           key={notification.id}
  //           initial={{ opacity: 0, y: 20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ delay: index * 0.1 }}
  //           className={`bg-dark-200 rounded-xl p-6 border-r-4 ${
  //             notification.status === 'unread' ? 'border-primary-500' : 'border-gray-600'
  //           } hover:bg-dark-100 transition-colors`}
  //         >
  //           <div className="flex items-start gap-4">
  //             {/* Checkbox */}
  //             <input
  //               type="checkbox"
  //               checked={selectedNotifications.includes(notification.id)}
  //               onChange={() => handleSelectNotification(notification.id)}
  //               className="w-4 h-4 text-primary-600 bg-dark-400 border-dark-300 rounded focus:ring-primary-500 mt-1"
  //             />

  //             {/* Notification Icon */}
  //             <div className="flex-shrink-0 mt-1">
  //               {getNotificationIcon(notification.type)}
  //             </div>

  //             {/* Content */}
  //             <div className="flex-1 min-w-0">
  //               <div className="flex items-start justify-between mb-2">
  //                 <div className="flex items-center gap-3">
  //                   <h3 className={`font-semibold ${notification.status === 'unread' ? 'text-white' : 'text-gray-300'}`}>
  //                     {notification.title}
  //                   </h3>
  //                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
  //                     {notification.priority === 'high' ? 'عالي' : notification.priority === 'medium' ? 'متوسط' : 'منخفض'}
  //                   </span>
  //                 </div>
                  
  //                 <div className="flex items-center gap-2 text-sm text-gray-400">
  //                   <Calendar className="w-4 h-4" />
  //                   <span>{notification.date}</span>
  //                 </div>
  //               </div>

  //               <p className="text-gray-400 text-sm mb-3 leading-relaxed">
  //                 {notification.content}
  //               </p>

  //               <div className="flex items-center justify-between">
  //                 <div className="flex items-center gap-4 text-sm">
  //                   <span className={`flex items-center gap-1 ${getTypeColor(notification.type)}`}>
  //                     <span className="w-2 h-2 rounded-full bg-current"></span>
  //                     {notification.category}
  //                   </span>
  //                   <span className="flex items-center gap-1 text-gray-400">
  //                     <User className="w-4 h-4" />
  //                     {notification.recipient}
  //                   </span>
  //                 </div>

  //                 <div className="flex items-center gap-2">
  //                   <button
  //                     onClick={() => handleView(notification.id)}
  //                     className="p-2 text-gray-400 hover:text-white hover:bg-dark-300 rounded-lg transition-colors"
  //                     title="عرض"
  //                   >
  //                     <Eye className="w-4 h-4" />
  //                   </button>
  //                   <button
  //                     onClick={() => handleEdit(notification.id)}
  //                     className="p-2 text-blue-400 hover:text-blue-300 hover:bg-dark-300 rounded-lg transition-colors"
  //                     title="تعديل"
  //                   >
  //                     <Edit className="w-4 h-4" />
  //                   </button>
  //                   {notification.status === 'unread' && (
  //                     <button
  //                       onClick={() => handleMarkAsRead(notification.id)}
  //                       className="p-2 text-green-400 hover:text-green-300 hover:bg-dark-300 rounded-lg transition-colors"
  //                       title="تحديد كمقروء"
  //                     >
  //                       <CheckCircle className="w-4 h-4" />
  //                     </button>
  //                   )}
  //                   <button
  //                     onClick={() => console.log('Delete', notification.id)}
  //                     className="p-2 text-error-400 hover:text-error-300 hover:bg-dark-300 rounded-lg transition-colors"
  //                     title="حذف"
  //                   >
  //                     <Trash2 className="w-4 h-4" />
  //                   </button>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </motion.div>
  //       ))}
  //     </div>

  //     {filteredNotifications.length === 0 && (
  //       <div className="text-center py-12">
  //         <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
  //         <h3 className="text-lg font-medium text-gray-400 mb-2">لا توجد إشعارات</h3>
  //         <p className="text-gray-500">لم يتم العثور على إشعارات تطابق البحث</p>
  const handleResetForm = () => {
    setNotificationForm({
      titleAr: '',
      titleEn: '',
      titleKu: '',
      descriptionAr: '',
      descriptionEn: '',
      descriptionKu: '',
      type: 'APP_NOTIFICATION',
      image: '',
      startDate: '',
      endDate: ''
    });
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t('notifications.title')}</h1>
          <p className="text-gray-400 mt-1">{t('notifications.subtitle')}</p>
        </div>
        <button
          onClick={() => dispatch(fetchNotifications({ 
            page: currentPage, 
            pageSize, 
            type: 'APP_NOTIFICATION' 
          }))}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          )}
          {t('notifications.refreshButton')}
        </button>
      </div>

      <div className="bg-dark-300 rounded-xl p-6">
        {/* Statistics */}
        <NotificationStats {...notificationStats} />
        
        {/* Tabs */}
        <NotificationTabs 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Content */}
        {(activeTab === t('notifications.allNotifications') || 
          activeTab === t('notifications.limitedNotifications')) && (
          <>
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-gray-400 mt-2">{t('notifications.loading')}</p>
              </div>
            )}
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
                <p className="text-red-400">{t('notifications.error')}: {error}</p>
              </div>
            )}
            
            {!loading && !error && (
              <NotificationsList
                notifications={filteredNotifications}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedNotifications={selectedNotifications}
                onSelectNotification={handleSelectNotification}
                onSelectAll={handleSelectAll}
                onDeleteSelected={handleDeleteSelected}
                onMarkAsRead={handleMarkAsRead}
                onEdit={handleEdit}
                onView={handleView}
                onDelete={(id) => console.log('Delete', id)}
              />
            )}
          </>
        )}
        
        {activeTab === t('notifications.addNew') && (
          <AddNotificationForm
            formData={notificationForm}
            onFormChange={handleFormChange}
            onSubmit={handleCreateNotification}
            onReset={handleResetForm}
            loading={createLoading}
            error={createError}
          />
        )}
      </div>
    </div>
  );
};

export default Notifications;