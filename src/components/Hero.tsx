import React from 'react';
import { ArrowDown, Shield, Zap, Globe } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Convert Documents
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
              Instantly & Securely
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your documents between PDF, DOCX, PPTX, XLSX, and 20+ other formats. 
            Fast, secure, and works directly in your browser.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={onGetStarted}
              className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Start Converting</span>
              <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </button>
            
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Shield className="h-5 w-5" />
              <span className="text-sm">100% Private & Secure</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-xl flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Convert files in seconds with our optimized processing engine
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Secure & Private
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your files are processed locally and never stored on our servers
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-xl flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Works Everywhere
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No downloads required. Works on any device with a web browser
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;