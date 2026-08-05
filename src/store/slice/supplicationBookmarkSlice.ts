import { DuaEntry } from "@/components/Supplication/Dua/DuaCard";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SupplicationBookmarkState {
  items: DuaEntry[];
}

const initialState: SupplicationBookmarkState = {
  items: [],
};

const supplicationBookmarkSlice = createSlice({
  name: "supplicationBookmark",
  initialState,
  reducers: {
    addSupplicationBookmark(state, action: PayloadAction<DuaEntry>) {
      const newItem = action.payload;
      const exists = state.items.some((item) => item.id === newItem.id);

      if (!exists) {
        state.items.unshift(newItem); // keep newest at the front
      }
    },
    removeSupplicationBookmark(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setSupplicationBookmarks(state, action: PayloadAction<DuaEntry[]>) {
      state.items = action.payload;
    },
    clearSupplicationBookmarks(state) {
      state.items = [];
    },
  },
});

export const {
  addSupplicationBookmark,
  removeSupplicationBookmark,
  setSupplicationBookmarks,
  clearSupplicationBookmarks,
} = supplicationBookmarkSlice.actions;

export default supplicationBookmarkSlice.reducer;
