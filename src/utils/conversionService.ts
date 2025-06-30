import { FileInfo } from '../types';
import { createDownloadUrl } from './fileUtils';

// Mock conversion service - In a real app, this would call actual conversion APIs
export const convertFile = async (
  fileInfo: FileInfo,
  targetFormat: string,
  onProgress: (progress: number) => void
): Promise<{ downloadUrl: string; filename: string }> => {
  return new Promise((resolve, reject) => {
    let progress = 0;
    
    const updateProgress = () => {
      progress += Math.random() * 15 + 5;
      if (progress > 100) progress = 100;
      
      onProgress(progress);
      
      if (progress >= 100) {
        // Simulate conversion completion
        setTimeout(() => {
          const originalName = fileInfo.name.split('.')[0];
          const filename = `${originalName}.${targetFormat}`;
          
          // Create mock file content
          let content: string | Uint8Array;
          let mimeType: string;
          
          switch (targetFormat) {
            case 'pdf':
              content = '%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj';
              mimeType = 'application/pdf';
              break;
            case 'txt':
              content = `Converted from ${fileInfo.name}\n\nThis is a mock conversion result.\nThe original file has been processed and converted to text format.`;
              mimeType = 'text/plain';
              break;
            case 'html':
              content = `<!DOCTYPE html>\n<html>\n<head>\n<title>Converted from ${fileInfo.name}</title>\n</head>\n<body>\n<h1>Document Converted</h1>\n<p>This is a mock conversion result.</p>\n</body>\n</html>`;
              mimeType = 'text/html';
              break;
            case 'csv':
              content = `Name,Value,Description\n"Converted File","${fileInfo.name}","Mock conversion result"\n"File Size","${fileInfo.size} bytes","Original file size"`;
              mimeType = 'text/csv';
              break;
            case 'json':
              content = JSON.stringify({
                originalFile: fileInfo.name,
                convertedAt: new Date().toISOString(),
                fileSize: fileInfo.size,
                message: 'This is a mock conversion result'
              }, null, 2);
              mimeType = 'application/json';
              break;
            default:
              content = `Mock converted content for ${fileInfo.name}`;
              mimeType = 'application/octet-stream';
          }
          
          const downloadUrl = createDownloadUrl(content, filename, mimeType);
          resolve({ downloadUrl, filename });
        }, 500);
      } else {
        setTimeout(updateProgress, 200 + Math.random() * 300);
      }
    };
    
    // Simulate potential failure (5% chance)
    if (Math.random() < 0.05) {
      setTimeout(() => {
        reject(new Error('Conversion failed due to network error'));
      }, 1000);
      return;
    }
    
    updateProgress();
  });
};