import { createBrowserRouter, Link, Outlet } from 'react-router-dom';
import { lazy } from 'react';
import LazyDemo from './pages/lazy.demo';

const CounterViewDemo = lazy(
	() => import('./pages/contexts/counter.view.demo')
);

const CounterActionDemo = lazy(
	() => import('./pages/contexts/counter.actions.demo')
);

const ReduxDemo = lazy(() => import('./pages/redux/redux.demo'));
const TodoReduxDemo = lazy(() => import('./pages/redux/todo.redux.demo'));

export const router = createBrowserRouter([
	{
		path: '',
		Component: () => (
			<>
				<h1>Main Layout</h1>
				<Link to="/contextapi">Context API</Link>
				{' | '}
				<Link to="/redux">REDUX API</Link>
				{' | '}
				<Link to="/redux-thunk">REDUX THUNK API</Link>
				{' | '}
				<Link to="/lazy-demo">Lazy Demo</Link>
				<Outlet />
			</>
		),
	},
	{
		path: '/contextapi',
		element: (
			<div>
				<nav>
					<Link to="/contextapi/counter-view">Counter View</Link>
					{'|'}
					<Link to="/contextapi/counter-actions">Counter Actions</Link>
				</nav>
				<Outlet />
			</div>
		),
		children: [
			{
				path: 'counter-view',
				Component: CounterViewDemo,
			},
			{
				path: 'counter-actions',
				Component: CounterActionDemo,
			},
		],
	},
	{
		path: 'redux',
		Component: ReduxDemo,
	},
	{
		path: 'redux-thunk',
		Component: TodoReduxDemo,
	},
	{
		path: 'lazy-demo',
		Component: LazyDemo,
	},
]);
