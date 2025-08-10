import {
  Sidebar,
  SidebarGroup,
  SidebarOption,
  SidebarOptionWithSubOptions,
  SidebarContent,
  //   useSidebar
} from "@/components/costum/Sidebar"; // Assuming the sidebar component is in a separate file
import { FiTrash2 } from "react-icons/fi";
import { PiDotsThree } from "react-icons/pi";
import RepositorySettings from "./repositorysettings/RepositorySettings";
import { useEffect, useRef, useState } from "react";
import { apiService } from "@/api/apiService";
import { getLocalStorageItem } from "@/utils/storage";
import { useQueryParam } from "@/hooks/useQueryParam";
import type { Repository } from "./repositorysettings/RepositorySelector";
import RepositoryComponent from "./repositories/RepositoryComponent";
import DropdownActionMenu from "@/components/costum/DropdownActionMenu/DropdownActionMenu";

import { MdOutlineAddCircleOutline } from "react-icons/md";
import Dialog from "@/components/costum/Dialog";
import AddGroupDialogBox from "./groups/AddGroupDialogBox";

import { RiGitRepositoryLine } from "react-icons/ri";
import { BiCollection } from "react-icons/bi";
import { RiGitRepositoryCommitsLine } from "react-icons/ri";
import { MdDriveFileRenameOutline } from "react-icons/md";
import AddRepoDialogBox from "./groups/AddRepoDialogBox";
import RenameGroupDialogBox from "./groups/RenameGroupDialogBox";
import { AlertDialog } from "@/components/costum/AlertDialog/AlertDialog";
import { useToast } from "@/components/costum/Toast/ToastContext";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { IoLogoGithub } from "react-icons/io";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { FaKey } from "react-icons/fa";
import PatSettings from "./patsettings/PatSettings";
import GhSettings from "./githubsettings/GhSettings";
import AllGroups from "./groups/AllGroups";

export type GroupType = {
  _id: string;
  clerkId: string;
  createdAt: string; // or `Date` if you're parsing it
  ghUsername: string;
  groupName: string;
  repoIds: any; // assuming repo IDs are strings
  userId: string;
};

