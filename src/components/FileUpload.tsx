import React, { useRef } from 'react';
import { Upload, X, File, AlertCircle } from 'lucide-react';
import { useFileUpload } from '../hooks/useFileUpload';
import { formatFileSize, getFileIcon, validateFileForConversion } from '../utils/fileUtils';
import { FileInfo } from '../types';

interface FileUploadProps {
  onFilesAdded: (files: FileInfo[]) => void;
  files: FileInfo[];
  onRemoveFile: (id: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesAdded, files, onRemoveFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isDragOver, handleDragOver, handleDragLeave, handleDrop, addFiles } = useFileUpload();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    processFiles(selectedFiles);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const processFiles = (selectedFiles: File[]) => {
    const validFiles: File[] = [];
    const errors: string[] = [];

    selectedFiles.forEach(file => {
      const validation = validateFileForConversion(file);
      if (validation.isValid) {
        validFiles.push(file);
      } else {
        errors.push(`${file.name}: ${validation.error}`);
      }
    });

    if (errors.length > 0) {
      alert(`Some files could not be added:\n${errors.join('\n')}`);
    }

    if (validFiles.length > 0) {
      const fileInfos = addFiles(validFiles);
      onFilesAdded(fileInfos);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDropWithCallback = (e: React.DragEvent) => {
    handleDrop(e);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const IconComponent = ({ iconName }: { iconName: string }) => {
    switch (iconName) {
      case 'File':
        return <File className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
          ${isDragOver 
            ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDropWithCallback}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.md,.jpg,.jpeg,.png,.webp,.html,.csv,.json"
        />
        
        <div className="space-y-4">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
            isDragOver ? 'bg-primary-100 dark:bg-primary-800' : 'bg-gray-100 dark:bg-gray-700'
          }`}>
            <Upload className={`h-8 w-8 transition-colors ${
              isDragOver ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'
            }`} />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {isDragOver ? 'Drop your files here' : 'Upload your documents'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Drag & drop files or click to browse
            </p>
            <button
              onClick={handleClick}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Choose Files
            </button>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Supports: PDF, DOCX, PPTX, XLSX, TXT, MD, Images, and more</p>
            <p className="mt-1">Maximum file size: 50MB</p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            Uploaded Files ({files.length})
          </h4>
          
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <IconComponent iconName={getFileIcon(file.name)} />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white truncate max-w-xs">
                      {file.name}
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => onRemoveFile(file.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;