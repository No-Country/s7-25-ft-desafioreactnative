import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsers,
  fetchUserById,
  registerUser,
  signInUser,
  logOutUser,
  updateUser,
  forgotPassword,
} from "../actions/userActions";

const initialState = {
  users: "",
  loading: false,
  currentUser: "",
  isLogin: false,
  userById: "",
  error: null,
  reqStatus: null,
};

const usersReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    actionLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = null;
    });
    builder.addCase(fetchUserById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.userById = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.userById = null;
      state.loading = false;
    });

    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.reqStatus = `${action.meta.requestStatus}`;
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(signInUser.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.token = action.payload.token;
      state.loading = false;
      state.isLogin = true;
      state.error = null;
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.loading = false;
      state.reqStatus = `${action.meta.requestStatus}`;
      state.error = action.error.message;
    });
    builder.addCase(logOutUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.currentUser = "";
      state.isLogin = false;
      state.token = "";
      state.users = "";
      state.loading = false;
      state.userById = "";
      state.error = null;
    });
    builder.addCase(logOutUser.rejected, (state) => {
      state.loading = false;
      state.reqStatus = `${action.meta.requestStatus}`;
      state.error = action.error.message;
    });
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
      state.reqStatus = null;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.currentUser = "";
      state.isLogin = false;
      state.token = "";
      state.users = "";
      state.loading = false;
      state.userById = "";
      state.error = {};
      state.reqStatus = `${action.payload.data.status}`;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.reqStatus = `${action.meta.requestStatus}`;
      state.error = action.error.message;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      const { formData, profile_pic } = action.meta.arg;
      state.currentUser = {
        ...state.currentUser,
        ...{
          data: {
            ...state.currentUser.data,
            ...formData,
            profile_pic: profile_pic,
          },
        },
      };
    });
  },
});

export const { actionLogin } = usersReducer.actions;

export default usersReducer.reducer;
