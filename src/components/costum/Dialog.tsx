import React, { useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  closeButtonClassName?: string;
  overlayBlur?: string;
  overlayDarkness?: string;
  disableClickOutsideClose?: boolean;
  disableEscapeClose?: boolean;
  showCloseButton?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
  footerContent?: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className = '',
  overlayClassName = '',
  contentClassName = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  closeButtonClassName = '',
  overlayBlur = 'blur(4px)',
  overlayDarkness = 'rgba(0, 0, 0, 0.5)',
  disableClickOutsideClose = false,
  disableEscapeClose = false,
  showCloseButton = true,
  initialFocusRef,
  footerContent,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !disableEscapeClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Set initial focus
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else if (dialogRef.current) {
        dialogRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, disableEscapeClose, onClose, initialFocusRef]);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${className}`}
      role="dialog"
      aria-modal="true"
    >
      {/* Customizable Backdrop */}
      <div
        className={`fixed inset-0 transition-opacity ${overlayClassName} animated-dotted-overlay`}
        style={{
          backdropFilter: overlayBlur,
          backgroundColor: overlayDarkness,
        }}
        onClick={disableClickOutsideClose ? undefined : onClose}
      />

      {/* Dialog Content */}
      <div
        ref={dialogRef}
        className={`relative bg-white rounded-lg shadow-xl max-w-full max-h-[90vh] overflow-y-auto flex flex-col ${contentClassName}`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className={`flex items-center justify-between p-4 border-b ${headerClassName}`}>
            {title && <h2 className="text-xl font-semibold">{title}</h2>}
            {showCloseButton && (
              <button
                type="button"
                className={`p-1 rounded-full hover:bg-gray-100 ${closeButtonClassName}`}
                onClick={onClose}
                aria-label="Close dialog"
              >
                <FiX className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className={`flex-1 p-4 ${bodyClassName}`}>
          {children}
        </div>

        {/* Footer */}
        {footerContent && (
          <div className={`p-4 border-t ${footerClassName}`}>
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dialog;