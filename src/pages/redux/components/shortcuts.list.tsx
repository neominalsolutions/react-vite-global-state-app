import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { clear, deleteOne } from '../../../redux/short-cuts/short-cuts.slice';

function ShortCutsList() {
	// state seç getir.
	const state = useSelector((state: RootState) => state.shortCutsState);
	const dispatch = useDispatch<AppDispatch>();

	const onDeleteItem = (title: string) => {
		dispatch(deleteOne(title));
	};

	const onClearItem = () => {
		dispatch(clear());
	};

	return (
		<>
			<h1>ShortCuts</h1>

			<div>
				{state && (
					<div>
						{state.items.map((item) => {
							return (
								<div>
									<div>Title: {item.title}</div>
									<div>Link: {item.link}</div>
									<button onClick={() => onDeleteItem(item.title)}>
										Delete Item
									</button>
								</div>
							);
						})}
						<button onClick={onClearItem}>Clear Items</button>
					</div>
				)}
			</div>
		</>
	);
}

export default ShortCutsList;
