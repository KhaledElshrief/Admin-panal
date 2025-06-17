import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { motion } from 'framer-motion';

interface SettingToggle {
  id: string;
  label: string;
  enabled: boolean;
}

const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('العامة');
  const [generalSettings, setGeneralSettings] = useState<SettingToggle[]>([
    { id: 'search_trips', label: 'البحث عن الرحلات', enabled: true },
    { id: 'incomplete_groups', label: 'إنشاء المجموعات غير المكتملة', enabled: true },
    { id: 'notifications', label: 'الإشعارات', enabled: true },
    { id: 'ads', label: 'الإعلانات', enabled: true },
    { id: 'delay_notifications', label: 'تنبيهات التأخير', enabled: true },
    { id: 'absence_requests', label: 'طلبات الغياب', enabled: true }
  ]);

  const [paymentSettings, setPaymentSettings] = useState<SettingToggle[]>([
    { id: 'electronic_payment', label: 'الدفع الإلكتروني', enabled: true },
    { id: 'bank_transfer', label: 'التحويل البنكي', enabled: true },
    { id: 'refund', label: 'الاسترداد', enabled: true },
    { id: 'commissions', label: 'العمولات', enabled: false },
    { id: 'advanced_payment', label: 'الدفع المتأخر', enabled: true }
  ]);

  const [securitySettings, setSecuritySettings] = useState<SettingToggle[]>([
    { id: 'two_factor_auth', label: 'المصادقة الثنائية (2FA)', enabled: true },
    { id: 'password_policy', label: 'سياسة كلمات المرور', enabled: true },
    { id: 'login_log', label: 'سجل التدقيق', enabled: false },
    { id: 'breach_alerts', label: 'تنبيهات الاختراق', enabled: true }
  ]);

  const [backupSettings, setBackupSettings] = useState<SettingToggle[]>([
    { id: 'auto_backup', label: 'النسخ الاحتياطي التلقائي', enabled: true },
    { id: 'manual_restore', label: 'الاستعادة اليدوية', enabled: true }
  ]);

  const [backupFrequency, setBackupFrequency] = useState('يومي');

  const tabs = [
    'العامة',
    'المدفوعات',
    'الأمان',
    'النسخ الاحتياطي'
  ];

  const handleGeneralToggle = (id: string) => {
    setGeneralSettings(prev => 
      prev.map(setting => 
        setting.id === id 
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const handlePaymentToggle = (id: string) => {
    setPaymentSettings(prev => 
      prev.map(setting => 
        setting.id === id 
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const handleSecurityToggle = (id: string) => {
    setSecuritySettings(prev => 
      prev.map(setting => 
        setting.id === id 
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const handleBackupToggle = (id: string) => {
    setBackupSettings(prev => 
      prev.map(setting => 
        setting.id === id 
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const handleSaveSettings = () => {
    console.log('Saving general settings:', generalSettings);
    console.log('Saving payment settings:', paymentSettings);
    console.log('Saving security settings:', securitySettings);
    console.log('Saving backup settings:', backupSettings);
    console.log('Backup frequency:', backupFrequency);
    // Handle save logic here
  };

  const renderToggleSettings = (settings: SettingToggle[], handleToggle: (id: string) => void) => (
    <div className="space-y-6">
      <div className="grid gap-6">
        {settings.map((setting, index) => (
          <motion.div
            key={setting.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between py-4 border-b border-dark-200 last:border-b-0"
          >
            <div className="flex-1">
              <label 
                htmlFor={setting.id}
                className="text-lg font-medium text-white cursor-pointer"
              >
                {setting.label}
              </label>
            </div>
            
            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id={setting.id}
                  checked={setting.enabled}
                  onChange={() => handleToggle(setting.id)}
                  className="sr-only peer"
                />
                <div className={`
                  relative w-14 h-7 rounded-full transition-colors duration-200 ease-in-out
                  ${setting.enabled 
                    ? 'bg-primary-600' 
                    : 'bg-gray-600'
                  }
                  peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300/20
                `}>
                  <div className={`
                    absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in-out
                    ${setting.enabled 
                      ? 'translate-x-7 rtl:-translate-x-7' 
                      : 'translate-x-0.5 rtl:-translate-x-0.5'
                    }
                  `}></div>
                </div>
              </label>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Save Button */}
      <div className="pt-6 border-t border-dark-200">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSaveSettings}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Save className="w-5 h-5" />
          حفظ التعديلات
        </motion.button>
      </div>
    </div>
  );

  const renderGeneralSettings = () => renderToggleSettings(generalSettings, handleGeneralToggle);

  const renderPaymentSettings = () => renderToggleSettings(paymentSettings, handlePaymentToggle);

  const renderSecuritySettings = () => renderToggleSettings(securitySettings, handleSecurityToggle);

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <div className="grid gap-6">
        {backupSettings.map((setting, index) => (
          <motion.div
            key={setting.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between py-4 border-b border-dark-200 last:border-b-0"
          >
            <div className="flex-1">
              <label 
                htmlFor={setting.id}
                className="text-lg font-medium text-white cursor-pointer"
              >
                {setting.label}
              </label>
            </div>
            
            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id={setting.id}
                  checked={setting.enabled}
                  onChange={() => handleBackupToggle(setting.id)}
                  className="sr-only peer"
                />
                <div className={`
                  relative w-14 h-7 rounded-full transition-colors duration-200 ease-in-out
                  ${setting.enabled 
                    ? 'bg-primary-600' 
                    : 'bg-gray-600'
                  }
                  peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300/20
                `}>
                  <div className={`
                    absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in-out
                    ${setting.enabled 
                      ? 'translate-x-7 rtl:-translate-x-7' 
                      : 'translate-x-0.5 rtl:-translate-x-0.5'
                    }
                  `}></div>
                </div>
              </label>
            </div>
          </motion.div>
        ))}

        {/* Backup Frequency Dropdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="py-4"
        >
          <div className="flex items-center justify-between">
            <label className="text-lg font-medium text-white">
              تردد النسخ الاحتياطي
            </label>
            <div className="flex items-center">
              <select
                value={backupFrequency}
                onChange={(e) => setBackupFrequency(e.target.value)}
                className="bg-dark-400 border border-dark-200 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent min-w-[120px]"
              >
                <option value="يومي">يومي</option>
                <option value="أسبوعي">أسبوعي</option>
                <option value="شهري">شهري</option>
              </select>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Save Button */}
      <div className="pt-6 border-t border-dark-200">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSaveSettings}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Save className="w-5 h-5" />
          حفظ التعديلات
        </motion.button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'العامة':
        return renderGeneralSettings();
      case 'المدفوعات':
        return renderPaymentSettings();
      case 'الأمان':
        return renderSecuritySettings();
      case 'النسخ الاحتياطي':
        return renderBackupSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">إعدادات النظام</h1>
          <p className="text-gray-400 mt-1">إدارة إعدادات النظام والتحكم في الميزات</p>
        </div>
      </div>

      <div className="bg-dark-300 rounded-xl overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-dark-200">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  flex-1 px-6 py-4 text-center font-medium transition-colors
                  ${activeTab === tab
                    ? 'bg-dark-200 text-white border-b-2 border-primary-600'
                    : 'text-gray-400 hover:text-white hover:bg-dark-200/50'
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

export default SystemSettings;