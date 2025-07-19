import React, { useEffect, useState } from 'react';
import { useToast } from './ToastContext';
import { FiCheck, FiX, FiAlertTriangle, FiInfo, FiXCircle } from 'react-icons/fi';

const typeIcons: Record<string, React.ReactNode> = {
  success: <FiCheck className="text-green-500" />,
  error: <FiXCircle className="text-red-500" />,
  warning: <FiAlertTriangle className="text-yellow-500" />,
  info: <FiInfo className="text-blue-500" />,
  default: null,
};

const typeClasses: Record<string, string> = {
  success: 'bg-green-50 border-green-200',
  error: 'bg-red-50 border-red-200',
  warning: 'bg-yellow-50 border-yellow-200',
  info: 'bg-blue-50 border-blue-200',
  default: 'bg-white border-gray-200',
};

type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default';

interface ToastProps {
  toast: {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
    icon?: React.ReactNode;
    onClose?: () => void;
    className?: string;
    progressBar?: boolean;
    closeButton?: boolean;
  };
}

const Toast: React.FC<ToastProps> = ({ toast }) => {
  const { removeToast } = useToast();
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!toast.duration || toast.duration <= 0) return;

    const startTime = Date.now();
    const intervalTime = 100;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = 100 - (elapsed / (toast?.duration || 4000)) * 100;
      setProgress(Math.max(0, newProgress));
    }, intervalTime);

    return () => clearInterval(interval);
  }, [toast.duration]);

  useEffect(() => {
    if (progress <= 0) {
      setIsVisible(false); // 2️⃣ Start fade-out
      setTimeout(() => {
        removeToast(toast.id); // 3️⃣ Remove after animation finishes
      }, 300); 
    }
  }, [progress, removeToast, toast.id]);

  const shouldShowProgressBar = toast.progressBar === true;

  return (
    <div
      className={`
        relative w-80 p-4 rounded-lg shadow-md border overflow-hidden
        ${typeClasses[toast.type]} 
        ${toast.className || ''}
        ${isVisible ? 'animate-fadeIn' : 'animate-fadeOut'}
      `}
    >
      <div className="flex items-start">
        {(toast.icon || typeIcons[toast.type]) && (
          <div className="mr-3 mt-0.5">
            {toast.icon || typeIcons[toast.type]}
          </div>
        )}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-800">{toast.message}</p>
        </div>
        {(toast.closeButton === undefined || toast.closeButton) && (
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 text-gray-400 hover:text-gray-500"
            aria-label="Close"
          >
            <FiX size={18} />
          </button>
        )}
      </div>

      {shouldShowProgressBar && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div
            className="h-full bg-gray-400"
            style={{
              width: `${progress}%`,
              transition: 'width 0.001s linear',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Toast;

/*


// Custom icon and position
addToast({
  message: 'Profile updated successfully',
  type: 'success',
  icon: <CustomCheckIcon />,
  position: 'bottom-left',
  className: 'border-2 border-green-500',
});

// Long duration with progress bar
addToast({
  message: 'Processing your request...',
  type: 'info',
  duration: 10000,
  progressBar: true,
});

// Custom JSX message
addToast({
  message: (
    <div>
      <strong>New message received</strong>
      <p className="text-sm">From: John Doe</p>
    </div>
  ),
  type: 'default',
  duration: 5000,
});


Key Features
Multiple Positions - Display toasts in 6 different positions

Various Types - Success, error, warning, info, and default styles

Customizable Duration - Control how long toasts stay visible

Progress Bar - Visual indicator for time remaining

Custom Icons - Override default icons per toast

Animations - Smooth fade-in animations

Manual Dismissal - Option to keep toasts until manually closed

Callback Support - Execute functions when toast closes

Fully Customizable - Override all styles with className

Accessible - Proper ARIA attributes and keyboard handling


*/
