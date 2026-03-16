import { combineReducers, configureStore } from "@reduxjs/toolkit";
import quranLastReadReducer from "./slice/quranLastReadSlice";
import quranBookmarkReducer from "./slice/quranBookmarkSlice"
import hadithLastReadReducer from "./slice/hadithLastReadSlice"
import hadithBookmarkReducer from "./slice/hadithBookmarkSlice"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["quranLastRead", "quranBookmark" ,"hadithLastRead", "hadithBookmark"],
};

const rootReducer = {
  quranLastRead: quranLastReadReducer,
  quranBookmark: quranBookmarkReducer,
  hadithLastRead: hadithLastReadReducer,
  hadithBookmark: hadithBookmarkReducer,
};

const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Type helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
