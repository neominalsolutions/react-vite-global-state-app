import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

function ShortCutsList() {
	// state seç getir.
	const state = useSelector((state: RootState) => state.shortCutsState);

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
									<button>Delete Item</button>
								</div>
							);
						})}
						<div>Clear Items</div>
					</div>
				)}
			</div>
		</>
	);
}

export default ShortCutsList;
