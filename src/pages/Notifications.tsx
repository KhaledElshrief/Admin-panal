import React, { useState } from 'react';
import { Search, Bell, Trash2, Edit, Eye, Calendar, User, AlertCircle, CheckCircle, Clock, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'system' | 'warning' | 'info';
  date: string;
  category: string;
  status: 'read' | 'unread';
  priority: 'high' | 'medium' | 'low';
  recipient: string;
}

const notificationsData: Notification[] = [
  {
    id: '1',
    title: 'تحديث هام في النظام',
    content: 'تم تحديث نظام المدارس إلى الإصدار 2.5 والذي يتضمن تحسينات في أداء النظام وإصلاح المشكلات السابقة.',
    type: 'system',
    date: '8 أبريل 2025',
    category: 'النظام',
    status: 'unread',
    priority: 'high',
    recipient: 'جميع المستخدمين'
  },
  {
    id: '2',
    title: 'تنبيه أمان',
    content: 'يرجى تغيير كلمة المرور الخاصة بك للحفاظ على أمان حسابك. يجب أن تتضمن كلمة المرور حروفاً وأرقاماً ورموزاً.',
    type: 'warning',
    date: '7 أبريل 2025',
    category: 'تحذير',
    status: 'read',
    priority: 'medium',
    recipient: 'المدراء'
  },
  {
    id: '3',
    title: 'إشعار النسخة التجريبية',
    content: 'تم إطلاق النسخة التجريبية من تطبيق الهاتف المحمول. يمكنكم تجربته وإرسال ملاحظاتكم إلينا لتحسين التجربة.',
    type: 'info',
    date: '6 أبريل 2025',
    category: 'معلومات',
    status: 'unread',
    priority: 'low',
    recipient: 'المطورين'
  }
];

const Notifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState('كل الإشعارات');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

  const tabs = [
    { name: 'كل الإشعارات', count: notificationsData.length },
    { name: 'الإشعارات المحدودة', count: 2 },
    { name: 'إضافة إشعار', count: null }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'system':
        return <Settings className="w-5 h-5 text-blue-400" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'info':
        return <Bell className="w-5 h-5 text-green-400" />;
      default:
        return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'system':
        return 'text-blue-400';
      case 'warning':
        return 'text-yellow-400';
      case 'info':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-600/20 text-red-400';
      case 'medium':
        return 'bg-yellow-600/20 text-yellow-400';
      case 'low':
        return 'bg-green-600/20 text-green-400';
      default:
        return 'bg-gray-600/20 text-gray-400';
    }
  };

  const handleSelectNotification = (id: string) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(notifId => notifId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === notificationsData.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(notificationsData.map(notif => notif.id));
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

  const filteredNotifications = notificationsData.filter(notification =>
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderNotificationsList = () => (
    <div className="space-y-4">
      {/* Search and Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="البحث في الإشعارات..."
            className="w-full bg-dark-400 border border-dark-200 rounded-lg pr-10 pl-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleSelectAll}
            className="px-4 py-2 bg-dark-200 hover:bg-dark-100 text-white rounded-lg text-sm transition-colors"
          >
            {selectedNotifications.length === notificationsData.length ? 'إلغاء تحديد الكل' : 'تحديد الكل'}
          </button>
          
          {selectedNotifications.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="px-4 py-2 bg-error-600 hover:bg-error-700 text-white rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              حذف المحدد ({selectedNotifications.length})
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-dark-200 rounded-xl p-6 border-r-4 ${
              notification.status === 'unread' ? 'border-primary-500' : 'border-gray-600'
            } hover:bg-dark-100 transition-colors`}
          >
            <div className="flex items-start gap-4">
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={selectedNotifications.includes(notification.id)}
                onChange={() => handleSelectNotification(notification.id)}
                className="w-4 h-4 text-primary-600 bg-dark-400 border-dark-300 rounded focus:ring-primary-500 mt-1"
              />

              {/* Notification Icon */}
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(notification.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className={`font-semibold ${notification.status === 'unread' ? 'text-white' : 'text-gray-300'}`}>
                      {notification.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                      {notification.priority === 'high' ? 'عالي' : notification.priority === 'medium' ? 'متوسط' : 'منخفض'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{notification.date}</span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                  {notification.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`flex items-center gap-1 ${getTypeColor(notification.type)}`}>
                      <span className="w-2 h-2 rounded-full bg-current"></span>
                      {notification.category}
                    </span>
                    <span className="flex items-center gap-1 text-gray-400">
                      <User className="w-4 h-4" />
                      {notification.recipient}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleView(notification.id)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-dark-300 rounded-lg transition-colors"
                      title="عرض"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(notification.id)}
                      className="p-2 text-blue-400 hover:text-blue-300 hover:bg-dark-300 rounded-lg transition-colors"
                      title="تعديل"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    {notification.status === 'unread' && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="p-2 text-green-400 hover:text-green-300 hover:bg-dark-300 rounded-lg transition-colors"
                        title="تحديد كمقروء"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => console.log('Delete', notification.id)}
                      className="p-2 text-error-400 hover:text-error-300 hover:bg-dark-300 rounded-lg transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-400 mb-2">لا توجد إشعارات</h3>
          <p className="text-gray-500">لم يتم العثور على إشعارات تطابق البحث</p>
        </div>
      )}
    </div>
  );

  const renderAddNotification = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-dark-200 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6">إضافة إشعار جديد</h2>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              عنوان الإشعار
            </label>
            <input
              type="text"
              className="w-full bg-dark-400 border border-dark-300 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="أدخل عنوان الإشعار"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              محتوى الإشعار
            </label>
            <textarea
              rows={4}
              className="w-full bg-dark-400 border border-dark-300 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent resize-none"
              placeholder="أدخل محتوى الإشعار"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                نوع الإشعار
              </label>
              <select className="w-full bg-dark-400 border border-dark-300 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent">
                <option value="info">معلومات</option>
                <option value="warning">تحذير</option>
                <option value="system">النظام</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                الأولوية
              </label>
              <select className="w-full bg-dark-400 border border-dark-300 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent">
                <option value="low">منخفض</option>
                <option value="medium">متوسط</option>
                <option value="high">عالي</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              المستلمون
            </label>
            <select className="w-full bg-dark-400 border border-dark-300 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent">
              <option value="all">جميع المستخدمين</option>
              <option value="managers">المدراء</option>
              <option value="teachers">المعلمين</option>
              <option value="students">الطلاب</option>
              <option value="parents">أولياء الأمور</option>
            </select>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              إرسال الإشعار
            </button>
            <button
              type="button"
              className="bg-dark-400 hover:bg-dark-300 text-white px-6 py-2 rounded-lg transition-colors"
            >
              حفظ كمسودة
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">إدارة الإشعارات</h1>
          <p className="text-gray-400 mt-1">إدارة وإرسال الإشعارات للمستخدمين</p>
        </div>
      </div>

      <div className="bg-dark-300 rounded-xl p-6">
        {/* Tabs */}
        <div className="flex items-center gap-4 mb-6 border-b border-dark-200 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.name
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-200 text-gray-300 hover:bg-dark-100'
              }`}
            >
              <span>{tab.name}</span>
              {tab.count !== null && (
                <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'كل الإشعارات' && renderNotificationsList()}
        {activeTab === 'الإشعارات المحدودة' && renderNotificationsList()}
        {activeTab === 'إضافة إشعار' && renderAddNotification()}
      </div>
    </div>
  );
};

export default Notifications;