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

export const createDownloadUrl = (
  content: string | Uint8Array | ArrayBuffer, 
  filename: string, 
  type: string
): string => {
  let blob: Blob;
  
  if (content instanceof ArrayBuffer) {
    blob = new Blob([content], { type });
  } else if (content instanceof Uint8Array) {
    blob = new Blob([content], { type });
  } else {
    blob = new Blob([content], { type });
  }
  
  return URL.createObjectURL(blob);
};

export const validateFileForConversion = (file: File): { isValid: boolean; error?: string } => {
  const maxSize = 50 * 1024 * 1024; // 50MB
  const supportedTypes = [
    'pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 
    'txt', 'md', 'jpg', 'jpeg', 'png', 'webp', 'html', 'csv', 'json'
  ];
  
  if (file.size > maxSize) {
    return { isValid: false, error: 'File size must be less than 50MB' };
  }
  
  const extension = getFileExtension(file.name);
  if (!supportedTypes.includes(extension)) {
    return { isValid: false, error: `File type .${extension} is not supported` };
  }
  
  return { isValid: true };
};