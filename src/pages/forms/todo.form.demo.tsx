import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Todo } from '../../models/todo.model';
import { queryClient } from '../../query-client';
import { todoScheme } from './schemes/todo.scheme';

type FormState = {
	title: string;
	completed?: boolean;
};

function TodoFormDemo() {
	console.log('...rendering');

	// mutationFunc mutation işlemini başlatmak için tetiklenecek async func.
	// mutation: asenkron bir istek sonucu ilgili cachlenmiş veride bir güncelleme yapmak.
	const postTodo = async (param: FormState) => {
		return (
			await axios.post('https://jsonplaceholder.typicode.com/todos', param)
		).data;
	};

	const mutation = useMutation({
		mutationKey: ['TodoAdd'], // operasyona ait action Type
		mutationFn: postTodo,
		onSuccess(data) {
			// data apidan dönen response
			// apiden 201
			console.log('args', data);
			// veri setinde güncelle
			// queryClient.invalidateQueries({queryKey:['todos']});

			// veri setindeki sadece ilgili alana ekleme yaptığımız yöntem.
			// veri tekrardan çekilip dom kıyaslanmadan kendimiz manuel işlem sonucunu yönetiyoruz.
			queryClient.setQueryData(['todos'], (old: Todo[]) => {
				return [data, ...old]; // prepend [...old,data] append
			});
		},
		onError(error) {
			console.log('err', error);
		},
	});

	const {
		register, // input ile form state bağlayan func
		handleSubmit, // form gönderimini tetikleyen func
		//watch, // formdaki bir alanı takip eder değişimi yakalayan func
		reset, // form reset
		getValues, // form alanı value alma
		setValue, // dinamik bir şekilde form alanına değer set etme.
		formState: { errors, isValid }, // form hataları form state
	} = useForm({
		defaultValues: {
			title: '',
			completed: false,
		},
		resolver: yupResolver(todoScheme),
	});
	const onSubmit = async (data: FormState) => {
		// api post işlemi yap
		console.log('formData', data);
		await mutation.mutateAsync(data);
		// mutuations
		// react-query ile çekilmiş bir cachle veri seti üzeirnde değişiklik yapma işlemi
	};

	//console.log('tile', watch('title'));

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type="text" {...register('title')} placeholder="title" />
				<p>{errors.title?.message}</p>

				<span>Completed ?</span>
				<input type="checkbox" {...register('completed')} />
				<p>{errors.completed?.message}</p>

				<input disabled={!isValid} type="submit" />
				<button onClick={() => reset()}>Temizle</button>
				<button onClick={() => setValue('title', 'test')}>Set Values</button>
				<button onClick={() => getValues('title')}>GetValues</button>
			</form>
		</>
	);
}

export default TodoFormDemo;
