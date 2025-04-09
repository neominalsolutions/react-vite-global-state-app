import { lazy } from 'react';
import { createBrowserRouter, Link, Outlet } from 'react-router-dom';
import AuthenticationGuard from './guards/authentication.guard';
import TodoFormDemo from './pages/forms/todo.form.demo';
import LazyDemo from './pages/lazy/lazy.demo';

const ReactQueryDemo = lazy(
	() => import('./pages/react-query/react-query.demo')
);

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
				<AuthenticationGuard>
					<h1 className="text-3xl font-bold underline">Main Layout</h1>

					<Link to="/contextapi">Context API</Link>
					{' | '}
					<Link to="/redux">REDUX API</Link>
					{' | '}
					<Link to="/redux-thunk">REDUX THUNK API</Link>
					{' | '}
					<Link to="/lazy-demo">Lazy Demo</Link>
					{' | '}
					<Link to="/react-query">React Query Demo</Link>
					{' | '}
					<Link to="/form">Todo Form Demo</Link>

					<div style={{ padding: 10 }}>
						<Outlet />
					</div>
				</AuthenticationGuard>
			</>
		),
		children: [
			{
				path: 'react-query',
				Component: ReactQueryDemo,
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
			{
				path: 'form',
				Component: TodoFormDemo,
			},
		],
	},
	{
		path: 'unauthorize',
		Component: () => <>Yetkiniz Yok!</>,
	},
]);
