import { createBrowserRouter, Link, Outlet } from 'react-router-dom';
import CounterViewDemo from './pages/contexts/counter.view.demo';
import CounterActionDemo from './pages/contexts/counter.actions.demo';
import ReduxDemo from './pages/redux/redux.demo';

export const router = createBrowserRouter([
	{
		path: '',
		Component: () => (
			<>
				<h1>Main Layout</h1>
				<Link to="/contextapi">Context API</Link>
				{' | '}
				<Link to="/redux">REDUX API</Link>
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
]);
