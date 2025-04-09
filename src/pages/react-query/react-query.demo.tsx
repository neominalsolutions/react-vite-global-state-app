import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Todo } from '../../models/todo.model';
import { queryClient } from '../../query-client';

const loadAllQueries = async () => {
	const data1 = await fetch('https://jsonplaceholder.typicode.com/todos'); // 7sn
	const data2 = await fetch(`https://jsonplaceholder.typicode.com/posts`); // 5sn

	return { data1, data2 };
};

// servis folder
const fetchTodos = async () => {
	const data = (
		await fetch('https://jsonplaceholder.typicode.com/todos')
	).json();

	return data;
};

const fetchPostById = async (id: number) => {
	const data = (
		await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
	).json();

	return data;
};

function ReactQueryDemo() {
	const [postId, setPostId] = useState<number>(1);

	// queryKey redux slice name gibi verilerin cachelenip saklandığı path
	// queryFn ile asenkron olarak bir çağrı atılıp veri çekilir.
	const query1 = useQuery<Todo[]>({
		queryKey: ['todos'],
		queryFn: async () => fetchTodos(),
		retry: 3, // anlık apide bir kopma olduğu veriyi en az kaç defa deneyeceğimiz kısmı
		refetchOnMount: false, // bu değer true olursa component her doma girişinde veri çeker. default değer performans açısında false olarak ayarlanmıştır.
		refetchOnReconnect: true, // internet kesintisi durumunda
		refetchOnWindowFocus: true, // site içinde farklı tablar arasında gezinti yaparken, verinin bayatlamış olduğunu düşünerek yeniden çekecektir.
		refetchInterval: 3000, // pooling işlemi her 3 saniyede bir güncel veriyi öekip domu günceller.
		staleTime: 1000 * 60 * 5, // veri 5 dakika boyunca fresh sayılır.
	});

	const query2 = useQuery<Todo[]>({
		queryKey: ['posts', postId], // postId değişince yeniden yükleme için useEffect gibi tetiklenir
		queryFn: async () => fetchPostById(postId),
	});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const query3 = useQuery<any>({
		queryKey: ['posts'], // postId değişince yeniden yükleme için useEffect gibi tetiklenir
		queryFn: async () => loadAllQueries(),
	});

	console.log('query3', query3);

	const onDropdownSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setPostId(Number(e.target.value));
	};

	console.log('query2-data', query2.data);

	console.log('isError', query1.isError);

	const onManuelReflesh = () => {
		// mael olarak git çekilen veri ile dom'u kıyasla optimistik update yap.
		// yani değişim varsa uygula, yeniden doma render etmiyor.
		// queryClient.invalidateQueries({ queryKey: ['todos'] });
		// query1.refetch(); // invalidateQueries ile aynı özelliği gösterir

		// veriyi resetleme
		// sıfıran çekip doma yansıtır.
		queryClient.resetQueries({ queryKey: ['todos'], exact: true });
	};

	if (query1.isLoading) return <>Yükleme yapılıyor</>;

	if (query1.isError) return <>{query1.error.message}</>;

	if (query1.isFetched)
		return (
			<>
				<select onChange={onDropdownSelect}>
					<option value={1}>1.Nolu Post</option>
					<option value={2}>2.Nolu Post</option>
					<option value={3}>3.Nolu Post</option>
				</select>
				<button onClick={onManuelReflesh}>Manuel Refresh</button>
				<hr></hr>
				{query1.data?.map((item: Todo) => {
					return <div key={item.id}>{item.title}</div>;
				})}
			</>
		);
	return <></>;
}

export default ReactQueryDemo;
