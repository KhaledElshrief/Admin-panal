import React from 'react';
import { Bell, Search, User, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <header className="bg-dark-300 border-b border-dark-200 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full p-2 pr-10 bg-dark-400 border border-dark-200 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="بحث"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4 space-x-reverse">
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="h-6 w-6" />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1 right-1 h-4 w-4 bg-error-500 rounded-full flex items-center justify-center text-xs"
            >
              1
            </motion.span>
          </button>
          
          <Filter className="h-6 w-6 text-gray-400 cursor-pointer hover:text-white transition-colors" />
          
          <div className="flex items-center gap-3 border-r border-dark-200 pr-4">
            <span className="text-sm font-medium">م. حسام</span>
            <div className="h-9 w-9 rounded-full bg-primary-600 flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;