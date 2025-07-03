import { ConversionFormat } from '../types';

export const CONVERSION_FORMATS: ConversionFormat[] = [
  // Excel Conversions
  {
    id: 'xlsx-to-csv',
    name: 'Excel to CSV',
    extension: 'csv',
    description: 'Convert Excel spreadsheet to CSV format',
    category: 'Excel',
    icon: 'FileSpreadsheet',
    supportedInputs: ['xlsx', 'xls'],
  },
  {
    id: 'xlsx-to-json',
    name: 'Excel to JSON',
    extension: 'json',
    description: 'Convert Excel data to JSON format',
    category: 'Excel',
    icon: 'Code',
    supportedInputs: ['xlsx', 'xls'],
  },
  {
    id: 'xlsx-to-txt',
    name: 'Excel to TXT',
    extension: 'txt',
    description: 'Convert Excel to tab-separated text',
    category: 'Excel',
    icon: 'FileText',
    supportedInputs: ['xlsx', 'xls'],
  },
  {
    id: 'xlsx-to-html',
    name: 'Excel to HTML',
    extension: 'html',
    description: 'Convert Excel to HTML table',
    category: 'Excel',
    icon: 'Code',
    supportedInputs: ['xlsx', 'xls'],
  },
  {
    id: 'xlsx-to-pdf',
    name: 'Excel to PDF',
    extension: 'pdf',
    description: 'Convert Excel spreadsheet to PDF',
    category: 'Excel',
    icon: 'File',
    supportedInputs: ['xlsx', 'xls'],
  },

  // Text Conversions
  {
    id: 'txt-to-pdf',
    name: 'Text to PDF',
    extension: 'pdf',
    description: 'Convert text file to PDF document',
    category: 'Text',
    icon: 'File',
    supportedInputs: ['txt'],
  },
  {
    id: 'txt-to-html',
    name: 'Text to HTML',
    extension: 'html',
    description: 'Convert text to HTML format',
    category: 'Text',
    icon: 'Code',
    supportedInputs: ['txt'],
  },
  {
    id: 'txt-to-json',
    name: 'Text to JSON',
    extension: 'json',
    description: 'Convert text to JSON format',
    category: 'Text',
    icon: 'Code',
    supportedInputs: ['txt'],
  },

  // Markdown Conversions
  {
    id: 'md-to-html',
    name: 'Markdown to HTML',
    extension: 'html',
    description: 'Convert Markdown to HTML format',
    category: 'Text',
    icon: 'Code',
    supportedInputs: ['md'],
  },
  {
    id: 'md-to-pdf',
    name: 'Markdown to PDF',
    extension: 'pdf',
    description: 'Convert Markdown to PDF document',
    category: 'Text',
    icon: 'File',
    supportedInputs: ['md'],
  },
  {
    id: 'md-to-txt',
    name: 'Markdown to Text',
    extension: 'txt',
    description: 'Convert Markdown to plain text',
    category: 'Text',
    icon: 'FileText',
    supportedInputs: ['md'],
  },

  // Image Conversions
  {
    id: 'img-to-pdf',
    name: 'Image to PDF',
    extension: 'pdf',
    description: 'Convert images to PDF document',
    category: 'Image',
    icon: 'File',
    supportedInputs: ['jpg', 'jpeg', 'png', 'webp'],
  },

  // PDF Conversions (basic)
  {
    id: 'pdf-to-txt',
    name: 'PDF to Text',
    extension: 'txt',
    description: 'Extract text from PDF (basic)',
    category: 'PDF',
    icon: 'FileText',
    supportedInputs: ['pdf'],
  },
  {
    id: 'pdf-to-html',
    name: 'PDF to HTML',
    extension: 'html',
    description: 'Convert PDF to HTML (basic)',
    category: 'PDF',
    icon: 'Code',
    supportedInputs: ['pdf'],
  },

  // Word Conversions (basic)
  {
    id: 'docx-to-txt',
    name: 'Word to Text',
    extension: 'txt',
    description: 'Extract text from Word document (basic)',
    category: 'Word',
    icon: 'FileText',
    supportedInputs: ['docx', 'doc'],
  },
  {
    id: 'docx-to-html',
    name: 'Word to HTML',
    extension: 'html',
    description: 'Convert Word to HTML (basic)',
    category: 'Word',
    icon: 'Code',
    supportedInputs: ['docx', 'doc'],
  },
  {
    id: 'docx-to-pdf',
    name: 'Word to PDF',
    extension: 'pdf',
    description: 'Convert Word to PDF (basic)',
    category: 'Word',
    icon: 'File',
    supportedInputs: ['docx', 'doc'],
  },
];

export const FILE_CATEGORIES = [
  { id: 'all', name: 'All Formats', icon: 'Files' },
  { id: 'Excel', name: 'Excel', icon: 'FileSpreadsheet' },
  { id: 'Text', name: 'Text & Markdown', icon: 'FileText' },
  { id: 'Image', name: 'Image', icon: 'Image' },
  { id: 'PDF', name: 'PDF', icon: 'File' },
  { id: 'Word', name: 'Word', icon: 'FileText' },
];