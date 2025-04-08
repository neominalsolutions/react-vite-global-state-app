import { lazy, Suspense } from 'react';

const Demo1 = lazy(() => import('../pages/components/demo1'));
const Demo2 = lazy(() => import('../pages/components/demo2'));

function LazyDemo() {
	return (
		<>
			<Suspense fallback={<>Loading</>}>
				<Demo1 />
				<br></br>
				<Demo2 />
			</Suspense>
		</>
	);
}

export default LazyDemo;
