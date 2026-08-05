import { QnaEntry } from "@/components/Qna/QnaCard";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QnaBookmarkState {
  items: QnaEntry[];
}

const initialState: QnaBookmarkState = {
  items: [],
};

const qnaBookmarkSlice = createSlice({
  name: "qnaBookmark",
  initialState,
  reducers: {
    addQnaBookmark(state, action: PayloadAction<QnaEntry>) {
      const newItem = action.payload;
      const exists = state.items.some((item) => item.id === newItem.id);

      if (!exists) {
        state.items.unshift(newItem); // keep newest at the front
      }
    },
    removeQnaBookmark(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setQnaBookmarks(state, action: PayloadAction<QnaEntry[]>) {
      state.items = action.payload;
    },
    clearQnaBookmarks(state) {
      state.items = [];
    },
  },
});

export const { addQnaBookmark, removeQnaBookmark, setQnaBookmarks, clearQnaBookmarks } =
  qnaBookmarkSlice.actions;

export default qnaBookmarkSlice.reducer;
