export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

export const getFileIcon = (type: string): string => {
  const extension = getFileExtension(type);
  
  switch (extension) {
    case 'pdf':
      return 'File';
    case 'doc':
    case 'docx':
      return 'FileText';
    case 'ppt':
    case 'pptx':
      return 'Presentation';
    case 'xls':
    case 'xlsx':
      return 'FileSpreadsheet';
    case 'txt':
    case 'md':
      return 'FileText';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'webp':
      return 'Image';
    case 'html':
      return 'Code';
    case 'csv':
      return 'FileSpreadsheet';
    case 'json':
      return 'Code';
    default:
      return 'File';
  }
};

export const isValidFileType = (file: File, acceptedTypes: string[]): boolean => {
  const extension = getFileExtension(file.name);
  return acceptedTypes.includes(extension);
};

export const createDownloadUrl = (content: string | Uint8Array, filename: string, type: string): string => {
  const blob = new Blob([content], { type });
  return URL.createObjectURL(blob);
};