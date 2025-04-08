import { FC, StrictMode, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import {
	CounterContext,
	CounterContextType,
	CounterProvider,
} from './contexts/counter.context.tsx';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routing.tsx';

export const CounterView: FC = () => {
	// state bu component içinde ekranda göstermemiz lazım

	// useContext hook ile global state erişimi yaptık.
	// CounterContext'e eriştik
	const { state } = useContext(CounterContext) as CounterContextType;

	return (
		<>
			<h1>CounterView</h1>
			<p>Güncel Değer: {state.count}</p>
		</>
	);
};

export const CounterActions: FC = () => {
	// başka bir component de ise func props yollamadan ilgili state değerine erişmemiz lazım

	const { reset, increase, decrease } = useContext(
		CounterContext
	) as CounterContextType;

	const onIncrease = () => {
		increase(); // action tetikleme
	};

	const onDecrease = () => {
		decrease();
	};

	const onReset = () => {
		reset();
	};

	return (
		<>
			<h1>CounterActions</h1>
			<button onClick={onIncrease}>(+)</button>
			<button onClick={onDecrease}>(-)</button>
			<button onClick={onReset}>(reset)</button>
		</>
	);
};

// Hangi Componentler bu state paylaşacak ise ilgili Provider Component ile bunları sarmallamak
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<CounterProvider>
			{/* <CounterView />
			<hr></hr>
			<CounterActions /> */}
			<RouterProvider router={router} />
      {/* Router içersinde tanımlı tüm componentler CounterProvider ile sarmallandığı için tüm uygulama genelinde componentler arası state paylaşımı yapabiliriz. */}
		</CounterProvider>
	</StrictMode>
);
