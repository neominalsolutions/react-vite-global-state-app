import { useEffect } from 'react';

function Demo2() {
	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((data) => {
				console.log('data', data);
			});
	}, []);

	return <>Demo2</>;
}

export default Demo2;
