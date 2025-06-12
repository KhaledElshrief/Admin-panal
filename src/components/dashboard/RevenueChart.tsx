import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'يناير', value: 3200 },
  { name: 'فبراير', value: 4100 },
  { name: 'مارس', value: 2900 },
  { name: 'أبريل', value: 4600 },
];

type RevenueChartProps = {
  activeTab: string;
};

const RevenueChart: React.FC<RevenueChartProps> = ({ activeTab }) => {
  return (
    <div className="bg-dark-300 rounded-xl p-5 h-80">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">الرسوم البيانية</h3>
        <div className="flex rounded-lg overflow-hidden">
          {['شهري', 'المستخدمين', 'الإيرادات', 'الاشتراكات', 'المستخدمين'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm ${
                activeTab === tab
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-200 text-gray-400 hover:bg-dark-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4338ca" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4338ca" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af' }}
            domain={[0, 'dataMax + 1000']}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a1e31',
              borderColor: '#374151',
              borderRadius: '0.5rem',
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#4338ca"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorValue)"
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;