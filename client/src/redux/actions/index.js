import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
      const userById = await axios.get(`/users/${userId}`);
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
      const { name, email, password } = formData;
      const userData = {
        name,
        email,
        password,
      };

      const response = await axios.post("/api/v1/users", userData);
      return response.data;
    } catch (error) {
      throw error.code;
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (loginCredentials) => {
    try {
      const { email, password } = loginCredentials;

      console.log(email, password);
    } catch (error) {
      throw error.code;
    }
  }
);

export const logOutUser = createAsyncThunk("users/logOutUser", async () => {
  try {
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
