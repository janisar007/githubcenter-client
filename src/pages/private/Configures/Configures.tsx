import { Tab, TabPanel, TabProvider, Tabs } from "@/components/costum/Tab";
import SidebarTabs from "./components/SidebarTabs";

export default function Configures() {
  return (
    <div className=" ">
      <TabProvider defaultTab="dashboard" storageKey="activeTab">
        <Tabs
          className="mb-4 bg-cgray-second border-cgray-border border-[0.09rem]"
          tabListClassName="flex space-x-1"
        >
          <Tab
            tabId="dashboard"
            //   className="px-3 py-1 text-sm"
            activeClassName="text-cgray-dtext border-b-[0.09rem] border-gray-800"
            inactiveClassName="bg-none text-cgray-ntext border-none"
          >
            Dashboard
          </Tab>
          <Tab
            tabId="configures"
            activeClassName="text-cgray-dtext border-b-[0.09rem] border-gray-800"
            inactiveClassName="bg-none text-cgray-ntext border-none"
          >
            Configures
          </Tab>
          <Tab
            tabId="settings"
            activeClassName="text-cgray-dtext border-b-[0.09rem] border-gray-800"
            inactiveClassName="bg-none text-cgray-ntext border-none"
          >
            Settings
          </Tab>
        </Tabs>

        <TabPanel tabId="dashboard" className="p-4 bg-gray-50 rounded">
          <h2>Dashboard Content</h2>
          <p>This is the dashboard tab content.</p>
        </TabPanel>

        <TabPanel tabId="configures" className="p-4  rounded">
          <SidebarTabs />
        </TabPanel>

        <TabPanel tabId="settings" className="p-4 bg-gray-50 rounded">
          <h2>Settings Content</h2>
          <p>This is the settings tab content.</p>
        </TabPanel>
      </TabProvider>
    </div>
  );
}
