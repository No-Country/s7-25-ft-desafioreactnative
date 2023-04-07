import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsers,
  fetchUserById,
  registerUser,
  signInUser,
  logOutUser,
  updateUser,
} from "../actions/userActions";

const initialState = {
  users: "",
  loading: false,
  currentUser: "",
  isLogin: false,
  userById: "",
  error: {},
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
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.userById = action.payload;
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
    builder.addCase(signInUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.token = action.payload.token;
      state.loading = false;
      state.isLogin = true;
    });
    builder.addCase(signInUser.rejected, (state) => {
      state.loading = false;
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
      state.error = {};
    });
    builder.addCase(logOutUser.rejected, (state) => {
      state.loading = false;
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
