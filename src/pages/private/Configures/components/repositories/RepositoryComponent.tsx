import { apiService } from "@/api/apiService"
import { useEffect } from "react"

interface RepositoryComponentType {
  repo_name: string,
  username: string | null,
  userId: string | null,
}

interface RepoType {
  owner: {
    login: string | null;
  };
  name: string;
  full_name: string;
}

export type ReposRequestType = RepoType[];
const RepositoryComponent = ({repo_name, username, userId}: RepositoryComponentType) => {

  useEffect(() => {

    const fetchData = async () => {

      const reposRequest: ReposRequestType = [
        {
          owner: {
            login: username,
          },
          name: repo_name,
          full_name: `${username}/${repo_name}`,
        }
      ]

      try {
        const get_data = await apiService.getPrWorkflowInfo(reposRequest, userId, username);

        console.log(get_data.data);
        
      } catch (error) {
        console.log(error);        
      }
    }

    fetchData();

  }, [repo_name, username])

  return (
    <div>{repo_name}</div>
  )
}

export default RepositoryComponent