import { Tab, TabPanel, TabProvider, Tabs } from "@/components/costum/Tab";
import SidebarTabs from "./components/SidebarTabs";
import Tooltip from "@/components/costum/Tooltip/Tooltip";

export default function Configures() {
  return (
    <div className=" ">
      <TabProvider defaultTab="configures" storageKey="activeTab">
        <Tabs
          className="mb-4 bg-cgray-second border-cgray-border border-[0.09rem]"
          tabListClassName="flex space-x-1"
        >
          {/* <Tab
            tabId="dashboard"
            //   className="px-3 py-1 text-sm"
            activeClassName="text-cgray-dtext border-b-[0.09rem] border-gray-800"
            inactiveClassName="bg-none text-cgray-ntext border-none"
          >
            Dashboard
          </Tab> */}
          <Tab
            tabId="configures"
            activeClassName="text-cgray-dtext border-b-[0.09rem] border-gray-800"
            inactiveClassName="bg-none text-cgray-ntext border-none"
          >
            Configures
          </Tab>

          <Tab
            tabId="analytics"
            activeClassName="text-cgray-dtext border-b-[0.09rem] border-gray-800"
            inactiveClassName="bg-none text-cgray-ntext border-none"
            disabled
          >
            <Tooltip
              delay={50}
              offset={12}
              content="Comming Soon"
              position="bottom"
              tooltipClassName="bg-vol-950 text-white"
              arrowClassName="bg-vol-950"
            >
              <span>Analytics</span>
            </Tooltip>
          </Tab>
        </Tabs>

        {/* <TabPanel
          tabId="dashboard"
          className="p-4 bg-gray-50 rounded"
        >
          dfff
        </TabPanel> */}

        <TabPanel tabId="configures" className="p-4  rounded">
          <SidebarTabs />
        </TabPanel>

        <TabPanel tabId="analytics" className="p-4 bg-gray-50 rounded">
          <h2>Analytics Content</h2>
          <p>This is the Analytics tab content.</p>
        </TabPanel>
      </TabProvider>
    </div>
  );
}
