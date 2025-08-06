import React, { useState, useRef, useEffect } from 'react';
import { FiCheck } from 'react-icons/fi';

interface DropdownItem {
  id?: string;
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
  className?: string;
  hoverClass?: string;
  activeClassName?: string;
  disabledClassName?: string;
  
  active?: boolean; // Indicates if this item is currently active/selected
}

interface DropdownActionMenuProps {
  items: DropdownItem[];
  trigger: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  className?: string;
  menuClassName?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  disabledItemClassName?: string;
  dividerClassName?: string;
  closeOnSelect?: boolean;
  hoverClass?: string;
  closeOnClickOutside?: boolean;
  isOpen?: boolean; // Controlled mode
  onOpenChange?: (isOpen: boolean) => void;
  align?: 'start' | 'center' | 'end';
  offset?: number;
  preventScroll?: boolean;
}

const DropdownActionMenu: React.FC<DropdownActionMenuProps> = ({
  items,
  trigger,
  position = 'top-right',
  className = '',
  menuClassName = 'min-w-[200px]',
  itemClassName = 'px-1',
  activeItemClassName = '',
  disabledItemClassName = 'cursor-not-allowed',
  dividerClassName = 'border-t border-gray-200 my-1 w-[96%]',
  closeOnSelect = true,
  closeOnClickOutside = true,
  isOpen: controlledIsOpen,
  onOpenChange,
  align = 'start',
  offset = 2,
  preventScroll = false,
}) => {
    const [offSet, setOffSet] = useState<string>(`mt-${offset}`);
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isControlled = typeof controlledIsOpen !== 'undefined';
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  // Handle click outside
  useEffect(() => {
    if (!closeOnClickOutside) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (!isControlled) {
          setInternalIsOpen(false);
        }
        onOpenChange?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeOnClickOutside, isControlled, onOpenChange]);

  // Handle scroll and resize
  useEffect(() => {
    if (!isOpen) return;

    const handleScrollResize = () => {
      // Reposition logic could be added here
    };

    window.addEventListener('scroll', handleScrollResize, { capture: true });
    window.addEventListener('resize', handleScrollResize);
    return () => {
      window.removeEventListener('scroll', handleScrollResize, { capture: true });
      window.removeEventListener('resize', handleScrollResize);
    };
  }, [isOpen]);

  useEffect(() => {

    setOffSet(`mt-${offset}`)

  }, [offset, isOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (preventScroll && isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, preventScroll]);

  const toggleMenu = () => {
    if (!isControlled) {
      setInternalIsOpen(!isOpen);
    }
    onOpenChange?.(!isOpen);
  };

  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled) return;
    item.onClick?.();
    if (closeOnSelect) {
      if (!isControlled) {
        setInternalIsOpen(false);
      }
      onOpenChange?.(false);
    }
  };

  // Position classes
  const getPositionClasses = () => {
    const vertical = position.startsWith('top') ? 'bottom-full' : 'top-full';
    const horizontal = position.endsWith('left') ? 'left-0' : 'right-0';
    return `${vertical} ${horizontal}`;
  };

  // Alignment classes
  const getAlignClasses = () => {
    switch (align) {
      case 'center': return 'items-center';
      case 'end': return 'items-end';
      default: return 'items-start';
    }
  };

  return (
    <div 
      ref={dropdownRef}
      className={`relative inline-block ${className}`}
    >
      {/* Trigger */}
      <div 
        onClick={toggleMenu}
        className={`cursor-pointer p-[0.15rem]  ${isOpen ? "bg-gray-50 border-gray-200 border-[0.09rem] rounded-sm" : "hover:bg-gray-50 hover:border-gray-200 border-white border-[0.09rem] rounded-sm"}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {typeof trigger === 'function' ? trigger(isOpen) : trigger}
      </div>

      {/* Menu */}
      {isOpen && (
        <div
          className={`
            absolute z-50 ${offSet} ${getPositionClasses()} ${getAlignClasses()}
            bg-white shadow-lg rounded-md border border-gray-200
            overflow-hidden py-1 ${menuClassName}
            animate-fadeInDropDown
          `}
        >
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item.divider ? (
                <div className='flex items-center justify-center'>
                    <div className={dividerClassName} />

                </div>
              ) : (
                <div
                  onClick={() => handleItemClick(item)}
                  className={`
                    flex items-center justify-between w-full text-left 
                    ${itemClassName} 
                    ${item.disabled ? disabledItemClassName : ' cursor-pointer '}
                    ${item.className || ''}
                    ${item.activeClassName || activeItemClassName}
                    ${item.disabledClassName || disabledItemClassName}
                  `}
                  aria-disabled={item.disabled}
                >
                  <div className={`backdrop-blur-xs backdrop-grayscale font-semibold flex items-center hover:border-[0.01rem] pl-[0.30rem] border-white border w-full rounded-sm p-1 text-xs  ${item.hoverClass}`}>
                    
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    <span>{item.label}</span>
                  </div>
                  {item.active && <FiCheck className="ml-2" />}
                </div>
              )}
            </React.Fragment>
          ))}
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

export default DropdownActionMenu;