import { useState, useCallback } from 'react';
import { FileInfo } from '../types';

export const useFileUpload = () => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const addFiles = useCallback((newFiles: File[]) => {
    const fileInfos: FileInfo[] = newFiles.map(file => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending',
      progress: 0,
      timestamp: Date.now(),
    }));

    setFiles(prev => [...prev, ...fileInfos]);
    return fileInfos;
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  }, []);

  const updateFileStatus = useCallback((id: string, updates: Partial<FileInfo>) => {
    setFiles(prev => prev.map(file => 
      file.id === id ? { ...file, ...updates } : file
    ));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  }, [addFiles]);

  return {
    files,
    isDragOver,
    addFiles,
    removeFile,
    updateFileStatus,
    clearFiles,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};