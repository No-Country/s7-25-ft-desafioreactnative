import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsers,
  fetchUserById,
  registerUser,
  loginUser,
  logOutUser,
  updateUser,
} from "../actions";

const initialState = {
  users: [],
  loading: false,
  currentUser: [],
  isLogin: false,
  userById: [],
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
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.currentUser = [];
      state.isLogin = false;
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
