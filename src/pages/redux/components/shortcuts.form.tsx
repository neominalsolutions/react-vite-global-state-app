import { useRef } from 'react';
import { addNew, ShortCut } from '../../../redux/short-cuts/short-cuts.slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';

function ShortCutsForm() {
	const titleInputRef = useRef<HTMLInputElement>(null);
	const linkInputRef = useRef<HTMLInputElement>(null);

	// action tetiklemek için react-redux hook olan dispatch hook kullanırız.
	const dispatch = useDispatch<AppDispatch>();

	const onFormSubmit = () => {
		const title = titleInputRef.current?.value;
		const link = linkInputRef.current?.value;

		const formData = { title, link } as ShortCut;
		// viewden action tetikleyerek redux state güncelledik.
		dispatch(addNew(formData));
	};

	return (
		<form>
			<input ref={titleInputRef} placeholder="title" />
			<br></br>
			<input ref={linkInputRef} placeholder="link" />
			<input type="submit" value="ekle" onClick={onFormSubmit} />
		</form>
	);
}

export default ShortCutsForm;
