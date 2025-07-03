import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import FileUpload from './components/FileUpload';
import FormatSelector from './components/FormatSelector';
import ConversionProgress from './components/ConversionProgress';
import { FileInfo, ConversionFormat } from './types';
import { convertFile } from './utils/conversionService';

type Step = 'hero' | 'upload' | 'format' | 'progress';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('hero');
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<ConversionFormat | null>(null);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const handleGetStarted = useCallback(() => {
    setCurrentStep('upload');
  }, []);

  const handleFilesAdded = useCallback((newFiles: FileInfo[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const handleRemoveFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  }, []);

  const handleFormatSelect = useCallback(async (format: ConversionFormat) => {
    setSelectedFormat(format);
    setCurrentStep('progress');

    // Start conversions
    const updatedFiles = files.map(file => ({
      ...file,
      status: 'converting' as const,
      outputFormat: format.extension,
      progress: 0,
    }));
    setFiles(updatedFiles);

    // Convert each file
    for (const file of updatedFiles) {
      try {
        const result = await convertFile(
          file,
          format.extension,
          (progress) => {
            setFiles(prev => prev.map(f => 
              f.id === file.id ? { ...f, progress } : f
            ));
          }
        );

        setFiles(prev => prev.map(f => 
          f.id === file.id 
            ? { 
                ...f, 
                status: 'completed', 
                downloadUrl: result.downloadUrl,
                progress: 100 
              } 
            : f
        ));
      } catch (error) {
        setFiles(prev => prev.map(f => 
          f.id === file.id 
            ? { 
                ...f, 
                status: 'failed', 
                error: error instanceof Error ? error.message : 'Conversion failed' 
              } 
            : f
        ));
      }
    }
  }, [files]);

  const handleDownload = useCallback((file: FileInfo) => {
    if (file.downloadUrl) {
      const a = document.createElement('a');
      a.href = file.downloadUrl;
      a.download = file.name.replace(/\.[^/.]+$/, `.${file.outputFormat}`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }, []);

  const handleRetry = useCallback(async (file: FileInfo) => {
    if (!selectedFormat) return;

    setFiles(prev => prev.map(f => 
      f.id === file.id 
        ? { ...f, status: 'converting', progress: 0, error: undefined }
        : f
    ));

    try {
      const result = await convertFile(
        file,
        selectedFormat.extension,
        (progress) => {
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, progress } : f
          ));
        }
      );

      setFiles(prev => prev.map(f => 
        f.id === file.id 
          ? { 
              ...f, 
              status: 'completed', 
              downloadUrl: result.downloadUrl,
              progress: 100 
            } 
          : f
      ));
    } catch (error) {
      setFiles(prev => prev.map(f => 
        f.id === file.id 
          ? { 
              ...f, 
              status: 'failed', 
              error: error instanceof Error ? error.message : 'Conversion failed' 
            } 
          : f
      ));
    }
  }, [selectedFormat]);

  const handleBack = useCallback(() => {
    if (currentStep === 'format') {
      setCurrentStep('upload');
    } else if (currentStep === 'progress') {
      setCurrentStep('hero');
      setFiles([]);
      setSelectedFormat(null);
    }
  }, [currentStep]);

  const handleContinueToFormat = useCallback(() => {
    if (files.length > 0) {
      setCurrentStep('format');
    }
  }, [files.length]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 'hero' && (
          <Hero onGetStarted={handleGetStarted} />
        )}
        
        {currentStep === 'upload' && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Upload Your Files
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Select the documents you want to convert
              </p>
            </div>
            
            <FileUpload
              onFilesAdded={handleFilesAdded}
              files={files}
              onRemoveFile={handleRemoveFile}
            />
            
            {files.length > 0 && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleContinueToFormat}
                  className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Continue to Format Selection
                </button>
              </div>
            )}
          </div>
        )}
        
        {currentStep === 'format' && (
          <div className="max-w-6xl mx-auto">
            <FormatSelector
              selectedFiles={files.map(f => f.name)}
              onFormatSelect={handleFormatSelect}
              onBack={handleBack}
            />
          </div>
        )}
        
        {currentStep === 'progress' && (
          <div className="max-w-4xl mx-auto">
            <ConversionProgress
              files={files}
              onDownload={handleDownload}
              onRetry={handleRetry}
              onBack={handleBack}
            />
          </div>
        )}
      </main>

      {currentStep === 'hero' && <Footer />}
    </div>
  );
}

export default App;