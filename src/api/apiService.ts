import type { SelectRemovePostData } from "@/pages/private/Configures/components/repositorysettings/RepositorySettings";
import { baseService } from "./baseService";
import type { ReposRequestType } from "@/pages/private/Configures/components/repositories/RepositoryComponent";

export const apiService = {
  //---patapiservices----
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

  //---ghapiservices----

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

  //---userapiservices----
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

  //---repoapiservices----
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

  //------------------------------------------------------------------
};

// export async function apiUpdatePost(post_id:string) { // org done
//     return ApiService.fetchData<any>({
//         url: `admin/update/post`,
//         method: 'put',
//         data: { user_id: localStorage.getItem('userId'), org_id:localStorage.getItem('orgId'), post_id:post_id },
//     }).then((response) => {
//         return response.data
//     })
// }

// export async function apiDeleteSinglePost(post_id:string) { // org done
//     return ApiService.fetchData<any>({
//         url: `admin/delete/singlepost`,
//         method: 'delete',
//         data: { user_id: localStorage.getItem('userId'),
//             org_id:localStorage.getItem('orgId'),
//             post_id:post_id,
//          },
//     }).then((response) => {
//         return response.data
//     })
// }
