import React, { createContext, useEffect, useState } from 'react';

type CounterState = {
	count: number;
};

// state güncelleyecek method ve güncel state bilgilerini bir tip olarak tanımlıyoruz.
export type CounterContextType = {
	state: CounterState;
	reset(): void;
	increase(): void;
	decrease(): void;
	increaseByAmount(nm: number): void;
};

// hangi tipte bir context ile çalışacağımız söyledik
// State ve Actions bilgilerine CounterContext üzerinden Componentlerde UseContext Hook kullanarak erişim yapacağız.
export const CounterContext = createContext<CounterContextType | null>(null);

// Redux daki Reducer'a benzer bir kullanım
// içerisinde stateleri güncelleme yaparız. ve state güncellemeleri için actionlar tanımlarız reset,increase,decrease,increaseByAmount
// 2.aşama action ve state bilgilerini provider dışına çıkarmak
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CounterProvider = ({ children }: React.ReactNode | any) => {
	const [state, setState] = useState<CounterState>({ count: 0 });

	// uygulama ilk açıldığı anda git localstorage bilgi ile state güncelle
	useEffect(() => {
		console.log('app restart');

		const counterState = localStorage.getItem('Counter-State');

		if (counterState) {
			// nesne varsa JSON Parse et
			const counterObject = JSON.parse(counterState);
			setState({ ...state, count: counterObject['count'] });
		}
	}, []);

	const reset = (): void => {
		setState({ ...state, count: 0 }); // ref type çalışırken state nesnesinin virtual dom üzerinde güncel referansının yeniden alınması lazım

		localStorage.setItem('Counter-State', JSON.stringify({ count: 0 }));
	};

	const increase = (): void => {
		setState({ ...state, count: state.count + 1 });
		localStorage.setItem(
			'Counter-State',
			JSON.stringify({ count: state.count })
		);
	};

	const decrease = (): void => {
		setState({ ...state, count: state.count - 1 });
		localStorage.setItem(
			'Counter-State',
			JSON.stringify({ count: state.count })
		);
	};

	const increaseByAmount = (nm: number): void => {
		setState({ ...state, count: state.count + nm });
		localStorage.setItem(
			'Counter-State',
			JSON.stringify({ count: state.count })
		);
	};

	const values = { state, reset, increase, decrease, increaseByAmount };
	// Counter Context üzerindeki Providerdan values değerlerine diğer componentler erişebilsin.
	// Provider veriyi alt componentlere dağıtmak için children ihtiyacı var
	return (
		<CounterContext.Provider value={values}>{children}</CounterContext.Provider>
	);
};
