import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../service/auth";

const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {    
    try {
      const response = await login(email, password);
      return response;
    } catch (error) {
      return rejectWithValue(error || "Login failed");
    }
  }
);

export { loginUser };