const SidebarTabs = () => {
  const userId = getLocalStorageItem("userId");
  const username = useQueryParam("username");
  const { addToast } = useToast();

  const [selectedRepo, setSelectedRepo] = useState<Repository[]>([]);
  const [groupData, setGroupData] = useState<GroupType[]>([]);

  const [groupRepoData, setGroupRepoData] = useState<any>({});

  // console.log(groupRepoData);
  // console.log(groupData);
  const [repoLoading, setRepoLoading] = useState<boolean>(false);
  const [groupLoading, setGroupLoading] = useState<boolean>(true);
  const [repoOption, setRepoOption] = useState<any>([]);

  console.log(groupLoading)

  const [groupName, setGroupName] = useState<any>();
  const [groupId, setGroupId] = useState<string>();
  const [repoId, setRepoId] = useState<string>();

  // console.log(repoOption)

  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<any>(null);

  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const inputRenameRef = useRef<any>(null);

  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const inputGroupRef = useRef<any>(null);

  const [isGroupDeleteOpen, setIsGroupDeleteOpen] = useState(false);
  const [isRepoRemovalOpen, setIsRepoRemovalOpen] = useState(false);

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setRepoLoading(true);

        const allReadySelectedRepo = await apiService.getAllSelectedRepo(
          userId,
          username
        );

        const valueLabelList = allReadySelectedRepo?.data
          ?.filter((repo: any) => !repo.group_id || repo.group_id === "")
          .map((repo: any) => ({
            value: repo._id,
            label: repo.repo_name,
          }));

        setRepoOption(valueLabelList);

        setSelectedRepo(allReadySelectedRepo?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setRepoLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setGroupLoading(true);

        const allGroupData = await apiService.getAllGroups(userId, username);

        setGroupData(allGroupData?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setGroupLoading(false);
      }
    };
    fetchData();
  }, []);

  const getGroupRepos = (groupId: string) => {
    const repo_data = selectedRepo.filter(
      (repo: any) => repo.group_id === groupId
    );

    setGroupRepoData({ ...groupRepoData, [groupId]: repo_data });
  };

  const handleGroupDelete = async (groupId: any) => {
    const reqData = {
      groupId,
      userId,
      ghUsername: username,
    };

    try {
      const post_data = await apiService.deleteGroup(reqData);
      if (post_data.status === false) {
        addToast({
          message: post_data.message || "Something went wrong",
          type: "error",
          duration: 4000,
          closeButton: true,
          position: "top-center",
        });
        return;
      }
      addToast({
        message: "Group deleted successfully",
        type: "success",
        duration: 4000,
        closeButton: true,
        position: "top-center",
      });
      window.location.reload();
    } catch (error) {
      console.error("Unexpected error:", error);
      addToast({
        message: "Unexpected error occurred",
        type: "error",
        duration: 4000,
        closeButton: true,
        position: "top-center",
      });
    }
  };

  const handleRemoveRepoFromGroup = async (repoId: any) => {
    const reqData = {
      repoId,
      userId,
      ghUsername: username,
    };

    try {
      const post_data = await apiService.removeRepoFromGroup(reqData);
      if (post_data.status === false) {
        addToast({
          message: post_data.message || "Something went wrong",
          type: "error",
          duration: 4000,
          closeButton: true,
          position: "top-center",
        });
        return;
      }
      addToast({
        message: "Repository removed successfully",
        type: "success",
        duration: 4000,
        closeButton: true,
        position: "top-center",
      });
      window.location.reload();
    } catch (error) {
      console.error("Unexpected error:", error);
      addToast({
        message: "Unexpected error occurred",
        type: "error",
        duration: 4000,
        closeButton: true,
        position: "top-center",
      });
    }
  };

  return (
    <div className="relative">
      {/* Mobile sidebar toggle button */}
      <button
        className="md:hidden fixed bottom-4 right-4 z-40 bg-vol-600 text-white p-3 rounded-full shadow-lg cursor-pointer"
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      >
        {isMobileSidebarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      <Sidebar
        defaultOption="dashboard"
        storageKey="appSection"
        groupStorageKey="groupName"
        className="flex flex-col md:flex-row h-[calc(100%-12rem)]"
      >
        {/* Sidebar content - hidden on mobile unless toggled */}
        <div
          className={`overflow-auto w-full md:w-[20%] bg-white md:bg-transparent z-30 md:z-auto fixed md:static inset-0 transform ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          {/* Close button for mobile */}
          {/* <button
            className="md:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button> */}

          {/* Projects Group - Collapsible */}
          <SidebarGroup
            title="Groups"
            collapsible
            defaultCollapsed={false}
            rightMenuAction={{
              component: (
                <DropdownActionMenu
                  items={[
                    {
                      id: "creategroup",
                      label: "Create Group",
                      icon: <MdOutlineAddCircleOutline />,
                      className: "text-cgray-dtext hover:text-black",
                      hoverClass: "hover:bg-gray-100 hover:border-gray-200",
                      onClick: () => setIsOpen(true),
                    },
                    { divider: true },
                    {
                      id: "dropallgroups",
                      label: "Drop all Groups",
                      icon: <FiTrash2 />,
                      className: "text-red-500 hover:text-red-700",
                      hoverClass: "hover:bg-red-100 hover:border-red-200",
                      onClick: () => console.log("Delete clicked"),
                    },
                  ]}
                  trigger={() => (
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
            {groupData &&
              groupData.length > 0 &&
              groupData.map((grp: GroupType) => {
                return (
                  <SidebarOptionWithSubOptions
                    key={grp._id}
                    optionId={grp._id}
                    title={grp.groupName}
                    icon={{ Compo: <BiCollection /> }}
                    defaultExpanded={false}
                    activeClassName="bg-vol-50 text-vol-600"
                    inactiveClassName="hover:bg-vol-50"
                    expandedClassName="bg-vol-50"
                    onExpandFunction={() => getGroupRepos(grp._id)}
                    rightMenuAction={{
                      component: (
                        <DropdownActionMenu
                          items={[
                            {
                              id: "addrepo",
                              label: "Add Repository",
                              icon: <RiGitRepositoryCommitsLine />,
                              className: "text-cgray-dtext hover:text-black",
                              hoverClass:
                                "hover:bg-gray-100 hover:border-gray-200",
                              onClick: () => {
                                setIsGroupOpen(true);
                                setGroupName(grp.groupName);
                              },
                            },
                            {
                              id: "renamerepo",
                              label: "Rename",
                              icon: <MdDriveFileRenameOutline />,
                              className: "text-cgray-dtext hover:text-black",
                              hoverClass:
                                "hover:bg-gray-100 hover:border-gray-200",
                              onClick: () => {
                                setIsRenameOpen(true);
                                setGroupId(grp._id);
                                setGroupName(grp.groupName);
                              },
                            },
                            { divider: true },
                            {
                              id: "deletegroup",
                              label: "Delete",
                              icon: <FiTrash2 />,
                              className: "text-red-500 hover:text-red-700",
                              hoverClass:
                                "hover:bg-red-100 hover:border-red-200",
                              onClick: () => {
                                setIsGroupDeleteOpen(true);
                                setGroupId(grp._id);
                              },
                            },
                          ]}
                          trigger={() => <PiDotsThree />}
                          position="bottom-right"
                          menuClassName="w-48"
                        />
                      ),
                    }}
                    subOptions={
                      groupRepoData?.[grp._id] &&
                      groupRepoData[grp._id]?.map((repo: any) => {
                        return {
                          optionId: repo.node_id,
                          callbackFunction: () => {
                            setIsMobileSidebarOpen(false);
                          },
                          children: repo.repo_name,
                          icon: <RiGitRepositoryLine />,
                          rightAction: {
                            icon: (
                              <IoMdRemoveCircleOutline className="text-xs cursor-pointer" />
                            ),
                            onClick: () => {
                              setIsRepoRemovalOpen(true);
                              setRepoId(repo._id);
                            },
                            className: "text-gray-400 hover:text-gray-600",
                          },
                        };
                      })
                    }
                    subOptionActiveClassName="bg-vol-100 text-vol-700 ml-4 pl-2"
                    subOptionInactiveClassName="hover:bg-vol-50 ml-4 pl-2"
                    subOptionRightActionClassName="px-2 text-gray-400 hover:text-gray-600"
                  />
                );
              })}
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
                    callbackFunction={() => {
                      setIsMobileSidebarOpen(false);
                    }}
                    optionId={repo.node_id}
                    activeClassName="bg-vol-50 text-vol-600"
                  >
                    <span className="flex items-center gap-2">
                      <RiGitRepositoryLine />

                      <span>{repo.repo_name}</span>
                    </span>
                  </SidebarOption>
                );
              })}
          </SidebarGroup>

          {/* Team Group - With nested options */}
          <SidebarGroup title="Settings">
            <SidebarOption
              optionId="github"
              callbackFunction={() => {
                setIsMobileSidebarOpen(false);
              }}
              activeClassName="bg-vol-50 text-vol-600"
            >
              <span className="flex items-center gap-2 ">
                <span>
                  <IoLogoGithub />
                </span>
                <span>Github</span>
              </span>
            </SidebarOption>
            <SidebarOption
              callbackFunction={() => {
                setIsMobileSidebarOpen(false);
              }}
              optionId="repository"
              activeClassName="bg-vol-50 text-vol-600"
            >
              <span className="flex items-center gap-2 ">
                <span>
                  <RiGitRepositoryPrivateFill />
                </span>
                <span>Repository</span>
              </span>
            </SidebarOption>
            <SidebarOption
              callbackFunction={() => {
                setIsMobileSidebarOpen(false);
              }}
              optionId="pat"
              activeClassName="bg-vol-50 text-vol-600"
            >
              <span className="flex items-center gap-2 ">
                <span>
                  <FaKey />
                </span>
                <span>PAT</span>
              </span>
            </SidebarOption>
          </SidebarGroup>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <SidebarContent optionId="dashboard">
            {!groupLoading && <AllGroups groupData={groupData} />}
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
            <GhSettings />
          </SidebarContent>

          <SidebarContent optionId="repository">
            <RepositorySettings />
          </SidebarContent>

          <SidebarContent optionId="pat">
            <PatSettings />
          </SidebarContent>
        </div>
      </Sidebar>

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Group"
        initialFocusRef={inputRef}
        overlayBlur="blur(8px)"
        overlayDarkness="rgba(0, 0, 0, 0.7)"
        overlayClassName="transition-opacity duration-300"
        contentClassName="w-full max-w-xl"
        bodyClassName="bg-white"
        closeButtonClassName="text-gray-500 hover:text-gray-700"
        footerContent={<div className="flex justify-end gap-2"></div>}
      >
        <AddGroupDialogBox repoOption={repoOption} />
      </Dialog>

      <Dialog
        isOpen={isGroupOpen}
        onClose={() => setIsGroupOpen(false)}
        title="Add Group"
        initialFocusRef={inputGroupRef}
        overlayBlur="blur(8px)"
        overlayDarkness="rgba(0, 0, 0, 0.7)"
        overlayClassName="transition-opacity duration-300"
        contentClassName="w-full max-w-xl"
        bodyClassName="bg-white"
        closeButtonClassName="text-gray-500 hover:text-gray-700"
        footerContent={<div className="flex justify-end gap-2"></div>}
      >
        <AddRepoDialogBox repoOption={repoOption} groupName={groupName} />
      </Dialog>

      <Dialog
        isOpen={isRenameOpen}
        onClose={() => setIsRenameOpen(false)}
        title="Rename Group"
        initialFocusRef={inputRenameRef}
        overlayBlur="blur(8px)"
        overlayDarkness="rgba(0, 0, 0, 0.7)"
        overlayClassName="transition-opacity duration-300"
        contentClassName="w-full max-w-xl"
        bodyClassName="bg-white"
        closeButtonClassName="text-gray-500 hover:text-gray-700"
        footerContent={<div className="flex justify-end gap-2"></div>}
      >
        <RenameGroupDialogBox groupId={groupId} groupName={groupName} />
      </Dialog>

      <AlertDialog
        isOpen={isGroupDeleteOpen}
        onClose={() => setIsGroupDeleteOpen(false)}
        title="Confirm Deletion"
        type="error"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => handleGroupDelete(groupId)}
      >
        Are you sure you want to delete this group?
      </AlertDialog>

      <AlertDialog
        isOpen={isRepoRemovalOpen}
        onClose={() => setIsRepoRemovalOpen(false)}
        title="Confirm Removal"
        type="error"
        confirmText="Remove"
        cancelText="Cancel"
        onConfirm={() => handleRemoveRepoFromGroup(repoId)}
      >
        Are you sure you want to remove this repository?
      </AlertDialog>
    </div>
  );
};

// Content Components
const DashboardContent = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
    <p>Welcome to your dashboard. Here's an overview of your activities.</p>
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
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

export default SidebarTabs;
