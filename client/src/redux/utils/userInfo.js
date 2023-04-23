import { useSelector } from "react-redux";

const userInfo = () => {
  const userState = useSelector((state) => state?.users);

  const loading = userState?.loading,
    user = userState?.currentUser,
    loggedInUser = userState?.isLogin,
    token = userState?.currentUser?.token,
    actionError = userState?.error,
    reqStatus = userState?.reqStatus,
    isLoggedIn = userState?.isLogin,
    users = userState?.users,
    userById = userState?.userById;

  return {
    loading,
    user,
    loggedInUser,
    token,
    actionError,
    reqStatus,
    users,
    isLoggedIn,
    userById,
  };
};
export default userInfo;
