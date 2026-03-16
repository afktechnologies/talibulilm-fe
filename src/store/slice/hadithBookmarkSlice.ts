import { HadithItemList } from "@/types/hadith";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HadithBookmarkState {
  items: HadithItemList[];
}

const initialState: HadithBookmarkState = {
  items: [],
};

const hadithBookmarkSlice = createSlice({
  name: "hadithBookmark",
  initialState,
  reducers: {
    addBookmark(state, action: PayloadAction<HadithItemList>) {
      const newItem = action.payload;
      const exists = state.items.some((item) => item.id === newItem.id);

      if (!exists) {
        state.items.unshift(newItem); // keep newest at front
      }
    },
    removeBookmark(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearBookmarks(state) {
      state.items = [];
    },
  },
});

export const { addBookmark, removeBookmark, clearBookmarks } =
  hadithBookmarkSlice.actions;

export default hadithBookmarkSlice.reducer;
