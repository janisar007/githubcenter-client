import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { signOutUser } from "../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const {role, userId, orgId} = useSelector((state: RootState) => state.auth);


  const logout = () => {
    dispatch(signOutUser());
  };

  return { role, logout, userId, orgId };
};
