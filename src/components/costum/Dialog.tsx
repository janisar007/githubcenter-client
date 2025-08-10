import React, { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";

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
  className = "",
  overlayClassName = "",
  contentClassName = "",
  headerClassName = "",
  // bodyClassName = "",
  footerClassName = "",
  closeButtonClassName = "",
  overlayBlur = "blur(4px)",
  // overlayDarkness = "rgba(0, 0, 0, 0)",
  disableClickOutsideClose = false,
  disableEscapeClose = false,
  showCloseButton = true,
  initialFocusRef,
  footerContent,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const dotSize = 2.5;
    const dotSpacing = 6;
    const cols = Math.ceil(width / dotSpacing);
    const rows = Math.ceil(height / dotSpacing);

    // SPEED CONTROL (lower = faster)
    const fadeSpeed = 0.02; // Opacity change per frame

    // Create a 2D array to store opacity and direction (1 = fade in, -1 = fade out)
    const dots: { opacity: number; direction: 1 | -1 }[][] = Array.from(
      { length: rows },
      () =>
        Array.from({ length: cols }, () => ({
          opacity: Math.random() * 0.15,
          direction: Math.random() < 0.5 ? 1 : -1,
        }))
    );

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const dot = dots[row][col];

          // Update opacity
          dot.opacity += dot.direction * fadeSpeed;

          // Reverse direction if limits hit
          if (dot.opacity >= 0.15) {
            dot.opacity = 0.15;
            dot.direction = -1;
          } else if (dot.opacity <= 0) {
            dot.opacity = 0;
            dot.direction = 1;
          }

          ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`;
          ctx.fillRect(col * dotSpacing, row * dotSpacing, dotSize, dotSize);
        }
      }
    };

    let animationId: number;
    const animate = () => {
      // draw();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      // window.removeEventListener("resize", resize);
    };
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !disableEscapeClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Set initial focus
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else if (dialogRef.current) {
        dialogRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, disableEscapeClose, onClose, initialFocusRef]);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center hide-scrollbar justify-center p-4 ${className}`}
      role="dialog"
      aria-modal="true"
    >
      {/* Customizable Backdrop */}
      <canvas
        // ref={canvasRef}
        className={`fixed inset-0 z-40 ${overlayClassName}`}
        style={{
          backdropFilter: overlayBlur,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          pointerEvents: "auto", // allow click propagation if needed
        }}
        onClick={disableClickOutsideClose ? undefined : onClose}
      />

      {/* Dialog Content */}
      <div
        ref={dialogRef}
        className={`relative bg-vol-50 rounded-lg shadow-xl hide-scrollbar max-w-full max-h-[90vh] overflow-y-auto flex flex-col ${contentClassName}`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div
            className={`flex items-center bg-vol-50 justify-between p-4 border-b-[0.09rem] ${headerClassName}`}
          >
            {title && <h2 className="text-lg text-cgray-dtext font-semibold">{title}</h2>}
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
        <div className={`flex-1 overflow-y-auto p-4 rounded-b-xl border-b-[0.09rem] border-vol-200 shadow-sm  bg-white `}>{children}</div>

        {/* Footer */}
        {footerContent && (
          <div className={`p-4  bg-vol-50 ${footerClassName}`}>
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dialog;
