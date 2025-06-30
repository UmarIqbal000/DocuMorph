import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { CONVERSION_FORMATS, FILE_CATEGORIES } from '../constants/formats';
import { ConversionFormat } from '../types';
import { getFileExtension } from '../utils/fileUtils';

interface FormatSelectorProps {
  selectedFiles: string[];
  onFormatSelect: (format: ConversionFormat) => void;
  onBack: () => void;
}

const FormatSelector: React.FC<FormatSelectorProps> = ({ 
  selectedFiles, 
  onFormatSelect, 
  onBack 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get supported formats based on selected files
  const getCompatibleFormats = () => {
    if (selectedFiles.length === 0) return CONVERSION_FORMATS;
    
    const fileExtensions = selectedFiles.map(file => getFileExtension(file));
    return CONVERSION_FORMATS.filter(format => 
      fileExtensions.some(ext => format.supportedInputs.includes(ext))
    );
  };

  const filteredFormats = getCompatibleFormats().filter(format => {
    const matchesSearch = format.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         format.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || format.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatsByCategory = filteredFormats.reduce((acc, format) => {
    if (!acc[format.category]) {
      acc[format.category] = [];
    }
    acc[format.category].push(format);
    return acc;
  }, {} as Record<string, ConversionFormat[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
        >
          ← Back to Upload
        </button>
        
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Choose Output Format
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Select the format you want to convert your files to
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search formats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
          >
            {FILE_CATEGORIES.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Format Grid */}
      <div className="space-y-8">
        {Object.entries(formatsByCategory).map(([category, formats]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {category} Conversions
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {formats.map((format) => (
                <div
                  key={format.id}
                  onClick={() => onFormatSelect(format)}
                  className="group cursor-pointer p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">
                        {format.extension.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {format.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {format.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredFormats.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No formats found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default FormatSelector;