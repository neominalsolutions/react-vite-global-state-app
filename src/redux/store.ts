// Not: 1.aşama Store oluşturma, Her uygulama için 1 adet store yeterlidir.

import { configureStore } from '@reduxjs/toolkit';
import { ShortCutsReducer } from './short-cuts/short-cuts.slice';
// ...
// 4.adım Store'a reducer tanıtımı.
export const store = configureStore({
	reducer: {
		shortCutsState: ShortCutsReducer, // state ismi ve görevli olduğu function yazılır
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
