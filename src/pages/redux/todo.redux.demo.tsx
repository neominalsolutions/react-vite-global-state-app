import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchTodos } from '../../redux/todos/todo.slice';

function TodoReduxDemo() {
	const state = useSelector((state: RootState) => state.todosState);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		// state boş ise yükle
		// sayfa refleshlenirse yeniden apiden yükleme yap.
		if (state.fetched == false) {
			dispatch(fetchTodos());
		}
	}, []);

	// tamamlanmış bir task varsa tamamlamak için kullanılan action
	const onTaskComplete = () => {};

	if (state.loading) return <>... Veri Yükleniyor</>;

	if (state.error) return <>{state.error?.message}</>;

	return (
		<>
			{state.fetched && (
				<>
					{state.data.map((item) => {
						return (
							<div key={item.id}>
								<p>Title: {item.title}</p>
								<p>
									Status:{' '}
									{item.completed ? (
										<>Tamamlandı</>
									) : (
										<>
											<button onClick={onTaskComplete}>Taskı Tamamla</button>
										</>
									)}
								</p>
							</div>
						);
					})}
				</>
			)}
		</>
	);
}

export default TodoReduxDemo;
