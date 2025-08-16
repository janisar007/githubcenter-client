import type { SelectRemovePostData } from "@/pages/private/Configures/components/repositorysettings/RepositorySettings";
import { baseService } from "./baseService";
import type { ReposRequestType } from "@/pages/private/Configures/components/repositories/RepositoryComponent";

export const apiService = {

  //----patapiservices----
  addPat: async (formData: any) => {
    try {
      const response = await baseService.post("/pat/create/pat", formData);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  updatePat: async (formData: any) => {
    try {
      const response = await baseService.put("/pat/update/pat", formData);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  renamePat: async (formData: any) => {
    try {
      const response = await baseService.put("/pat/rename/patname", formData);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  getPatDetails: async (reqData:any) => {
    try {
      const response = await baseService.get(`/pat/get/patDetails?userId=${reqData.userId}&ghUsername=${reqData.ghUsername}`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  //----ghapiservices----
  getAllGhInfo: async (userId: string | null) => {
    try {
      const response = await baseService.get(`/gh/get/allGh?userId=${userId}`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  getGhAccountDetails: async (reqData:any) => {
    try {
      const response = await baseService.get(`/gh/get/ghaccountdetails?userId=${reqData.userId}&ghUsername=${reqData.ghUsername}`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  removeGhAccount: async (reqData:any) => {
    try {
      const response = await baseService.delete(`/gh/remove/ghaccount?userId=${reqData.userId}&ghUsername=${reqData.ghUsername}`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  resetGhAccount: async (reqData:any) => {
    try {
      const response = await baseService.delete(`/gh/reset/ghaccount?userId=${reqData.userId}&ghUsername=${reqData.ghUsername}`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  //----userapiservices----
  getUserInfo: async (clerkId: string, email: string) => {
    try {
      const response = await baseService.get(
        `/users/get/user?clerkId=${clerkId}&email=${email}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  //----repoapiservices----
  getRepoFromGhApi: async (
    clerkId: string | undefined,
    userId: string | null,
    username: string | null
  ) => {
    try {
      const response = await baseService.get(
        `/repo/get/allrepofromghapi?clerkId=${clerkId}&userId=${userId}&username=${username}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  getAllSelectedRepo: async (
    userId: string | null,
    username: string | null
  ) => {
    try {
      const response = await baseService.get(
        `/repo/get/allselectedrepo?userId=${userId}&username=${username}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  postSaveRemoveRepos: async (selectedRepos: SelectRemovePostData) => {
    try {
      const response = await baseService.post(
        `/repo/post/saveremoverepo`,
        selectedRepos
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  //post is beacuse, there is repo variable which is a list of objects.
  getPrWorkflowInfo: async (reposRequest: ReposRequestType, userId: string | null, username: string | null) => {
    try {
      const response = await baseService.post(
        `/repo/get/repoprworkflowinfo`,
        { repos:reposRequest, userId, username }
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  //----groupapiservices----
  getAllGroups: async (
    userId: string | null,
    username: string | null
  ) => {
    try {
      const response = await baseService.get(
        `/group/get/allgroups?userId=${userId}&ghUsername=${username}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  createGroupAndAddRepo: async (reqData: any) => {
    try {
      const response = await baseService.post(
        `/group/post/creategroupandaddrepo`,
        reqData
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  },
  
  updateGroup: async (reqData: any) => {
    try {
      const response = await baseService.put(
        `/group/put/group`,
        reqData
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  },
  
  removeRepoFromGroup: async (reqData: any) => {
    try {
      const response = await baseService.put(
        `/group/remove/fromgroup`,
        reqData
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  deleteGroup: async (reqData: any) => {
    try {
      const response = await baseService.delete(
        `/group/delete/group?groupId=${reqData.groupId}&userId=${reqData.userId}&ghUsername=${reqData.ghUsername}`,
        reqData
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  //----groupapiservices----

  getPrReview: async (
    userId: string | null,
    username: string | null,
    repo:string, pullNumber: number
  ) => {
    try {
      const response = await baseService.get(
        `/pr/get/review?userId=${userId}&ghUsername=${username}&repo=${repo}&pullNumber=${pullNumber}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  },


  

};

