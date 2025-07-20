import { baseService } from "./baseService";

export const apiService = {
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

  //------------------------------------------------------------------
  getSinglePost: async (post_id: string | null) => {
    return baseService
      .get(
        `/admin/get/singlepost?org_id=${localStorage.getItem(
          "orgId"
        )}&user_id=${localStorage.getItem("userId")}&post_id=${post_id}`
      )
      .then((response) => response.data) // Extract and return the data
      .catch((error) => {
        console.error("Error fetching post:", error);
        throw error; // Re-throw the error after logging
      });
  },

  getAllUserPost: async () => {
    return baseService
      .get(
        `/admin/get/alluserpost?org_id=${localStorage.getItem(
          "orgId"
        )}&user_id=${localStorage.getItem("userId")}`
      )
      .then((response) => response.data) // Extract and return the data
      .catch((error) => {
        console.error("Error fetching post:", error);
        throw error; // Re-throw the error after logging
      });
  },

  getAllPost: async (data: any) => {
    return baseService
      .get(
        `/admin/get/allpost?org_id=${localStorage.getItem(
          "orgId"
        )}&user_id=${localStorage.getItem("userId")}&page=${data.page}&limit=${
          data.limit
        }`
      )
      .then((response) => response.data) // Extract and return the data
      .catch((error) => {
        console.error("Error fetching post:", error);
        throw error; // Re-throw the error after logging
      });
  },
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
