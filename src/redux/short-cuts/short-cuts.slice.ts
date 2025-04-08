// 3. adım slice geliştirilmesi
// Senaryo kullanıcı sitede gezinti yaparken kendine kısayol ekleyebilir.

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ShortCut {
	title: string;
	link: string;
}

interface ShortCutsState {
	items: ShortCut[];
}

const initState: ShortCutsState = { items: [] };

const ShortCutsSlice = createSlice({
	name: 'ShortCuts', // prefix
	initialState: initState,
	reducers: {
		// state değiştiren actionlar
		addNew: (state: ShortCutsState, action: PayloadAction<ShortCut>) => {
			// Not: action payload => actiona gönderilen veri
			// action type ise action verilen isim ShortCuts/AddNew Type
			state.items.push(action.payload);
		},
		deleteOne: (state: ShortCutsState, action: PayloadAction<string>) => {
			// silinecekler dışındakileri listele
			state.items = state.items.filter((x) => x.title != action.payload);
		},
	},
});

// actionları çağırmak için useDispatch hook kullanacağız
export const { addNew, deleteOne } = ShortCutsSlice.actions;
// reducerları ise store içerisine combine edicez.
export const ShortCutsReducer = ShortCutsSlice.reducer;
