import React, { forwardRef } from "react";
import type { ReactNode } from "react";
import {
  FiAlertTriangle,
  FiInfo,
  FiCheckCircle,
  FiX,
  FiXCircle,
} from "react-icons/fi";
import { useDialog } from "@react-aria/dialog";
import { useOverlay, useModal, DismissButton } from "@react-aria/overlays";
import { FocusScope } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";

type AlertType = "success" | "error" | "warning" | "info" | "custom";

type AlertPosition = 
  | 'center' 
  | 'top-center' 
  | 'top-right' 
  | 'top-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'bottom-left';

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  type?: AlertType;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  position?: AlertPosition;
  offset?: string; // e.g., '1rem', '20px'
  showCloseButton?: boolean;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  titleClassName?: string;
  messageClassName?: string;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
  closeButtonClassName?: string;
  icon?: ReactNode;
  customIcon?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  isDismissable?: boolean;
  preventScroll?: boolean;
}

const AlertDialog = forwardRef<HTMLDivElement, AlertDialogProps>(
  (
    {
      isOpen,
      onClose,
      title,
      children,
      type = "info",
      confirmText = "Confirm",
      cancelText = "Cancel",
      onConfirm,
      onCancel,
      position = 'top-center',
      offset = '1rem',
      showCloseButton = true,
      showCancelButton = true,
      showConfirmButton = true,
      className = "",
      overlayClassName = "",
      contentClassName = "",
      headerClassName = "",
      bodyClassName = "",
      footerClassName = "",
      titleClassName = "",
      messageClassName = "",
      confirmButtonClassName = "",
      cancelButtonClassName = "",
      closeButtonClassName = "",
      icon,
      customIcon,
      size = "md",
      isDismissable = true,
      preventScroll = true,
    },
    ref
  ) => {
    const overlayRef = React.useRef(null);
    const { overlayProps } = useOverlay(
      {
        isOpen,
        onClose,
        isDismissable,
      },
      overlayRef
    );

    const { modalProps } = useModal({ isDisabled: !preventScroll });
    const { dialogProps, titleProps } = useDialog({}, overlayRef);

    if (!isOpen) return null;

    const getPositionClasses = () => {
      switch (position) {
        case 'top-center':
          return `items-start justify-center pt-${offset}`;
        case 'top-right':
          return `items-start justify-end pr-${offset} pt-${offset}`;
        case 'top-left':
          return `items-start justify-start pl-${offset} pt-${offset}`;
        case 'bottom-center':
          return `items-end justify-center pb-${offset}`;
        case 'bottom-right':
          return `items-end justify-end pr-${offset} pb-${offset}`;
        case 'bottom-left':
          return `items-end justify-start pl-${offset} pb-${offset}`;
        default: // center
          return 'items-center justify-center';
      }
    };

    const getIcon = () => {
      if (customIcon) return customIcon;
      switch (type) {
        case "success":
          return <FiCheckCircle className="text-green-500" size={24} />;
        case "error":
          return <FiXCircle className="text-red-500" size={24} />;
        case "warning":
          return <FiAlertTriangle className="text-yellow-500" size={24} />;
        case "info":
          return <FiInfo className="text-blue-500" size={24} />;
        default:
          return null;
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "max-w-xs";
        case "md":
          return "max-w-md";
        case "lg":
          return "max-w-lg";
        case "xl":
          return "max-w-xl";
        default:
          return "max-w-md";
      }
    };

    const getTypeClasses = () => {
      switch (type) {
        case "success":
          return "border-green-100 bg-green-50";
        case "error":
          return "border-red-100 bg-red-50";
        case "warning":
          return "border-yellow-100 bg-yellow-50";
        case "info":
          return "border-blue-100 bg-blue-50";
        default:
          return "border-gray-100 bg-gray-50";
      }
    };

    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${getPositionClasses()} ${overlayClassName}`}
      >
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.4)] bg-opacity-30 backdrop-blur-sm"
          onClick={isDismissable ? onClose : undefined}
        />

        <FocusScope contain restoreFocus autoFocus>
          <div
            {...mergeProps(overlayProps, dialogProps, modalProps)}
            ref={overlayRef}
            className={`
              relative rounded-lg shadow-xl border
              ${getSizeClasses()} w-full
              ${getTypeClasses()}
              ${className}
              ${position !== 'center' ? 'mt-2 mb-2' : ''}
            `}
          >
            {showCloseButton && (
              <button
                onClick={onClose}
                className={`
                  absolute top-3 right-3 p-1 rounded-full
                  hover:bg-gray-200 focus:outline-none
                  ${closeButtonClassName}
                `}
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            )}

            <div className={`p-6 ${contentClassName}`}>
              <div className={`flex items-start ${headerClassName}`}>
                {getIcon() && (
                  <div className="mr-3 mt-0.5 flex-shrink-0">{getIcon()}</div>
                )}
                <div className="flex-1">
                  <h3
                    {...titleProps}
                    className={`
                      text-lg font-medium leading-6 text-gray-900
                      ${titleClassName}
                    `}
                  >
                    {title}
                  </h3>
                </div>
              </div>

              <div className={`mt-4 ${bodyClassName}`}>
                <div className={`text-sm text-gray-600 ${messageClassName}`}>
                  {children}
                </div>
              </div>

              {(showCancelButton || showConfirmButton) && (
                <div
                  className={`
                    mt-6 flex justify-end space-x-3
                    ${footerClassName}
                  `}
                >
                  {showCancelButton && (
                    <button
                      type="button"
                      onClick={() => {
                        onCancel?.();
                        onClose();
                      }}
                      className={`
                        white-button
                        ${cancelButtonClassName}
                      `}
                    >
                      {cancelText}
                    </button>
                  )}

                  {showConfirmButton && (
                    <button
                      type="button"
                      onClick={() => {
                        onConfirm?.();
                        onClose();
                      }}
                      className={`
                        px-4 py-2 rounded-md border border-transparent
                        text-sm font-medium text-white
                        focus:outline-none
                        ${
                          type === "success"
                            ? "green-button"
                            : type === "error"
                            ? "red-button"
                            : type === "warning"
                            ? "yellow-button"
                            : "blue-button"
                        }
                        ${confirmButtonClassName}
                      `}
                    >
                      {confirmText}
                    </button>
                  )}
                </div>
              )}
            </div>

            <DismissButton onDismiss={onClose} />
          </div>
        </FocusScope>
      </div>
    );
  }
);

AlertDialog.displayName = "AlertDialog";

export { AlertDialog };
