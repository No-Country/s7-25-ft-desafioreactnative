import { useSelector } from "react-redux";

export default userInfo = () => {
  const userState = useSelector((state) => state.users);

  const loading = userState.loading,
    user = userState.currentUser,
    loggedInUser = userState.isLogin,
    token = userState.currentUser.token;

  return { loading, user, loggedInUser, token };
};
