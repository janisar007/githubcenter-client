import React, { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import { RiArrowRightSFill } from "react-icons/ri";
import { RiArrowDownSFill } from "react-icons/ri";

// Types
interface SidebarContextProps {
  selectedOption: string;
  setSelectedOption: (optionId: string) => void;
  selectedGroup?: string;
  setSelectedGroup?: (groupName: string) => void;
}

interface SidebarGroupProps {
  title: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  rightAction?: {
    icon: React.ReactNode;
    onClick: (e: React.MouseEvent) => void;
    className?: string;
  };
  rightMenuAction?: {
    component: React.ReactNode;
  };
}

interface SidebarOptionProps {
  optionId: string;
  callbackFunction?: () => void,
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  rightAction?: {
    icon: React.ReactNode;
    onClick: (e: React.MouseEvent) => void;
    className?: string;
  };
}

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  storageKey?: string;
  groupStorageKey?: string;
  defaultOption?: string;
}

// Context
const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// Main Component
const Sidebar: React.FC<SidebarProps> = ({
  children,
  className = "flex h-full overflow-hidden", // Added overflow-hidden here
  // contentClassName = "flex-1 p-4 overflow-auto", // Ensure overflow-auto for content
  storageKey = "sidebarOption",
  groupStorageKey = "groupName",
  defaultOption = "",
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlOption = searchParams.get(storageKey);
  const [selectedOption, setSelectedOption] = useState(
    urlOption || defaultOption
  );

  const urlOption2 = searchParams.get(groupStorageKey);
  const [selectedGroup, setSelectedGroup] = useState(
    urlOption2 || defaultOption
  );

  useEffect(() => {
    if (selectedOption) {
      searchParams.set(storageKey, selectedOption);
      setSearchParams(searchParams, { replace: true });
    }

    searchParams.set(groupStorageKey, selectedGroup);
    setSearchParams(searchParams, { replace: true });
  }, [
    selectedOption,
    storageKey,
    searchParams,
    setSearchParams,
    selectedGroup,
    setSelectedGroup,
  ]);

  return (
    <SidebarContext.Provider
      value={{
        selectedOption,
        setSelectedOption,
        selectedGroup,
        setSelectedGroup,
      }}
    >
      <div className={className}>{children}</div>
    </SidebarContext.Provider>
  );
};

// Sidebar Group Component - Update this part
const SidebarGroup: React.FC<SidebarGroupProps> = ({
  title,
  children,
  collapsible = false,
  defaultCollapsed = false,
  className = "mb-4 border-b-[0.09rem] pb-4",
  titleClassName = "text-gray-600 uppercase text-[0.65rem] font-bold px-2 py-2 flex items-center justify-start gap-[0.25rem] hover:bg-gray-50",
  contentClassName = "mt-1",
  rightAction,
  rightMenuAction,
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <div className={className}>
      <div className="flex items-center justify-between mr-[0.6rem]">
        <div
          className={` ${!collapsible && "ml-[1.21rem]"} ${titleClassName}`}
          onClick={() => collapsible && setCollapsed(!collapsed)}
          style={{ cursor: collapsible ? "pointer" : "default" }}
        >
          {collapsible && (
            <span className="text-gray-400">
              {collapsed ? <RiArrowRightSFill /> : <RiArrowDownSFill />}
            </span>
          )}
          <span>{title}</span>
        </div>

        {rightAction && (
          <span
            className={`ml-2 ${rightAction.className || ""}`}
            onClick={(e) => {
              e.stopPropagation();
              rightAction.onClick(e);
            }}
          >
            {rightAction.icon}
          </span>
        )}

        {rightMenuAction && <span>{rightMenuAction.component}</span>}
      </div>
      {!collapsed && <div className={contentClassName}>{children}</div>}
    </div>
  );
};

// Sidebar Option Component
const SidebarOption: React.FC<SidebarOptionProps> = ({
  optionId,
  callbackFunction,
  children,
  className = "px-3 py-2 text-sm rounded flex items-center justify-between pl-6",
  activeClassName = "bg-gray-100 text-gray-800",
  inactiveClassName = "text-gray-600 hover:bg-gray-50",
  rightAction,
}) => {
  const { selectedOption, setSelectedOption, setSelectedGroup } = useSidebar();
  const isActive = selectedOption === optionId;

  return (
    <button
      className={`${className} ${
        isActive ? activeClassName : inactiveClassName
      } transition-colors duration-200 w-full text-left`}
      onClick={() => {
        setSelectedOption(optionId); setSelectedGroup?.("");
        callbackFunction?.();
      }}
    >
      <span>{children}</span>
      {rightAction && (
        <span
          className={`ml-2 ${rightAction.className || ""}`}
          onClick={(e) => {
            e.stopPropagation();
            rightAction.onClick(e);
          }}
        >
          {rightAction.icon}
        </span>
      )}
    </button>
  );
};

// Sidebar Option With SubOptions Component
interface SubOption {
  optionId: string;
  callbackFunction?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  rightAction?: {
    icon: React.ReactNode;
    onClick: (e: React.MouseEvent) => void;
    className?: string;
  };
}

interface SidebarOptionWithSubOptionsProps
  extends Omit<SidebarOptionProps, "children"> {
  title: string;
  icon?: any;
  subOptions: SubOption[];
  defaultExpanded?: boolean;
  expandedClassName?: string;
  collapsedClassName?: string;
  subOptionsContainerClassName?: string;
  subOptionClassName?: string;
  subOptionActiveClassName?: string;
  subOptionInactiveClassName?: string;
  subOptionRightActionClassName?: string;
  onExpandFunction?: () => void;
  rightMenuAction?: {
    component: React.ReactNode;
  };
}

const SidebarOptionWithSubOptions: React.FC<
  SidebarOptionWithSubOptionsProps
> = ({
  optionId,
  title,
  icon,
  subOptions,
  defaultExpanded = false,
  className = "px-3 py-2 text-sm rounded flex items-center font-medium justify-between mb-[0.10rem]",
  activeClassName = "bg-gray-100 text-gray-800",
  inactiveClassName = "text-gray-600 hover:bg-gray-50",
  expandedClassName = "bg-gray-50",
  collapsedClassName = "",
  subOptionsContainerClassName = "ml-4 mt-1 space-y-1",
  subOptionClassName = " py-1.5 text-xs text-cgray-ntext rounded flex items-center justify-between",
  subOptionActiveClassName = "bg-gray-100 text-gray-800",
  subOptionInactiveClassName = "text-gray-600 hover:bg-gray-50",
  subOptionRightActionClassName = "ml-2",
  rightAction,
  rightMenuAction,
  onExpandFunction,
}) => {
  const { selectedOption, setSelectedOption, setSelectedGroup } = useSidebar();
  const [expanded, setExpanded] = useState(defaultExpanded);

  const isSubOptionActive = subOptions?.some(
    (sub) => sub.optionId === selectedOption
  );
  const isActive = selectedOption === optionId || isSubOptionActive;

  // const Icon = icon.Compo;

  return (
    <div>
      <div
        className={`${className} ${
          isActive ? activeClassName : inactiveClassName
        } ${
          expanded ? expandedClassName : collapsedClassName
        } transition-colors duration-200 w-full text-left`}
      >
        <button
          onClick={() => {
            setExpanded(!expanded);
            onExpandFunction?.();
          }}
        >
          <div className="flex items-center gap-2">
            <span className="ml-2">
              {expanded ? (
                <MdOutlineKeyboardArrowDown />
              ) : (
                <MdKeyboardArrowRight />
              )}
            </span>
            <span className="flex items-center gap-2">
              {icon.Compo}

              <span>{title}</span>
            </span>
          </div>
        </button>

        {rightAction && (
          <span
            className={`ml-2 ${rightAction.className || ""}`}
            onClick={(e) => {
              e.stopPropagation();
              rightAction.onClick(e);
            }}
          >
            {rightAction.icon}
          </span>
        )}

        {rightMenuAction && <span>{rightMenuAction.component}</span>}
      </div>

      {expanded && (
        <div className={subOptionsContainerClassName}>
          {subOptions?.map((subOption) => (
            <div
              key={subOption.optionId}
              className="flex items-center justify-between"
            >
              <div
                className={`${subOptionClassName} ${
                  selectedOption === subOption.optionId
                    ? subOptionActiveClassName
                    : subOptionInactiveClassName
                } transition-colors duration-200 w-full text-left cursor-pointer`}
                onClick={() => {
                  setSelectedOption(subOption.optionId);
                  setSelectedGroup?.(title);
                  subOption.callbackFunction?.();
                }}
              >
                <span className="flex items-center gap-2">
                  <span>{subOption.icon}</span>
                  <span>{subOption.children}</span>
                </span>

                {subOption.rightAction && (
                  <div
                    className={`${subOptionRightActionClassName}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      subOption.rightAction?.onClick(e);
                    }}
                  >
                    {subOption.rightAction.icon}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Sidebar Content Component
interface SidebarContentProps {
  optionId: string;
  children: React.ReactNode;
  className?: string;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  optionId,
  children,
  className = "",
}) => {
  const { selectedOption } = useSidebar();
  const isActive = selectedOption === optionId;

  return isActive ? <div className={className}>{children}</div> : null;
};

export {
  Sidebar,
  SidebarGroup,
  SidebarOption,
  SidebarOptionWithSubOptions,
  SidebarContent,
  useSidebar,
};
