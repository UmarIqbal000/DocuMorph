export interface FileInfo {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  status: 'pending' | 'converting' | 'completed' | 'failed';
  progress: number;
  outputFormat?: string;
  downloadUrl?: string;
  error?: string;
  timestamp: number;
}

export interface ConversionFormat {
  id: string;
  name: string;
  extension: string;
  description: string;
  category: string;
  icon: string;
  supportedInputs: string[];
}

export interface ConversionHistory {
  id: string;
  fileName: string;
  fromFormat: string;
  toFormat: string;
  timestamp: number;
  fileSize: number;
  status: 'completed' | 'failed';
}

export type Theme = 'light' | 'dark';