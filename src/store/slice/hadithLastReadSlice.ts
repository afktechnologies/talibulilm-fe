import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HadithLastReadItem {
  bookName: string | undefined;
  bookRef: string;
  hadithId: number | undefined;
  bookSlug: string | undefined;
  collectionId: number | undefined;
  chapterNumber: number;
}

interface HadithLastReadState {
  items: HadithLastReadItem[];
}

const initialState: HadithLastReadState = {
  items: [],
};

const hadithLastReadSlice = createSlice({
  name: "hadithLastRead",
  initialState,
  reducers: {
    setHadithLastRead(state, action: PayloadAction<HadithLastReadItem[]>) {
      state.items = action.payload;
    },
    addHadithLastRead(state, action: PayloadAction<HadithLastReadItem>) {
      const newItem = action.payload;

      // find by bookSlug
      const existingIndex = state.items.findIndex(
        (i) => i.bookSlug === newItem.bookSlug
      );

      if (existingIndex !== -1) {
        const existingItem = state.items[existingIndex];

        if (existingItem.collectionId === newItem.collectionId) {
          // update existing item (same book + same collectionId)
          const updatedItem = {
            ...existingItem,
            bookRef: newItem.bookRef,
            hadithId: newItem.hadithId,
            chapterNumber: newItem.chapterNumber,
          };
          // remove old and move updated to front
          state.items.splice(existingIndex, 1);
          state.items.unshift(updatedItem);
        } else {
          // same bookSlug but different collection → new item
          state.items.unshift(newItem);
        }
      } else {
        // totally new bookSlug → new item
        state.items.unshift(newItem);
      }

      // keep only latest 10
      if (state.items.length > 10) {
        state.items = state.items.slice(0, 10);
      }
    },
    clearHadithLastRead(state) {
      state.items = [];
    },
  },
});

export const { setHadithLastRead, addHadithLastRead, clearHadithLastRead } =
  hadithLastReadSlice.actions;

export default hadithLastReadSlice.reducer;
