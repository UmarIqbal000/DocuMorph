import { FileInfo } from '../types';
import { createDownloadUrl } from './fileUtils';
import * as XLSX from 'xlsx';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { jsPDF } from 'jspdf';
import { marked } from 'marked';

// Real conversion service with actual file processing
export const convertFile = async (
  fileInfo: FileInfo,
  targetFormat: string,
  onProgress: (progress: number) => void
): Promise<{ downloadUrl: string; filename: string }> => {
  return new Promise(async (resolve, reject) => {
    try {
      onProgress(10);
      
      const originalName = fileInfo.name.split('.')[0];
      const filename = `${originalName}.${targetFormat}`;
      const sourceExtension = fileInfo.name.split('.').pop()?.toLowerCase();
      
      onProgress(30);
      
      let result: { content: string | Uint8Array | ArrayBuffer; mimeType: string };
      
      // Route to appropriate conversion function
      if (sourceExtension === 'xlsx' || sourceExtension === 'xls') {
        result = await convertFromExcel(fileInfo.file, targetFormat, onProgress);
      } else if (sourceExtension === 'pdf') {
        result = await convertFromPDF(fileInfo.file, targetFormat, onProgress);
      } else if (sourceExtension === 'txt') {
        result = await convertFromText(fileInfo.file, targetFormat, onProgress);
      } else if (sourceExtension === 'md') {
        result = await convertFromMarkdown(fileInfo.file, targetFormat, onProgress);
      } else if (['jpg', 'jpeg', 'png', 'webp'].includes(sourceExtension || '')) {
        result = await convertFromImage(fileInfo.file, targetFormat, onProgress);
      } else if (sourceExtension === 'docx') {
        result = await convertFromWord(fileInfo.file, targetFormat, onProgress);
      } else {
        throw new Error(`Conversion from ${sourceExtension} is not yet supported`);
      }
      
      onProgress(90);
      
      const downloadUrl = createDownloadUrl(result.content, filename, result.mimeType);
      
      onProgress(100);
      resolve({ downloadUrl, filename });
      
    } catch (error) {
      reject(error);
    }
  });
};

