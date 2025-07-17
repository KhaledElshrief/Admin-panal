import React, { useState, useEffect } from 'react';
import { CreditCard, DollarSign, BarChart3, Settings } from 'lucide-react';
import {
  OverviewTab,
  SubscriptionsTab,
  CommissionsTab,
  PaymentsTab,
  SettingsTab
} from '../components/subscriptions';
import { useAppDispatch } from '../hooks/redux';
import { fetchUserSubscriptionsDashboard, fetchUserSubscriptionsStats } from '../store/slices/subscriptionSlice';

const Subscriptions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('نظرة عامة');

  const dispatch = useAppDispatch();
  // REMOVE: useAppSelector destructuring for subscription state

  useEffect(() => {
    dispatch(fetchUserSubscriptionsDashboard({ page: 1, pageSize: 20 }));
    dispatch(fetchUserSubscriptionsStats());
  }, [dispatch]);

  const tabs = [
    { name: 'نظرة عامة', icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'الاشتراكات', icon: <CreditCard className="w-4 h-4" /> },
    { name: 'العمولات', icon: <DollarSign className="w-4 h-4" /> },
    { name: 'المدفوعات', icon: <Settings className="w-4 h-4" /> },
    { name: 'الإعدادات', icon: <Settings className="w-4 h-4" /> }
  ];

  const renderOverview = () => (
    <OverviewTab />
  );

  const renderSubscriptions = () => (
    <SubscriptionsTab />
  );

  const renderCommissions = () => (
    <CommissionsTab />
  );

  const renderPayments = () => (
    <PaymentsTab />
  );

  const renderSettings = () => (
    <SettingsTab />
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'نظرة عامة':
        return renderOverview();
      case 'الاشتراكات':
        return renderSubscriptions();
      case 'العمولات':
        return renderCommissions();
      case 'المدفوعات':
        return renderPayments();
      case 'الإعدادات':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-primary-500" />
            إدارة الاشتراكات
          </h1>
          <p className="text-gray-400 mt-1">إدارة جميع اشتراكات المدارس والمستخدمين في النظام</p>
        </div>
      </div>

      <div className="bg-dark-300 rounded-xl overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-dark-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`
                  flex items-center gap-2 px-6 py-4 whitespace-nowrap font-medium transition-colors border-b-2
                  ${activeTab === tab.name
                    ? 'bg-dark-200 text-white border-primary-600'
                    : 'text-gray-400 hover:text-white hover:bg-dark-200/50 border-transparent'
                  }
                `}
              >
                {tab.icon}
                <span>{tab.name}</span>
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

export default Subscriptions;