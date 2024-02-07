import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// -------------------------------------------------------------

interface SelectedImageState {
  selectedImage: string | null;
}

const initialState: SelectedImageState = {
  selectedImage: null,
};

const selectedImageSlice = createSlice({
  name: "selectedImage",
  initialState,
  reducers: {
    setSelectedImage: (state, action: PayloadAction<string | null>) => {
      state.selectedImage = action.payload;
    },
  },
});

export const { setSelectedImage } = selectedImageSlice.actions;
export default selectedImageSlice.reducer;
