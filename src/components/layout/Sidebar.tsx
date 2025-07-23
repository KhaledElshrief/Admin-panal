import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  School,
  Users,
  UserSquare,
  CreditCard,
  FileText,
  Settings,
  Bell,
  Home,
  UserCog,
  FileEdit,
  ShieldCheck,
  Cog,
  MapPin,
  Globe
} from 'lucide-react';

const navItems = [
  { name: 'لوحة القيادة', path: '/', icon: <LayoutDashboard className="w-5 h-5" />, isNew: false },
  { name: 'الرئيسية', path: '/home', icon: <Home className="w-5 h-5" />, isNew: false },
  { name: 'إدارة الوكلاء والمندوبين', path: '/agents', icon: <UserSquare className="w-5 h-5" />, isNew: true },
  { name: 'إدارة المدارس', path: '/schools', icon: <School className="w-5 h-5" />, isNew: false },
  { name: 'المدرسة', path: '/school', icon: <School className="w-5 h-5" />, isNew: false },
  { name: 'المدينة', path: '/city', icon: <MapPin className="w-5 h-5" />, isNew: false },
  { name: 'الدولة', path: '/country', icon: <Globe className="w-5 h-5" />, isNew: false },
  { name: 'السائقون', path: '/drivers', icon: <Users className="w-5 h-5" />, isNew: true },
  { name: 'ادارة المجموعات', path: '/groups', icon: <MapPin className="w-5 h-5" />, isNew: true },
  { name: 'ادارة الرحلات', path: '/trips', icon: <MapPin className="w-5 h-5" />, isNew: true },
  { name: 'إدارة المستخدمين', path: '/users', icon: <UserCog className="w-5 h-5" />, isNew: false },
  {name: ' خطط الاشتراكات', path: '/plans', icon: <CreditCard className="w-5 h-5" />, isNew: true },
  { name: 'إدارة الاشتراكات', path: '/subscriptions', icon: <CreditCard className="w-5 h-5" />, isNew: true },
  { name: 'الإشعارات', path: '/notifications', icon: <Bell className="w-5 h-5" />, isNew: true },
  { name: 'إدارة المحتوى', path: '/content', icon: <FileEdit className="w-5 h-5" />, isNew: true },
  { name: 'إدارة الإعلانات', path: '/ads', icon: <FileText className="w-5 h-5" />, isNew: true },
  { name: 'الأدوار والصلاحيات', path: '/roles', icon: <ShieldCheck className="w-5 h-5" />, isNew: true },
  { name: 'إعدادات النظام', path: '/system-settings', icon: <Cog className="w-5 h-5" />, isNew: true },
];

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`bg-dark-300 h-full transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-16'
      } relative`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="p-4">
        <div className={`flex items-center justify-center mb-8 ${isExpanded ? 'px-2' : 'px-0'}`}>
          {isExpanded ? (
            <h1 className="text-lg font-bold text-white">منصة المدارس الذكية</h1>
          ) : (
            <School className="w-6 h-6 text-white" />
          )}
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                relative flex items-center px-3 py-2.5 rounded-lg gap-3
                transition-all duration-200 ease-in-out
                ${isActive ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-dark-200'}
                ${!isExpanded && 'justify-center'}
              `}
            >
              {item.icon}
              <span className={`whitespace-nowrap transition-all duration-200 ${
                isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
              }`}>
                {item.name}
              </span>
              {item.isNew && isExpanded && (
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-success-400">
                  جديد
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;