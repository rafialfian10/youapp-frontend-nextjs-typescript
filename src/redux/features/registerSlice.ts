import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { API } from "@/app/api/api";

import { RegisterValues } from "@/types/register";
//------------------------------------------------------------

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ formData }: { formData: any }, { rejectWithValue }) => {
    try {
      const response = await API.post("/register", formData);
      if (response.status === 201) {
        const result = await response.data;
        return result;
      }
    } catch (error: any) {
      return rejectWithValue((error as Error).message || "Failed to register");
    }
  }
);

type registerState = {
  register: RegisterValues;
  loading: boolean;
  error: null | any;
};

const initialStateRegister: registerState = {
  register: {} as RegisterValues,
  loading: false,
  error: null,
};

const registerSlices = createSlice({
  name: "registerSlices",
  initialState: initialStateRegister,
  reducers: {
    Register: (state, action: PayloadAction<RegisterValues>) => {
      state.register = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<RegisterValues>) => {
        state.loading = false;
        state.register = action.payload;
      }
    );
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { Register } = registerSlices.actions;
export default registerSlices.reducer;
