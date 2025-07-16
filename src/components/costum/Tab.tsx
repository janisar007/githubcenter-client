// TabContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface TabContextProps {
  selectedTab: string;
  setSelectedTab: (tabId: string) => void;
}

const TabContext = createContext<TabContextProps | undefined>(undefined);

export const useTab = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTab must be used within a TabProvider');
  }
  return context;
};

interface TabProviderProps {
  children: React.ReactNode;
  defaultTab?: string;
  storageKey?: string;
}

export const TabProvider: React.FC<TabProviderProps> = ({
  children,
  defaultTab = '',
  storageKey = 'tab',
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlTab = searchParams.get(storageKey);
  const [selectedTab, setSelectedTab] = useState(urlTab || defaultTab);

  useEffect(() => {
    if (selectedTab) {
      searchParams.set(storageKey, selectedTab);
      setSearchParams(searchParams, { replace: true });
    }
  }, [selectedTab, storageKey, searchParams, setSearchParams]);

  return (
    <TabContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </TabContext.Provider>
  );
};


// Tabs.tsx

interface TabsProps {
  children: React.ReactNode;
  className?: string;
  tabListClassName?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  children,
  className = '',
  tabListClassName = 'flex space-x-2',
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div role="tablist" className={tabListClassName}>
        {children}
      </div>
    </div>
  );
};


// Tab.tsx

interface TabProps {
  tabId: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  disabled?: boolean;
}

export const Tab: React.FC<TabProps> = ({
  tabId,
  children,
  className = 'px-4 py-2 font-medium text-sm rounded-t-lg',
  activeClassName = 'bg-blue-500 text-white',
  inactiveClassName = 'bg-gray-200 text-gray-700 hover:bg-gray-300',
  disabled = false,
}) => {
  const { selectedTab, setSelectedTab } = useTab();

  const isActive = selectedTab === tabId;

  return (
    <button
      role="tab"
      id={`tab-${tabId}`}
      aria-selected={isActive}
      aria-controls={`tabpanel-${tabId}`}
      tabIndex={isActive ? 0 : -1}
      onClick={() => !disabled && setSelectedTab(tabId)}
      disabled={disabled}
      className={`${className} ${isActive ? activeClassName : inactiveClassName} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } transition-colors duration-200 focus:outline-none`}
    >
      {children}
    </button>
  );
};



interface TabPanelProps {
  tabId: string;
  children: React.ReactNode;
  className?: string;
  unmountOnExit?: boolean;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  tabId,
  children,
  className = 'p-4 border border-gray-200 rounded-b-lg rounded-tr-lg bg-white',
  unmountOnExit = false,
}) => {
  const { selectedTab } = useTab();

  const isActive = selectedTab === tabId;

  if (unmountOnExit && !isActive) return null;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${tabId}`}
      aria-labelledby={`tab-${tabId}`}
      className={`${className} ${!isActive ? 'hidden' : ''}`}
      tabIndex={0}
    >
      {children}
    </div>
  );
};