import {
  Sidebar,
  SidebarGroup,
  SidebarOption,
  SidebarOptionWithSubOptions,
  SidebarContent,
  useSidebar
} from '@/components/costum/Sidebar'; // Assuming the sidebar component is in a separate file
import SelectRepos from './SelectRepos';

const SidebarTab = () => {
  return (
    <div className="">
      <Sidebar defaultOption="dashboard" storageKey="appSection" className="flex h-[calc(100vh-8rem)]">
        {/* Dashboard Group */}
        <div className=' overflow-auto'>
        <SidebarGroup title="Main">
          <SidebarOption optionId="dashboard" activeClassName="bg-blue-50 text-blue-600">
            Dashboard
          </SidebarOption>
          <SidebarOption optionId="calendar" activeClassName="bg-blue-50 text-blue-600">
            Calendar
          </SidebarOption>
        </SidebarGroup>

        {/* Projects Group - Collapsible */}
        <SidebarGroup 
          title="Projects" 
          collapsible 
          defaultCollapsed={false}
          titleClassName="text-gray-600 uppercase text-xs font-bold px-3 py-2 flex items-center justify-between hover:bg-gray-50"
        >
          <SidebarOption optionId="all-projects" activeClassName="bg-green-50 text-green-600">
            All Projects
          </SidebarOption>
          <SidebarOptionWithSubOptions
            optionId="current-projects"
            title="Current Projects"
            defaultExpanded={true}
            activeClassName="bg-green-50 text-green-600"
            inactiveClassName="hover:bg-green-50"
            expandedClassName="bg-green-50"
            subOptions={[
              { optionId: "project-alpha", children: "Alpha Project" },
              { optionId: "project-beta", children: "Beta Project" },
              { optionId: "project-gamma", children: "Gamma Project" }
            ]}
            subOptionActiveClassName="bg-green-100 text-green-700"
            subOptionInactiveClassName="hover:bg-green-50"
          />
          <SidebarOption 
            optionId="archived" 
            activeClassName="bg-green-50 text-green-600"
            rightAction={{
              icon: <span className="text-xs">↗</span>,
              onClick: (e) => {
                e.stopPropagation();
                alert('Opening archived projects in new window');
              },
              className: "hover:text-green-700"
            }}
          >
            Archived Projects
          </SidebarOption>
        </SidebarGroup>

        {/* Team Group - With nested options */}
        <SidebarGroup title="Team">
          <SidebarOptionWithSubOptions
            optionId="management"
            title="Management"
            subOptions={[
              { optionId: "ceo", children: "CEO Office" },
              { optionId: "directors", children: "Directors" },
              { optionId: "managers", children: "Managers" }
            ]}
            subOptionActiveClassName="bg-purple-100 text-purple-700"
          />
          <SidebarOption optionId="developers" activeClassName="bg-purple-50 text-purple-600">
            Developers
          </SidebarOption>
          <SidebarOption optionId="designers" activeClassName="bg-purple-50 text-purple-600">
            Designers
          </SidebarOption>
        </SidebarGroup>

        {/* Settings Group - With right actions */}
        <SidebarGroup title="Settings">
          <SidebarOption 
            optionId="account" 
            activeClassName="bg-red-50 text-red-600"
            rightAction={{
              icon: <span className="text-xs">⚙️</span>,
              onClick: (e) => {
                e.stopPropagation();
                alert('Account settings advanced options');
              }
            }}
          >
            Account
          </SidebarOption>
          <SidebarOptionWithSubOptions
            optionId="preferences"
            title="Preferences"
            subOptions={[
              { optionId: "theme", children: "Theme" },
              { optionId: "notifications", children: "Notifications" },
              { optionId: "language", children: "Language" }
            ]}
            subOptionActiveClassName="bg-red-100 text-red-700"
            rightAction={{
              icon: <span className="text-xs">⚙️</span>,
              onClick: (e) => {
                e.stopPropagation();
                alert('Preferences advanced options');
              }
            }}
          />
        </SidebarGroup>

        


        </div>
        {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        <SidebarContent optionId="dashboard">
          <DashboardContent />
        </SidebarContent>
        
        <SidebarContent optionId="calendar">
          <CalendarContent />
        </SidebarContent>
        
        <SidebarContent optionId="all-projects">
          <AllProjectsContent />
        </SidebarContent>
        
        <SidebarContent optionId="project-alpha">
          <ProjectContent name="Alpha" />
        </SidebarContent>
        
        <SidebarContent optionId="project-beta">
          <ProjectContent name="Beta" />
        </SidebarContent>
        
        <SidebarContent optionId="project-gamma">
          <ProjectContent name="Gamma" />
        </SidebarContent>
        
        <SidebarContent optionId="archived">
          <ArchivedProjectsContent />
        </SidebarContent>
        
        <SidebarContent optionId="ceo">
          <TeamContent department="CEO Office" />
        </SidebarContent>
        
        <SidebarContent optionId="directors">
          <TeamContent department="Directors" />
        </SidebarContent>
        
        <SidebarContent optionId="managers">
          <TeamContent department="Managers" />
        </SidebarContent>
        
        <SidebarContent optionId="developers">
          <TeamContent department="Developers" />
        </SidebarContent>
        
        <SidebarContent optionId="designers">
          <TeamContent department="Designers" />
        </SidebarContent>
        
        <SidebarContent optionId="account">
          <AccountSettingsContent />
        </SidebarContent>
        
        <SidebarContent optionId="theme">
          <PreferencesContent section="Theme" />
        </SidebarContent>
        
        <SidebarContent optionId="notifications">
          <PreferencesContent section="Notifications" />
        </SidebarContent>
        
        <SidebarContent optionId="language">
          <PreferencesContent section="Language" />
        </SidebarContent>
      </div>
      </Sidebar>

      
    </div>
  );
};

// Content Components
const DashboardContent = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <SelectRepos/>
    <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
    <p>Welcome to your dashboard. Here's an overview of your activities.</p>
    <div className="mt-4 grid grid-cols-3 gap-4">
      <div className="bg-blue-50 p-4 rounded">Stats 1</div>
      <div className="bg-blue-50 p-4 rounded">Stats 2</div>
      <div className="bg-blue-50 p-4 rounded">Stats 3</div>
    </div>
  </div>
);