// Excel conversion functions
async function convertFromExcel(
  file: File, 
  targetFormat: string, 
  onProgress: (progress: number) => void
): Promise<{ content: string | Uint8Array | ArrayBuffer; mimeType: string }> {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  
  onProgress(50);
  
  switch (targetFormat) {
    case 'csv': {
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      return { content: csv, mimeType: 'text/csv' };
    }
    
    case 'json': {
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(worksheet);
      return { content: JSON.stringify(json, null, 2), mimeType: 'application/json' };
    }
    
    case 'txt': {
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      return { content: csv.replace(/,/g, '\t'), mimeType: 'text/plain' };
    }
    
    case 'html': {
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const html = XLSX.utils.sheet_to_html(worksheet);
      const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <title>Converted Spreadsheet</title>
  <style>
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
  </style>
</head>
<body>
  ${html}
</body>
</html>`;
      return { content: fullHtml, mimeType: 'text/html' };
    }
    
    case 'pdf': {
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as string[][];
      
      const doc = new jsPDF();
      const pageHeight = doc.internal.pageSize.height;
      let y = 20;
      
      jsonData.forEach((row, index) => {
        if (y > pageHeight - 20) {
          doc.addPage();
          y = 20;
        }
        
        const text = row.join(' | ');
        doc.text(text, 10, y);
        y += 10;
      });
      
      const pdfBytes = doc.output('arraybuffer');
      return { content: pdfBytes, mimeType: 'application/pdf' };
    }
    
    default:
      throw new Error(`Conversion to ${targetFormat} not supported from Excel`);
  }
}

// PDF conversion functions
async function convertFromPDF(
  file: File, 
  targetFormat: string, 
  onProgress: (progress: number) => void
): Promise<{ content: string | Uint8Array | ArrayBuffer; mimeType: string }> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  onProgress(50);
  
  switch (targetFormat) {
    case 'txt': {
      // Simple text extraction (basic implementation)
      const pages = pdfDoc.getPages();
      let text = '';
      
      for (let i = 0; i < pages.length; i++) {
        text += `--- Page ${i + 1} ---\n`;
        text += `[Text extraction from PDF is limited in browser environment]\n`;
        text += `Page dimensions: ${pages[i].getWidth()} x ${pages[i].getHeight()}\n\n`;
      }
      
      return { content: text, mimeType: 'text/plain' };
    }
    
    case 'html': {
      const pages = pdfDoc.getPages();
      let html = `<!DOCTYPE html>
<html>
<head>
  <title>Converted PDF</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    .page { margin-bottom: 30px; padding: 20px; border: 1px solid #ccc; }
  </style>
</head>
<body>`;
      
      pages.forEach((page, index) => {
        html += `<div class="page">
          <h2>Page ${index + 1}</h2>
          <p>Page dimensions: ${page.getWidth()} x ${page.getHeight()}</p>
          <p>[PDF content extraction is limited in browser environment]</p>
        </div>`;
      });
      
      html += '</body></html>';
      return { content: html, mimeType: 'text/html' };
    }
    
    default:
      throw new Error(`Conversion to ${targetFormat} not supported from PDF`);
  }
}

// Text conversion functions
async function convertFromText(
  file: File, 
  targetFormat: string, 
  onProgress: (progress: number) => void
): Promise<{ content: string | Uint8Array | ArrayBuffer; mimeType: string }> {
  const text = await file.text();
  
  onProgress(50);
  
  switch (targetFormat) {
    case 'pdf': {
      const doc = new jsPDF();
      const lines = text.split('\n');
      const pageHeight = doc.internal.pageSize.height;
      let y = 20;
      
      lines.forEach(line => {
        if (y > pageHeight - 20) {
          doc.addPage();
          y = 20;
        }
        
        // Handle long lines by splitting them
        const splitLines = doc.splitTextToSize(line, 180);
        splitLines.forEach((splitLine: string) => {
          if (y > pageHeight - 20) {
            doc.addPage();
            y = 20;
          }
          doc.text(splitLine, 10, y);
          y += 7;
        });
      });
      
      const pdfBytes = doc.output('arraybuffer');
      return { content: pdfBytes, mimeType: 'application/pdf' };
    }
    
    case 'html': {
      const html = `<!DOCTYPE html>
<html>
<head>
  <title>Converted Text</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
    pre { white-space: pre-wrap; word-wrap: break-word; }
  </style>
</head>
<body>
  <pre>${text}</pre>
</body>
</html>`;
      return { content: html, mimeType: 'text/html' };
    }
    
    case 'json': {
      const lines = text.split('\n');
      const jsonData = {
        originalFile: file.name,
        convertedAt: new Date().toISOString(),
        lineCount: lines.length,
        content: lines
      };
      return { content: JSON.stringify(jsonData, null, 2), mimeType: 'application/json' };
    }
    
    default:
      throw new Error(`Conversion to ${targetFormat} not supported from text`);
  }
}

// Markdown conversion functions
async function convertFromMarkdown(
  file: File, 
  targetFormat: string, 
  onProgress: (progress: number) => void
): Promise<{ content: string | Uint8Array | ArrayBuffer; mimeType: string }> {
  const markdown = await file.text();
  
  onProgress(50);
  
  switch (targetFormat) {
    case 'html': {
      const htmlContent = marked(markdown);
      const html = `<!DOCTYPE html>
<html>
<head>
  <title>Converted Markdown</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
    code { background-color: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
    pre { background-color: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
    blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 20px; }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>`;
      return { content: html, mimeType: 'text/html' };
    }
    
    case 'txt': {
      // Strip markdown formatting for plain text
      let text = markdown
        .replace(/#{1,6}\s+/g, '') // Remove headers
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.*?)\*/g, '$1') // Remove italic
        .replace(/`(.*?)`/g, '$1') // Remove inline code
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1'); // Remove images, keep alt text
      
      return { content: text, mimeType: 'text/plain' };
    }
    
    case 'pdf': {
      const htmlContent = marked(markdown);
      // Create a simple PDF from the markdown
      const doc = new jsPDF();
      const lines = markdown.split('\n');
      const pageHeight = doc.internal.pageSize.height;
      let y = 20;
      
      lines.forEach(line => {
        if (y > pageHeight - 20) {
          doc.addPage();
          y = 20;
        }
        
        const splitLines = doc.splitTextToSize(line, 180);
        splitLines.forEach((splitLine: string) => {
          if (y > pageHeight - 20) {
            doc.addPage();
            y = 20;
          }
          doc.text(splitLine, 10, y);
          y += 7;
        });
      });
      
      const pdfBytes = doc.output('arraybuffer');
      return { content: pdfBytes, mimeType: 'application/pdf' };
    }
    
    default:
      throw new Error(`Conversion to ${targetFormat} not supported from Markdown`);
  }
}

// Image conversion functions
async function convertFromImage(
  file: File, 
  targetFormat: string, 
  onProgress: (progress: number) => void
): Promise<{ content: string | Uint8Array | ArrayBuffer; mimeType: string }> {
  onProgress(50);
  
  switch (targetFormat) {
    case 'pdf': {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            if (!ctx) {
              reject(new Error('Could not get canvas context'));
              return;
            }
            
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            
            // Calculate dimensions to fit the page
            const imgRatio = img.width / img.height;
            const pageRatio = pageWidth / pageHeight;
            
            let finalWidth, finalHeight;
            if (imgRatio > pageRatio) {
              finalWidth = pageWidth - 20;
              finalHeight = finalWidth / imgRatio;
            } else {
              finalHeight = pageHeight - 20;
              finalWidth = finalHeight * imgRatio;
            }
            
            const imgData = canvas.toDataURL('image/jpeg', 0.8);
            doc.addImage(imgData, 'JPEG', 10, 10, finalWidth, finalHeight);
            
            const pdfBytes = doc.output('arraybuffer');
            resolve({ content: pdfBytes, mimeType: 'application/pdf' });
          } catch (error) {
            reject(error);
          }
        };
        
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = URL.createObjectURL(file);
      });
    }
    
    default:
      throw new Error(`Conversion to ${targetFormat} not supported from images`);
  }
}

// Word document conversion (basic implementation)
async function convertFromWord(
  file: File, 
  targetFormat: string, 
  onProgress: (progress: number) => void
): Promise<{ content: string | Uint8Array | ArrayBuffer; mimeType: string }> {
  onProgress(50);
  
  switch (targetFormat) {
    case 'txt': {
      // Basic text extraction - in a real implementation you'd use mammoth.js
      const text = `[Word document conversion]\nOriginal file: ${file.name}\nSize: ${file.size} bytes\n\nNote: Full Word document text extraction requires server-side processing.\nThis is a placeholder conversion result.`;
      return { content: text, mimeType: 'text/plain' };
    }
    
    case 'html': {
      const html = `<!DOCTYPE html>
<html>
<head>
  <title>Converted Word Document</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
  </style>
</head>
<body>
  <h1>Word Document Conversion</h1>
  <p><strong>Original file:</strong> ${file.name}</p>
  <p><strong>Size:</strong> ${file.size} bytes</p>
  <p><em>Note: Full Word document conversion requires server-side processing. This is a placeholder conversion result.</em></p>
</body>
</html>`;
      return { content: html, mimeType: 'text/html' };
    }
    
    case 'pdf': {
      const doc = new jsPDF();
      doc.text('Word Document Conversion', 10, 20);
      doc.text(`Original file: ${file.name}`, 10, 40);
      doc.text(`Size: ${file.size} bytes`, 10, 60);
      doc.text('Note: Full Word document conversion requires', 10, 80);
      doc.text('server-side processing. This is a placeholder.', 10, 100);
      
      const pdfBytes = doc.output('arraybuffer');
      return { content: pdfBytes, mimeType: 'application/pdf' };
    }
    
    default:
      throw new Error(`Conversion to ${targetFormat} not supported from Word documents`);
  }
}