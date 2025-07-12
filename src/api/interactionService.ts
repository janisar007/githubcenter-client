import { baseService } from "./baseService";

export const interactionService = {
  registerInteraction: (payload:any) => {
    return baseService.post("/admin/register/interaction", payload);
  },
};