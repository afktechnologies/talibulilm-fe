import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QuranLastReadItem {
  surahNumber: number;
  surahNameEn: string;
  surahNameAr: string;
  surahSlug: string;
  ayahNumber: number;
}

interface QuranLastReadState {
  items: QuranLastReadItem[];
}

const initialState: QuranLastReadState = {
  items: [],
};

const quranLastReadSlice = createSlice({
  name: "quranLastRead",
  initialState,
  reducers: {
    setQuranLastRead(state, action: PayloadAction<QuranLastReadItem[]>) {
      state.items = action.payload;
    },
    addQuranLastRead(state, action: PayloadAction<QuranLastReadItem>) {
      const newItem = action.payload;

      // Check if surah already exists
      const existingIndex = state.items.findIndex(
        (i) => i.surahNumber === newItem.surahNumber
      );

      if (existingIndex !== -1) {
        // Update ayahNumber for existing surah
        const updatedItem = {
          ...state.items[existingIndex],
          ayahNumber: newItem.ayahNumber,
        };
        // Remove old position
        state.items.splice(existingIndex, 1);
        // Put updated item at front
        state.items.unshift(updatedItem);
      } else {
        // Add new surah item
        state.items.unshift(newItem);
      }

      // Keep only 10
      if (state.items.length > 10) {
        state.items = state.items.slice(0, 10);
      }
    },
    clearQuranLastRead(state) {
      state.items = [];
    },
  },
});

export const { setQuranLastRead, addQuranLastRead, clearQuranLastRead } = quranLastReadSlice.actions;
export default quranLastReadSlice.reducer;
