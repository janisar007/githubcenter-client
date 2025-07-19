import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ToastContainer from './ToastContainer';

type ToastPosition = 
  'top-left' | 'top-center' | 'top-right' | 
  'bottom-left' | 'bottom-center' | 'bottom-right';

type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  position?: ToastPosition;
  icon?: React.ReactNode;
  onClose?: () => void;
  className?: string;
  progressBar?: boolean;
  closeButton?: boolean;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = uuidv4();
    setToasts((prev) => [...prev, { ...toast, id }]);

    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => {
      const toastToRemove = prev.find((toast) => toast.id === id);
      if (toastToRemove?.onClose) {
        toastToRemove.onClose();
      }
      return prev.filter((toast) => toast.id !== id);
    });
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};