import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { API } from "@/app/api/api";

import { ProfileValues } from "@/types/profile";
//------------------------------------------------------------

export const getProfile = createAsyncThunk(
  "user/fetch-profile",
  async (
    { session, status }: { session: any; status: any },
    { rejectWithValue }
  ) => {
    if (status === "authenticated" && session?.user?.access_token) {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-access-token": session.user?.access_token,
        },
      };

      try {
        const response = await API.get(`/getProfile`, config);
        if (response.status !== 200) {
          throw new Error("Failed to get profile");
        }

        const result = await response.data.data;
        return result;
      } catch (error) {
        return rejectWithValue(
          (error as Error).message || "Failed to get profile"
        );
      }
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/update-profile",
  async (
    { formData, session }: { formData: any; session: any },
    { rejectWithValue }
  ) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        "x-access-token": session.user?.access_token,
      },
    };

    try {
      const response = await API.put(`/updateProfile`, formData, config);
      if (response.status === 200) {
        const result = await response.data;
        return result;
      }
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || "Failed to update profile"
      );
    }
  }
);

type profileState = {
  profile: ProfileValues;
  loading: boolean;
  error: null | any;
};

const initialStateProfile: profileState = {
  profile: {} as ProfileValues,
  loading: false,
  error: null,
};

const profileSlices = createSlice({
  name: "profileSlices",
  initialState: initialStateProfile,
  reducers: {
    Profile: (state, action: PayloadAction<ProfileValues>) => {
      state.profile = action.payload;
    },
    RemoveInterest: (state, action: PayloadAction<string>) => {
      state.profile.interests = state.profile.interests.filter(
        (interest) => interest !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getProfile.fulfilled,
      (state, action: PayloadAction<ProfileValues>) => {
        state.loading = false;
        state.profile = action.payload;
      }
    );
    builder.addCase(getProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateProfile.fulfilled,
      (state, action: PayloadAction<ProfileValues>) => {
        state.loading = false;
        state.profile = action.payload;
      }
    );
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // builder.addCase(
    //   updateProfile.fulfilled,
    //   (state, action: PayloadAction<ProfileValues>) => {
    //     state.loading = false;
    //     state.profile.id === action.payload.id ? action.payload : state.profile;
    //   }
    // );
  },
});

export const { Profile } = profileSlices.actions;
export default profileSlices.reducer;
