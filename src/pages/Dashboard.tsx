import React, { useState } from 'react';
import { Users, School, CreditCard, Award } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import RevenueChart from '../components/dashboard/RevenueChart';
import QuickAccess from '../components/dashboard/QuickAccess';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('شهري');

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold">لوحة تحكم المشرف العام</h1>
          <p className="text-gray-400 mt-1">عرض شامل لنشاط النظام والإحصائيات</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors">
            تحديث
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="المستخدمين"
          value="28,945"
          icon={<Users className="h-5 w-5 text-white" />}
          percentageChange={8}
          color="primary"
        />
        <StatsCard
          title="المدارس"
          value="3,482"
          icon={<School className="h-5 w-5 text-white" />}
          percentageChange={5}
          color="secondary"
        />
        <StatsCard
          title="الاشتراكات النشطة"
          value="18,659"
          icon={<CreditCard className="h-5 w-5 text-white" />}
          percentageChange={-3}
          color="accent"
        />
        <StatsCard
          title="الوكلاء"
          value="156"
          icon={<Award className="h-5 w-5 text-white" />}
          percentageChange={12}
          color="success"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <RevenueChart activeTab={activeTab} />
        <QuickAccess />
      </div>
    </div>
  );
};

export default Dashboard;