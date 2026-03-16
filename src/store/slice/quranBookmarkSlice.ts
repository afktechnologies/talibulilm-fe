import { AyahListWithTranslation } from "@/types/surah";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuranBookmarkState {
  items: AyahListWithTranslation[];
}

const initialState: QuranBookmarkState = {
  items: [],
};

const quranBookmarkSlice = createSlice({
  name: "quranBookmark",
  initialState,
  reducers: {
    addQuranBookmark(state, action: PayloadAction<AyahListWithTranslation>) {
      const newItem = action.payload;
      const exists = state.items.some((item) => item.id === newItem.id);

      if (!exists) {
        state.items.unshift(newItem); // keep newest at the front
      }
    },
    removeQuranBookmark(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearQuranBookmarks(state) {
      state.items = [];
    },
  },
});

export const { addQuranBookmark, removeQuranBookmark, clearQuranBookmarks } =
  quranBookmarkSlice.actions;

export default quranBookmarkSlice.reducer;
