import { baseService } from "./baseService";

export const recommendationService = {

  getRecommendedPost: async () => {
    return baseService
      .get(
        `/admin/get/recommended/post?org_id=${localStorage.getItem('orgId')}&user_id=${localStorage.getItem('userId')}`
      )
      .then((response) => response.data) 
      .catch((error) => {
        console.error("Error fetching post:", error);
        throw error;
      });
  },
};