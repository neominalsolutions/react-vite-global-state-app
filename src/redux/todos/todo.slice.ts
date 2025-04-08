import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../../models/todo.model';

export interface TodoState {
	data: Todo[]; // asenkron çalışırken data ismini kullanalım
	loading: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error: any;
	fetched: boolean;
}

const initState: TodoState = {
	data: [],
	loading: false,
	error: null,
	fetched: false,
};

// Not: sadece async functionlar dispatch ile tetiklenir, async işlemlerde süreç kendi içindeki builder.case üzerinden yürütülür.extraReducers dışarı bu sebeple export edilmez.
export const fetchTodos = createAsyncThunk('FETCH-TODOS', async () => {
	return fetch('https://jsonplaceholder.typicode.com/todos').then((response) =>
		response.json()
	);
});

const TodoSlice = createSlice({
	name: 'TODOS',
	initialState: initState,
	reducers: {
		// senkron çalışan state ifadeleri için kullanılan yapı
		// formdan eklenen bir verinin form işlemi sonrasında state yansıtılmasını sağlayan reducer
		addItem: (state: TodoState, action: PayloadAction<Todo>) => {
			state.data.push(action.payload);
		},
	},
	extraReducers(builder) {
		// aseknron ifadeler için ise kullanalım
		builder.addCase(fetchTodos.pending, (state: TodoState) => {
			state.loading = true; // verinin çekilme anında loading true olsun
		});
		builder.addCase(
			fetchTodos.fulfilled,
			(state: TodoState, action: PayloadAction<Todo[]>) => {
				state.loading = false;
				state.fetched = true;
				state.data = action.payload;
			}
		);
		builder.addCase(
			fetchTodos.rejected,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(state: TodoState, action: PayloadAction<any>) => {
				state.loading = false;
				state.fetched = false;
				state.data = [];
				state.error = action.payload;
			}
		);
	},
});

export const { addItem } = TodoSlice.actions; // reducerdan çıkan actionlar
export const TodoReducer = TodoSlice.reducer;
