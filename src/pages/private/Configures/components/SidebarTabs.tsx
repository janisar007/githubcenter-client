import {
  Sidebar,
  SidebarGroup,
  SidebarOption,
  SidebarOptionWithSubOptions,
  SidebarContent,
  //   useSidebar
} from "@/components/costum/Sidebar"; // Assuming the sidebar component is in a separate file
import SelectRepos from "./SelectRepos";
import { FiChevronDown, FiEdit, FiEdit2, FiSettings, FiTrash2 } from "react-icons/fi";
import { PiDotsThree } from "react-icons/pi";
import RepositorySettings from "./repositorysettings/RepositorySettings";
import { useEffect, useState } from "react";
import { apiService } from "@/api/apiService";
import { getLocalStorageItem } from "@/utils/storage";
import { useQueryParam } from "@/hooks/useQueryParam";
import type { Repository } from "./repositorysettings/RepositorySelector";
import RepositoryComponent from "./repositories/RepositoryComponent";
import DropdownActionMenu from "@/components/costum/DropdownActionMenu/DropdownActionMenu";

const SidebarTabs = () => {
  const userId = getLocalStorageItem("userId");
  const username = useQueryParam("username");

  const [selectedRepo, setSelectedRepo] = useState<Repository[]>([]);

  // console.log(selectedRepo)
  const [repoLoading, setRepoLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setRepoLoading(true);

        const allReadySelectedRepo = await apiService.getAllSelectedRepo(
          userId,
          username
        );
        setSelectedRepo(allReadySelectedRepo?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setRepoLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="">
      <Sidebar
        defaultOption="dashboard"
        storageKey="appSection"
        className="flex h-[calc(100%-12rem)] "
      >
        {/* Dashboard Group */}
        <div className=" overflow-auto  w-[20%]">
          {/* Projects Group - Collapsible */}
          <SidebarGroup
            title="Groups"
            collapsible
            defaultCollapsed={false}
            // rightAction={{
            //   icon: <FiSettings />,
            //   onClick: () => console.log("Main settings 2 action"),
            //   className: "text-blue-500",
            // }}
            rightMenuAction={{
              component: (
                <DropdownActionMenu
                  items={[
                    {
                      id: "edit",
                      label: "Edit",
                      icon: <FiEdit />,
                      className: "text-cgray-dtext hover:text-black",
                      hoverClass: "hover:bg-gray-100 hover:border-gray-200",
                      onClick: () => console.log("Edit clicked"),
                    },
                    { divider: true },
                    {
                      id: "delete",
                      label: "Delete",
                      icon: <FiTrash2 />,
                      className: "text-red-500 hover:text-red-700",
                      hoverClass: "hover:bg-red-100 hover:border-red-200",
                      onClick: () => console.log("Delete clicked"),
                    },
                  ]}
                  trigger={(isOpen) => (
                    <PiDotsThree
                      // className={` hover:bg-gray-50 hover:border-gray-200 hover:border-[0.09rem] hover:rounded-sm ${
                      //   isOpen ? "bg-gray-50 border-[0.09rem] p-[10px] rounded-sm border-gray-200" : "px-[0.1rem]"
                      // }`}

                      
                    />
                  )}
                  position="bottom-right"
                  menuClassName="w-48"
                />
              ),
            }}
          >
            <SidebarOptionWithSubOptions
              optionId="group-1"
              title="group 1"
              defaultExpanded={true}
              activeClassName="bg-green-50 text-green-600"
              inactiveClassName="hover:bg-green-50"
              expandedClassName="bg-green-50"
              rightAction={{
                icon: <FiSettings />,
                onClick: () => console.log("Main settings action"),
                className: "text-blue-500",
              }}
              subOptions={[
                {
                  optionId: "repo-1",
                  children: "Repo 1",
                  rightAction: {
                    icon: <FiEdit2 />,
                    onClick: () => console.log("Edit profile"),
                    className: "text-gray-400 hover:text-gray-600",
                  },
                },
              ]}
              subOptionActiveClassName="bg-green-100 text-green-700 pl-7"
              subOptionInactiveClassName="hover:bg-green-50 pl-7"
              subOptionRightActionClassName="px-2 text-gray-400 hover:text-gray-600"
            />
          </SidebarGroup>

          <SidebarGroup
            title="Repositories"
            collapsible
            defaultCollapsed={false}
          >
            {!repoLoading &&
              selectedRepo?.map((repo) => {
                return (
                  <SidebarOption
                    key={repo.node_id}
                    optionId={repo.node_id}
                    activeClassName="bg-green-50 text-green-600"
                    rightAction={{
                      icon: <span className="text-xs">↗</span>,
                      onClick: (e) => {
                        e.stopPropagation();
                        alert("Opening archived projects in new window");
                      },
                      className: "hover:text-green-700",
                    }}
                  >
                    {repo.repo_name}
                  </SidebarOption>
                );
              })}
          </SidebarGroup>

          {/* Team Group - With nested options */}
          <SidebarGroup title="Settings">
            <SidebarOption
              optionId="github"
              activeClassName="bg-purple-50 text-purple-600"
              rightAction={{
                icon: <span className="text-xs">↗</span>,
                onClick: (e) => {
                  e.stopPropagation();
                  alert("Opening archived projects in new window");
                },
                className: "hover:text-green-700",
              }}
            >
              Github
            </SidebarOption>
            <SidebarOption
              optionId="repository"
              activeClassName="bg-purple-50 text-purple-600"
              rightAction={{
                icon: <span className="text-xs">↗</span>,
                onClick: (e) => {
                  e.stopPropagation();
                  alert("Opening archived projects in new window");
                },
                className: "hover:text-green-700",
              }}
            >
              Repository
            </SidebarOption>
            <SidebarOption
              optionId="pat"
              activeClassName="bg-purple-50 text-purple-600"
              rightAction={{
                icon: <span className="text-xs">↗</span>,
                onClick: (e) => {
                  e.stopPropagation();
                  alert("Opening archived projects in new window");
                },
                className: "hover:text-green-700",
              }}
            >
              PAT
            </SidebarOption>
          </SidebarGroup>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <SidebarContent optionId="dashboard">
            <DashboardContent />
          </SidebarContent>

          <SidebarContent optionId="repo-1">
            <CalendarContent />
          </SidebarContent>

          {selectedRepo.map((repo) => {
            return (
              <SidebarContent key={repo.node_id} optionId={repo.node_id}>
                <RepositoryComponent
                  repo_name={repo.repo_name}
                  username={username}
                  userId={userId}
                />
              </SidebarContent>
            );
          })}

          <SidebarContent optionId="github">
            <ProjectContent name="Github Name" />
          </SidebarContent>

          <SidebarContent optionId="repository">
            <RepositorySettings />
          </SidebarContent>

          <SidebarContent optionId="pat">
            <ProjectContent name="PAT Name" />
          </SidebarContent>
        </div>
      </Sidebar>
    </div>
  );
};

// Content Components
const DashboardContent = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <SelectRepos />
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

const ProjectContent = ({ name }: { name: string }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-2xl font-bold mb-4">{name} Project</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-green-50 p-4 rounded">
        <h3 className="font-semibold">Tasks</h3>
        <ul className="mt-2 space-y-1">
          {["Design", "Development", "Testing", "Deployment"].map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      </div>
      <div className="bg-green-50 p-4 rounded">
        <h3 className="font-semibold">Team Members</h3>
        <ul className="mt-2 space-y-1">
          {["Alice", "Bob", "Charlie"].map((member) => (
            <li key={member}>{member}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default SidebarTabs;
