// Not: 1.aşama Store oluşturma, Her uygulama için 1 adet store yeterlidir.

import { configureStore } from '@reduxjs/toolkit';
import { ShortCutsReducer } from './short-cuts/short-cuts.slice';
import { TodoReducer } from './todos/todo.slice';
// ...
// 4.adım Store'a reducer tanıtımı.
export const store = configureStore({
	reducer: {
		todosState: TodoReducer,
		shortCutsState: ShortCutsReducer, // state ismi ve görevli olduğu function yazılır
	},
	devTools: process.env.NODE_ENV === 'development', // bunu yapmaylı unutmayalım build alırken devtools disable olur.
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
