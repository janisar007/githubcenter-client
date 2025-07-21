import { useEffect, useState } from "react";
import RepositorySelector from "./RepositorySelector";

const RepositorySettings = () => {
  const [repos, setRepos] = useState<any>([
    {
      id: 12232,
      name: "belsoft librica",
      full_name: "belsoft librica",
      description: "this is a java buidlpack child buildpack.",
      html_url: "https://www.github.com/janisar007/belsoft-librica",
      stargazers_count: 12,
      language: "golang",
      is_selected: false,
    },
    {
      id: 53423,
      name: "watchecx",
      full_name: "watchecx",
      description: "this is a global buidlpack for securepack buildpack.",
      html_url: "https://www.github.com/janisar007/watchecx",
      stargazers_count: 5,
      language: "golang",
      is_selected: false,
    },
    {
      id: 3343,
      name: "npm-run",
      full_name: "npm run",
      description: "this is a nodesjs buidlpack child buildpack.",
      html_url: "https://www.github.com/janisar007/npm-run",
      stargazers_count: 14,
      language: "golang",
      is_selected: false,
    },
    {
      id: 90865,
      name: "env-lib",
      full_name: "env lib",
      description: "this is a global buidlpack for securepack buildpack.",
      html_url: "https://www.github.com/janisar007/env-lib",
      stargazers_count: 19,
      language: "golang",
      is_selected: false,
    },
    {
      id: 5567,
      name: "gradle",
      full_name: "gradle",
      description: "this is a java env buidlpack child buildpack.",
      html_url: "https://www.github.com/janisar007/gradle",
      stargazers_count: 21,
      language: "golang",
      is_selected: false,
    },
    {
      id: 1253,
      name: "mavin",
      full_name: "mavin",
      description: "this is a java buidlpack for securepack buildpack.",
      html_url: "https://www.github.com/janisar007/mavin",
      stargazers_count: 76,
      language: "golang",
      is_selected: false,
    },
  ]);
  const [selectedRepos, setSelectedRepos] = useState<any>([]);

  // Fetch repositories (example)
  useEffect(() => {
    const fetchRepos = async () => {
      // const response = await fetch('https://api.github.com/user/repos', {
      //   headers: {
      //     Authorization: `token YOUR_GITHUB_PAT`
      //   }
      // });
      // const data = await response.json();
      // setRepos(data);
      // Load initially selected repos from your backend
      // const savedRepos = await fetchSavedRepos();
      // setSelectedRepos(savedRepos);
    };

    fetchRepos();
  }, []);

  const handleSave = async () => {
    // Save selectedRepos to your database
    // await saveToDatabase(selectedRepos);

    console.log(selectedRepos);
  };

  return (
    <div className="h-screen p-6">
      <RepositorySelector
        allRepositories={repos}
        initiallySelected={selectedRepos}
        onSelectionChange={setSelectedRepos}
        className="h-[63%] rounded-lg flex gap-8 "
        searchContainerClassName="flex-1 p-[0.20rem] rounded-lg bg-cgray-second "
        selectedContainerClassName="w-80 even-shadow h-[21.7rem] p-4 custom-scrollbar overflow-y-auto border rounded-lg bg-white"
        // renderRepoIcon={(repo) => (
        //   <img
        //     src={`https://github.com/${repo.owner.login}.png?size=40`}
        //     className="w-6 h-6 rounded-full mr-3"
        //     alt=""
        //   />
        // )}
        showRepoDetails={true}
      />

      <button onClick={handleSave} className="blue-button mt-2">
        Save Selection
      </button>
    </div>
  );
};

export default RepositorySettings;
