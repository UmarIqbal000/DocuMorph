import React from 'react';
import { Heart, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <span>© 2025 All rights reserved</span>
            <span className="hidden sm:block">•</span>
            <span>A product by NinZae</span>
            <span className="hidden sm:block">•</span>
            <div className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Mail className="h-4 w-4" />
            <a 
              href="mailto:umar.iqba.ninzae000@gmail.com"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              umar.iqba.ninzae000@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;