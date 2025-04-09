import { useEffect } from 'react';

function Demo1() {
	const loadData = async () => {
		const promise = new Promise((resolve) => {
			setTimeout(() => {
				console.log('data-resolve');
				resolve([{ id: 1, name: 'test' }]);
			}, 20000);
		});

		return await promise;
	};

	useEffect(() => {
		loadData();
	}, []);

	return <>Demo1</>;
}

export default Demo1;
