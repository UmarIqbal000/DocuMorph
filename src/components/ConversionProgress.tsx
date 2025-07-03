import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Download, RotateCcw, AlertCircle } from 'lucide-react';
import { FileInfo } from '../types';
import { formatFileSize } from '../utils/fileUtils';

interface ConversionProgressProps {
  files: FileInfo[];
  onDownload: (file: FileInfo) => void;
  onRetry: (file: FileInfo) => void;
  onBack: () => void;
}

const ConversionProgress: React.FC<ConversionProgressProps> = ({
  files,
  onDownload,
  onRetry,
  onBack
}) => {
  const completedFiles = files.filter(f => f.status === 'completed');
  const failedFiles = files.filter(f => f.status === 'failed');
  const processingFiles = files.filter(f => f.status === 'converting');
  const allCompleted = files.length > 0 && completedFiles.length + failedFiles.length === files.length;

  useEffect(() => {
    if (allCompleted && completedFiles.length > 0 && 'Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification('Conversions Complete!', {
        body: `${completedFiles.length} files converted successfully`,
        icon: '/favicon.ico'
      });
      
      setTimeout(() => notification.close(), 3000);
    }
  }, [allCompleted, completedFiles.length]);

  const downloadAll = () => {
    completedFiles.forEach(file => {
      if (file.downloadUrl) {
        const a = document.createElement('a');
        a.href = file.downloadUrl;
        a.download = file.name.replace(/\.[^/.]+$/, `.${file.outputFormat}`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
        >
          ← Start New Conversion
        </button>
        
        {allCompleted && (
          <div className="flex items-center space-x-2 text-accent-600 dark:text-accent-400">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">All conversions complete!</span>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Conversion Progress
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {processingFiles.length > 0 ? 'Converting your files...' : 'Review your converted files'}
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {files.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Files</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-accent-600 dark:text-accent-400">
            {completedFiles.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {failedFiles.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Failed</div>
        </div>
      </div>

      {/* Bulk Download */}
      {completedFiles.length > 1 && (
        <div className="bg-accent-50 dark:bg-accent-900/20 rounded-lg p-4 border border-accent-200 dark:border-accent-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-accent-900 dark:text-accent-100">
                Download All Files
              </h3>
              <p className="text-sm text-accent-700 dark:text-accent-300">
                {completedFiles.length} files ready for download
              </p>
            </div>
            <button
              onClick={downloadAll}
              className="px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download All</span>
            </button>
          </div>
        </div>
      )}

      {/* File List */}
      <div className="space-y-3">
        {files.map((file) => (
          <div
            key={file.id}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  file.status === 'completed' ? 'bg-accent-100 dark:bg-accent-900' :
                  file.status === 'failed' ? 'bg-red-100 dark:bg-red-900' :
                  'bg-primary-100 dark:bg-primary-900'
                }`}>
                  {file.status === 'completed' ? (
                    <CheckCircle className="h-6 w-6 text-accent-600 dark:text-accent-400" />
                  ) : file.status === 'failed' ? (
                    <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  ) : (
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary-600 border-t-transparent"></div>
                  )}
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {file.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatFileSize(file.size)} • {file.outputFormat?.toUpperCase() || 'Converting...'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {file.status === 'completed' && file.downloadUrl && (
                  <button
                    onClick={() => onDownload(file)}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                )}
                
                {file.status === 'failed' && (
                  <button
                    onClick={() => onRetry(file)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Retry</span>
                  </button>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            {file.status === 'converting' && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Converting...</span>
                  <span className="text-gray-900 dark:text-white font-medium">{file.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${file.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {file.status === 'failed' && file.error && (
              <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 dark:text-red-300">
                    {file.error}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversionProgress;