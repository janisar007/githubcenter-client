import React, { useState, useEffect, useMemo } from "react";
import {
  FiSearch,
  FiX,
  FiCheck,
  FiGithub,
  FiStar,
  FiCode,
} from "react-icons/fi";
import { BiGitRepoForked } from "react-icons/bi";
interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  is_selected?: boolean;
}

interface RepositorySelectorProps {
  allRepositories: Repository[];
  initiallySelected?: Repository[];
  onSelectionChange?: (selected: Repository[]) => void;
  className?: string;
  searchContainerClassName?: string;
  selectedContainerClassName?: string;
  optionClassName?: string;
  selectedOptionClassName?: string;
  searchInputClassName?: string;
  placeholder?: string;
  renderRepoIcon?: (repo: Repository) => React.ReactNode;
  renderSelectedRepo?: (
    repo: Repository,
    onRemove: () => void
  ) => React.ReactNode;
  showRepoDetails?: boolean;
}

const RepositorySelector: React.FC<RepositorySelectorProps> = ({
  allRepositories,
  initiallySelected = [],
  onSelectionChange,
  className = "flex gap-4 h-full ",
  searchContainerClassName = "flex-1 border-r p-4 ",
  selectedContainerClassName = "w-80 p-4 overflow-y-auto",
  optionClassName = "p-3 border rounded-lg mb-2 hover:bg-gray-50 cursor-pointer",
  selectedOptionClassName = "p-3 border rounded-lg mb-2 bg-blue-50 border-blue-200",
  searchInputClassName = "w-[80%] p-2 rounded-lg mb-4 bg-white mt-4",
  placeholder = "Search repositories...",
  renderRepoIcon,
  renderSelectedRepo,
  showRepoDetails = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRepos, setSelectedRepos] =
    useState<Repository[]>(initiallySelected);

  // Merge initial selected state with all repositories
  const repositories = useMemo(() => {
    return allRepositories.map((repo) => ({
      ...repo,
      is_selected: selectedRepos.some((selected) => selected.id === repo.id),
    }));
  }, [allRepositories, selectedRepos]);

  // Filter repositories based on search term
  const filteredRepos = useMemo(() => {
    return repositories.filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repo.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [repositories, searchTerm]);

  // Handle repo selection
  const toggleRepoSelection = (repo: Repository) => {
    setSelectedRepos((prev) => {
      const isSelected = prev.some((r) => r.id === repo.id);
      const newSelection = isSelected
        ? prev.filter((r) => r.id !== repo.id)
        : [...prev, repo];

      onSelectionChange?.(newSelection);
      return newSelection;
    });
  };

  // Remove selected repo
  const removeSelectedRepo = (repoId: number) => {
    setSelectedRepos((prev) => {
      const newSelection = prev.filter((r) => r.id !== repoId);
      onSelectionChange?.(newSelection);
      return newSelection;
    });
  };

  // Default repo icon renderer
  const defaultRepoIcon = (repo: Repository) => (
    <div className="mr-3 text-gray-500">
      <FiGithub size={20} />
    </div>
  );

  // Default selected repo renderer
  const defaultSelectedRepo = (repo: Repository, onRemove: () => void) => (
    <div
      key={repo.name}
      className="flex items-start justify-between p-3 mb-2 rounded-lg bg-white"
    >
      <div className="flex-1">
        <div className="flex  gap-2 ">
          <div className="">
            <BiGitRepoForked />
          </div>

          <div>
            <div className="font-medium text-cgray-dtext">{repo.name}</div>
            {showRepoDetails && repo.description && (
              <div className="text-xs text-gray-600 mt-1">
                {repo.description}
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="ml-2 text-gray-400 hover:text-red-500"
      >
        <FiX size={18} />
      </button>
    </div>
  );

  return (
    <div className={className}>
      {/* Search and selection area */}
      <div className={searchContainerClassName}>
        <div className="relative flex">
          <FiSearch className="absolute left-7 top-7 text-cgray-dtext" />
          <input
            type="text"
            placeholder={placeholder}
            className={`pl-10 ml-4 transition-shadow duration-500 ease-in-out focus:shadow-[0_0_3px_1px_rgba(0,0,0,0.30)] ${searchInputClassName} border focus:outline-none`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredRepos?.length > 0 ? (
          <div className="mt-2 overflow-y-auto max-h-[calc(100%-5.125rem)] border-cgray-border border bg-white hide-scrollbar p-2 rounded-lg even-shadow">
            {filteredRepos?.length > 0 &&
              filteredRepos?.map((repo) => (
                <div
                  key={repo.id}
                  className={
                    repo.is_selected ? selectedOptionClassName : optionClassName
                  }
                  onClick={() => toggleRepoSelection(repo)}
                >
                  <div className="flex items-center">
                    {renderRepoIcon
                      ? renderRepoIcon(repo)
                      : defaultRepoIcon(repo)}
                    <div className="flex-1">
                      <div className="font-medium text-cgray-dtext">
                        {repo.name}
                      </div>
                      {showRepoDetails && (
                        <>
                          {repo.description && (
                            <div className="text-sm text-gray-600 mt-1">
                              {repo.description}
                            </div>
                          )}
                          <div className="flex items-center mt-2 text-xs text-gray-500 space-x-3">
                            {repo.language && (
                              <span className="flex items-center">
                                <FiCode className="mr-1" /> {repo.language}
                              </span>
                            )}
                            <span className="flex items-center">
                              <FiStar className="mr-1" />{" "}
                              {repo.stargazers_count}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                    {repo.is_selected && (
                      <FiCheck className="ml-2 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-gray-500 pl-5 py-4">No repository found</div>
        )}
      </div>

      {/* Selected repositories area */}
      <div className="bg-cgray-second p-[0.20rem] rounded-lg ">
        <div className="mx-4 mt-4 mb-4 gap-2">
          <h3 className="font-medium text-lg  text-cgray-dtext">
            Selected Repositories ({selectedRepos.length})
          </h3>
          <span className="text-xs text-cblue-100">
            You haven't added any new repositories.
          </span>
        </div>

        <div className={selectedContainerClassName}>
          {selectedRepos.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              No repositories selected yet
            </div>
          ) : (
            selectedRepos.map((repo) =>
              renderSelectedRepo
                ? renderSelectedRepo(repo, () => removeSelectedRepo(repo.id))
                : defaultSelectedRepo(repo, () => removeSelectedRepo(repo.id))
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default RepositorySelector;
