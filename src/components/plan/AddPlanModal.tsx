import React from 'react';
import { X } from 'lucide-react';

interface AddPlanModalProps {
  show: boolean;
  onClose: () => void;
  form: {
    description: string;
    amount: string;
    currency: string;
    type: string;
    duration: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AddPlanModal: React.FC<AddPlanModalProps> = ({ show, onClose, form, onChange, onSubmit }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-2 left-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-800">إضافة خطة اشتراك جديدة</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">الوصف</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={onChange}
              required
              className="w-full text-black border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-primary-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">السعر</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={onChange}
              required
              min="0"
              step="0.01"
              className="w-full text-black border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-primary-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">العملة</label>
            <input
              type="text"
              name="currency"
              value={form.currency}
              onChange={onChange}
              required
              className="w-full text-black border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-primary-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">النوع</label>
            <select
              name="type"
              value={form.type}
              onChange={onChange}
              required
              className="w-full text-black border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-primary-200"
            >
              <option value="">اختر النوع</option>
              <option value="APP_FEATURE">ميزات التطبيق</option>
              <option value="DRIVER_GROUP">مجموعة السائقين</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">المدة</label>
            <select
              name="duration"
              value={form.duration}
              onChange={onChange}
              className="w-full text-black border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-primary-200"
            >
              <option value="">اختر المدة</option>
              <option value="MONTHLY">شهري</option>
              <option value="HALF_MONTHLY">نصف شهري</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-bold transition-colors"
          >
            إضافة
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPlanModal; 