import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

let baseAPI = "/api/v1/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const users = await axios.get("/users");
    return users.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId) => {
    try {
      const userById = await axios.get(`${baseAPI}/${userId}`);
      return [userById.data];
    } catch (error) {
      console.log(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (formData) => {
    try {
      const { userName, email, password } = formData;

      const userData = {
        userName: userName.toLowerCase(),
        email: email.toLowerCase(),
        password,
      };

      const response = await axios.post(`${baseAPI}`, userData);

      return response.data;
    } catch (error) {
      throw error.code;
    }
  }
);

export const signInUser = createAsyncThunk(
  "users/loginUser",
  async (loginCredentials) => {
    try {
      const { email, password } = loginCredentials;

      const currentUserData = await axios.post(`${baseAPI}/login`, {
        email,
        password,
      });

      const currentUser = {
        data: currentUserData.data.data.user,
        token: currentUserData.data.data.token,
      };

      return currentUser;
    } catch (error) {
      throw error.code;
    }
  }
);

export const logOutUser = createAsyncThunk("users/logOutUser", async () => {
  try {
    console.log("User has been logged out");
  } catch (error) {
    console.log(error);
  }
});

export const updateUser = createAsyncThunk("users/updateUser", async (data) => {
  try {
    console.log(data);
  } catch (error) {
    throw error.code;
  }
});
