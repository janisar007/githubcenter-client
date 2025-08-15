import React, { useState, useRef, useEffect } from "react";
import { FiHelpCircle } from "react-icons/fi";

type TooltipPosition =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

type TooltipTrigger = "hover" | "click" | "focus";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: TooltipPosition;
  trigger?: TooltipTrigger;
  delay?: number;
  open?: boolean; // Controlled mode
  onOpenChange?: (isOpen: boolean) => void;
  className?: string;
  tooltipClassName?: string;
  arrowClassName?: string;
  showArrow?: boolean;
  disabled?: boolean;
  offset?: number;
  defaultOpen?: boolean;
  interactive?: boolean; // Allows interacting with tooltip content
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  trigger = "hover",
  delay = 100,
  open: controlledOpen,
  onOpenChange,
  className = "",
  tooltipClassName = "",
  arrowClassName = "",
  showArrow = true,
  disabled = false,
  offset = 8,
  defaultOpen = false,
  interactive = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const timeoutRef = useRef<any>(0);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);

  const isControlled = typeof controlledOpen !== "undefined";
  const open = isControlled ? controlledOpen : isOpen;

  // Handle controlled vs uncontrolled state
  const setOpenState = (newOpen: boolean) => {
    if (!isControlled) {
      setIsOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  // Position calculation
  useEffect(() => {
    if (open && tooltipRef.current && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      switch (position) {
        case "top":
          top = triggerRect.top - tooltipRect.height - offset;
          left =
            triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          break;
        case "bottom":
          top = triggerRect.bottom + offset;
          left =
            triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          break;
        case "left":
          top =
            triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          left = triggerRect.left - tooltipRect.width - offset;
          break;
        case "right":
          top =
            triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          left = triggerRect.right + offset;
          break;
        case "top-left":
          top = triggerRect.top - tooltipRect.height - offset;
          left = triggerRect.left;
          break;
        case "top-right":
          top = triggerRect.top - tooltipRect.height - offset;
          left = triggerRect.right - tooltipRect.width;
          break;
        case "bottom-left":
          top = triggerRect.bottom + offset;
          left = triggerRect.left;
          break;
        case "bottom-right":
          top = triggerRect.bottom + offset;
          left = triggerRect.right - tooltipRect.width;
          break;
      }

      // Boundary checks
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (left < 0) left = 5;
      if (left + tooltipRect.width > viewportWidth)
        left = viewportWidth - tooltipRect.width - 5;
      if (top < 0) top = 5;
      if (top + tooltipRect.height > viewportHeight)
        top = viewportHeight - tooltipRect.height - 5;

      tooltipRef.current.style.top = `${top}px`;
      tooltipRef.current.style.left = `${left}px`;
    }
  }, [open, position, offset]);

  // Event handlers
  const handleMouseEnter = () => {
    if (disabled || trigger !== "hover") return;
    timeoutRef.current = setTimeout(() => setOpenState(true), delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!interactive) setOpenState(false);
  };

  const handleClick = () => {
    if (disabled || trigger !== "click") return;
    setOpenState(!open);
  };

  const handleFocus = () => {
    if (disabled || trigger !== "focus") return;
    setOpenState(true);
  };

  const handleBlur = () => {
    if (disabled || trigger !== "focus") return;
    setOpenState(false);
  };

  // Clean up timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Clone child to add ref and event handlers
  const triggerElement = React.cloneElement(
  children as React.ReactElement<any>,
  {
    ref: triggerRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    onFocus: handleFocus,
    onBlur: handleBlur,
    "aria-describedby": open ? "tooltip-content" : undefined,
  }
);

  // Arrow position styles
  const getArrowPosition = () => {
    switch (position) {
      case "top":
        return "bottom-0 left-1/2 -translate-x-1/2 translate-y-full";
      case "bottom":
        return "top-0 left-1/2 -translate-x-1/2 -translate-y-full";
      case "left":
        return "right-0 top-1/2 -translate-y-1/2 translate-x-full";
      case "right":
        return "left-0 top-1/2 -translate-y-1/2 -translate-x-full";
      case "top-left":
        return "bottom-0 left-4 translate-y-full";
      case "top-right":
        return "bottom-0 right-4 translate-y-full";
      case "bottom-left":
        return "top-0 left-4 -translate-y-full";
      case "bottom-right":
        return "top-0 right-4 -translate-y-full";
      default:
        return "";
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {triggerElement}

      {open && !disabled && (
        <div
          ref={tooltipRef}
          id="tooltip-content"
          role="tooltip"
          className={`
            fixed z-50 px-3 py-2 text-sm rounded shadow-lg bg-gray-800 text-white
            animate-fadeInTooltip ${tooltipClassName}
            ${interactive ? "pointer-events-auto" : "pointer-events-none"}
          `}
          onMouseEnter={interactive ? handleMouseEnter : undefined}
          onMouseLeave={interactive ? handleMouseLeave : undefined}
        >
          {content}
          {showArrow && (
            <div
              className={`
                absolute w-2 h-2 bg-gray-800 transform rotate-45
                ${getArrowPosition()} ${arrowClassName}
              `}
            />
          )}
        </div>
      )}
    </div>
  );
};

// CSS for animation (add to your global styles)
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(-5px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// .animate-fadeIn {
//   animation: fadeIn 0.2s ease-out forwards;
// }

export default Tooltip;
