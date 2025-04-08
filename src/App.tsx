import React from 'react';
import './App.css';

type LayoutProps = {
	children: React.ReactNode;
};

const Provider = ({ children }: LayoutProps) => {
	return <>{children}</>;
};

const A = () => {
	return <>A Component</>;
};

const B = () => {
	return <>B Component</>;
};

function App() {
	return (
		<>
			<Provider>
				<A />
				<B />
			</Provider>
		</>
	);
}

export default App;