const CalendarContent = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-2xl font-bold mb-4">Calendar</h2>
    <p>Your upcoming events and meetings.</p>
    <div className="mt-4 h-64 bg-blue-50 rounded flex items-center justify-center">
      Calendar View
    </div>
  </div>
);

const AllProjectsContent = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-2xl font-bold mb-4">All Projects</h2>
    <ul className="space-y-2">
      {['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'].map(project => (
        <li key={project} className="p-3 bg-green-50 rounded hover:bg-green-100">
          {project} Project
        </li>
      ))}
    </ul>
  </div>
);

const ProjectContent = ({ name }: { name: string }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-2xl font-bold mb-4">{name} Project</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-green-50 p-4 rounded">
        <h3 className="font-semibold">Tasks</h3>
        <ul className="mt-2 space-y-1">
          {['Design', 'Development', 'Testing', 'Deployment'].map(task => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      </div>
      <div className="bg-green-50 p-4 rounded">
        <h3 className="font-semibold">Team Members</h3>
        <ul className="mt-2 space-y-1">
          {['Alice', 'Bob', 'Charlie'].map(member => (
            <li key={member}>{member}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const ArchivedProjectsContent = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-2xl font-bold mb-4">Archived Projects</h2>
    <p>These projects are no longer active but are kept for reference.</p>
    <div className="mt-4 bg-green-50 p-4 rounded opacity-75">
      <p>Delta Project (Archived Jan 2023)</p>
      <p>Epsilon Project (Archived Mar 2023)</p>
    </div>
  </div>
);

const TeamContent = ({ department }: { department: string }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-2xl font-bold mb-4">{department} Team</h2>
    <div className="grid grid-cols-3 gap-4">
      {['Profile', 'Performance', 'Projects'].map(section => (
        <div key={section} className="bg-purple-50 p-4 rounded">
          <h3 className="font-semibold">{section}</h3>
          <p className="mt-2 text-sm">Details about {section.toLowerCase()}</p>
        </div>
      ))}
    </div>
  </div>
);

const AccountSettingsContent = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
    <div className="space-y-4">
      <div className="p-4 bg-red-50 rounded">
        <h3 className="font-semibold">Personal Information</h3>
        <p className="mt-1 text-sm">Update your name, email, and other details</p>
      </div>
      <div className="p-4 bg-red-50 rounded">
        <h3 className="font-semibold">Security</h3>
        <p className="mt-1 text-sm">Change password and security settings</p>
      </div>
    </div>
  </div>
);

const PreferencesContent = ({ section }: { section: string }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-2xl font-bold mb-4">{section} Preferences</h2>
    <div className="bg-red-50 p-4 rounded">
      {section === 'Theme' && (
        <div>
          <p>Choose between light and dark mode:</p>
          <div className="mt-2 space-x-2">
            <button className="px-3 py-1 bg-white rounded">Light</button>
            <button className="px-3 py-1 bg-gray-800 text-white rounded">Dark</button>
          </div>
        </div>
      )}
      {section === 'Notifications' && (
        <div>
          <p>Configure your notification preferences:</p>
          <div className="mt-2 space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Email Notifications
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Push Notifications
            </label>
          </div>
        </div>
      )}
      {section === 'Language' && (
        <div>
          <p>Select your preferred language:</p>
          <select className="mt-2 p-1 bg-white rounded">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
      )}
    </div>
  </div>
);

export default SidebarTab;