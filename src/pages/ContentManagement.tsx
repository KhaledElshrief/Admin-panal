import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Image, 
  FileText, 
  Video, 
  Download,
  Upload,
  Filter,
  Calendar,
  User,
  Tag,
  Globe,
  Settings,
  Save,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import Table, { TableColumn } from '../components/ui/Table';
import StatusBadge from '../components/ui/StatusBadge';

interface ContentItem {
  id: string;
  title: string;
  type: 'article' | 'image' | 'video' | 'document';
  author: string;
  category: string;
  status: 'published' | 'draft' | 'archived';
  createdDate: string;
  lastModified: string;
  views: number;
  language: string;
}

const contentData: ContentItem[] = [
  {
    id: 'CNT-001',
    title: 'دليل استخدام النظام للمدارس',
    type: 'document',
    author: 'أحمد محمد',
    category: 'التعليمات',
    status: 'published',
    createdDate: '2025-01-15',
    lastModified: '2025-01-20',
    views: 1250,
    language: 'العربية'
  },
  {
    id: 'CNT-002',
    title: 'فيديو تعريفي بالمنصة',
    type: 'video',
    author: 'سارة أحمد',
    category: 'الوسائط',
    status: 'published',
    createdDate: '2025-01-10',
    lastModified: '2025-01-18',
    views: 2100,
    language: 'العربية'
  },
  {
    id: 'CNT-003',
    title: 'صور واجهة النظام',
    type: 'image',
    author: 'محمد علي',
    category: 'الوسائط',
    status: 'draft',
    createdDate: '2025-01-12',
    lastModified: '2025-01-19',
    views: 890,
    language: 'العربية'
  },
  {
    id: 'CNT-004',
    title: 'مقال حول أهمية التعليم الرقمي',
    type: 'article',
    author: 'فاطمة حسن',
    category: 'المقالات',
    status: 'published',
    createdDate: '2025-01-08',
    lastModified: '2025-01-16',
    views: 3200,
    language: 'العربية'
  },
  {
    id: 'CNT-005',
    title: 'تقرير الأداء الشهري',
    type: 'document',
    author: 'خالد يوسف',
    category: 'التقارير',
    status: 'archived',
    createdDate: '2025-01-05',
    lastModified: '2025-01-14',
    views: 567,
    language: 'العربية'
  }
];

const ContentManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('إدارة المحتوى');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');
  const [typeFilter, setTypeFilter] = useState('الكل');
  const [categoryFilter, setCategoryFilter] = useState('الكل');

  const tabs = [
    'إدارة المحتوى',
    'المكتبة الرقمية',
    'الوسائط المتعددة',
    'النماذج والقوالب',
    'إعدادات المحتوى'
  ];

  const handleView = (id: string) => {
    console.log('View content:', id);
  };

  const handleEdit = (id: string) => {
    console.log('Edit content:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete content:', id);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="w-4 h-4 text-blue-400" />;
      case 'image':
        return <Image className="w-4 h-4 text-green-400" />;
      case 'video':
        return <Video className="w-4 h-4 text-purple-400" />;
      case 'document':
        return <FileText className="w-4 h-4 text-orange-400" />;
      default:
        return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'article':
        return 'مقال';
      case 'image':
        return 'صورة';
      case 'video':
        return 'فيديو';
      case 'document':
        return 'مستند';
      default:
        return type;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'draft':
        return 'warning';
      case 'archived':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'منشور';
      case 'draft':
        return 'مسودة';
      case 'archived':
        return 'مؤرشف';
      default:
        return status;
    }
  };

  const columns: TableColumn<ContentItem>[] = [
    {
      key: 'title',
      title: 'العنوان',
      sortable: true,
      render: (value, record) => (
        <div className="flex items-center gap-3">
          {getTypeIcon(record.type)}
          <div>
            <div className="font-medium text-white">{value}</div>
            <div className="text-sm text-gray-400">{getTypeText(record.type)}</div>
          </div>
        </div>
      )
    },
    {
      key: 'author',
      title: 'المؤلف',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-gray-300">{value}</span>
        </div>
      )
    },
    {
      key: 'category',
      title: 'الفئة',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-gray-400" />
          <span className="text-gray-300">{value}</span>
        </div>
      )
    },
    {
      key: 'status',
      title: 'الحالة',
      sortable: true,
      render: (value) => (
        <StatusBadge 
          status={getStatusText(value)} 
          variant={getStatusVariant(value) as any}
        />
      )
    },
    {
      key: 'views',
      title: 'المشاهدات',
      sortable: true,
      render: (value) => (
        <span className="font-medium text-blue-400">{value.toLocaleString()}</span>
      )
    },
    {
      key: 'lastModified',
      title: 'آخر تعديل',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400 text-sm">{value}</span>
        </div>
      )
    },
    {
      key: 'language',
      title: 'اللغة',
      render: (value) => (
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-gray-400" />
          <span className="text-gray-300 text-sm">{value}</span>
        </div>
      )
    },
    {
      key: 'actions',
      title: 'الإجراءات',
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleView(record.id)}
            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-600/20 rounded-lg transition-colors"
            title="عرض"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleEdit(record.id)}
            className="p-2 text-green-400 hover:text-green-300 hover:bg-green-600/20 rounded-lg transition-colors"
            title="تعديل"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(record.id)}
            className="p-2 text-error-400 hover:text-error-300 hover:bg-error-600/20 rounded-lg transition-colors"
            title="حذف"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const filteredContent = contentData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'الكل' || 
                         (statusFilter === 'منشور' && item.status === 'published') ||
                         (statusFilter === 'مسودة' && item.status === 'draft') ||
                         (statusFilter === 'مؤرشف' && item.status === 'archived');

    const matchesType = typeFilter === 'الكل' ||
                       (typeFilter === 'مقال' && item.type === 'article') ||
                       (typeFilter === 'صورة' && item.type === 'image') ||
                       (typeFilter === 'فيديو' && item.type === 'video') ||
                       (typeFilter === 'مستند' && item.type === 'document');

    const matchesCategory = categoryFilter === 'الكل' || item.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesType && matchesCategory;
  });

  const renderContentManagement = () => (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">إدارة المحتوى</h2>
        <div className="flex items-center gap-3">
          <button className="bg-success-600 hover:bg-success-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Upload className="w-4 h-4" />
            رفع ملف
          </button>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            إضافة محتوى
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-dark-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">{contentData.length}</div>
              <div className="text-sm text-gray-400">إجمالي المحتوى</div>
            </div>
            <FileText className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-dark-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">
                {contentData.filter(item => item.status === 'published').length}
              </div>
              <div className="text-sm text-gray-400">منشور</div>
            </div>
            <Eye className="w-8 h-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-dark-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">
                {contentData.filter(item => item.status === 'draft').length}
              </div>
              <div className="text-sm text-gray-400">مسودة</div>
            </div>
            <Edit className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        
        <div className="bg-dark-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">
                {contentData.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">إجمالي المشاهدات</div>
            </div>
            <Eye className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative max-w-md">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="البحث في المحتوى..."
            className="w-full bg-dark-400 border border-dark-200 rounded-lg pr-10 pl-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">النوع</span>
          <select
            className="bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent min-w-[120px]"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="الكل">الكل</option>
            <option value="مقال">مقال</option>
            <option value="صورة">صورة</option>
            <option value="فيديو">فيديو</option>
            <option value="مستند">مستند</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">الحالة</span>
          <select
            className="bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent min-w-[120px]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="الكل">الكل</option>
            <option value="منشور">منشور</option>
            <option value="مسودة">مسودة</option>
            <option value="مؤرشف">مؤرشف</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">الفئة</span>
          <select
            className="bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent min-w-[120px]"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="الكل">الكل</option>
            <option value="التعليمات">التعليمات</option>
            <option value="الوسائط">الوسائط</option>
            <option value="المقالات">المقالات</option>
            <option value="التقارير">التقارير</option>
          </select>
        </div>

        <button className="bg-dark-200 hover:bg-dark-100 text-white px-4 py-2 rounded-lg transition-colors">
          إعادة تعيين
        </button>
      </div>

      {/* Content Table */}
      <Table
        columns={columns}
        data={filteredContent}
        rowKey="id"
        hoverable={true}
        emptyText="لا يوجد محتوى"
      />

      {/* Results Summary */}
      <div className="flex items-center justify-between pt-4 border-t border-dark-200">
        <div className="text-sm text-gray-400">
          عرض {filteredContent.length} من أصل {contentData.length} عنصر
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

  const renderDigitalLibrary = () => (
    <div className="space-y-6">
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-400 mb-2">المكتبة الرقمية</h3>
        <p className="text-gray-500">إدارة الكتب والمراجع الرقمية</p>
      </div>
    </div>
  );

  const renderMultimedia = () => (
    <div className="space-y-6">
      <div className="text-center py-12">
        <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-400 mb-2">الوسائط المتعددة</h3>
        <p className="text-gray-500">إدارة الصور والفيديوهات والملفات الصوتية</p>
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-400 mb-2">النماذج والقوالب</h3>
        <p className="text-gray-500">إدارة النماذج والقوالب الجاهزة</p>
      </div>
    </div>
  );

  const renderContentSettings = () => (
    <div className="space-y-6">
      <div className="bg-dark-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-6">إعدادات المحتوى</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              اللغة الافتراضية للمحتوى
            </label>
            <select className="w-full bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600">
              <option value="ar">العربية</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              حد رفع الملفات (MB)
            </label>
            <input
              type="number"
              value="50"
              className="w-full bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-dark-300">
            <div>
              <span className="text-white font-medium">السماح برفع الصور</span>
              <div className="text-sm text-gray-400">السماح للمستخدمين برفع الصور</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-600 peer-checked:bg-primary-600 rounded-full transition-colors">
                <div className="absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5 rtl:peer-checked:-translate-x-5 translate-x-0.5 rtl:-translate-x-0.5"></div>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-dark-300">
            <div>
              <span className="text-white font-medium">السماح برفع الفيديوهات</span>
              <div className="text-sm text-gray-400">السماح للمستخدمين برفع الفيديوهات</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-600 peer-checked:bg-primary-600 rounded-full transition-colors">
                <div className="absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5 rtl:peer-checked:-translate-x-5 translate-x-0.5 rtl:-translate-x-0.5"></div>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <span className="text-white font-medium">المراجعة التلقائية</span>
              <div className="text-sm text-gray-400">مراجعة المحتوى تلقائياً قبل النشر</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-600 peer-checked:bg-primary-600 rounded-full transition-colors">
                <div className="absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5 rtl:peer-checked:-translate-x-5 translate-x-0.5 rtl:-translate-x-0.5"></div>
              </div>
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-dark-300 mt-6">
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
            <Save className="w-5 h-5" />
            حفظ الإعدادات
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'إدارة المحتوى':
        return renderContentManagement();
      case 'المكتبة الرقمية':
        return renderDigitalLibrary();
      case 'الوسائط المتعددة':
        return renderMultimedia();
      case 'النماذج والقوالب':
        return renderTemplates();
      case 'إعدادات المحتوى':
        return renderContentSettings();
      default:
        return renderContentManagement();
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">إدارة المحتوى</h1>
          <p className="text-gray-400 mt-1">إدارة وتنظيم جميع أنواع المحتوى في النظام</p>
        </div>
      </div>

      <div className="bg-dark-300 rounded-xl overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-dark-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-6 py-4 whitespace-nowrap font-medium transition-colors border-b-2
                  ${activeTab === tab
                    ? 'bg-dark-200 text-white border-primary-600'
                    : 'text-gray-400 hover:text-white hover:bg-dark-200/50 border-transparent'
                  }
                `}
              >
                {tab}
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

export default ContentManagement;