// Not: Bu örnekte CounterProvider sadece CounterView ile CounterActions ait global bir state yapısı görevi görür.

import { CounterProvider } from '../../contexts/counter.context';
import { CounterActions, CounterView } from '../../main';

// Not: Step Step Form işlemlerinde tercih edilen bir teknik.
function CounterWrapper() {
	return (
		<>
			<CounterProvider>
				{/* asenkron  */}

				<CounterView />
				{/* Tab1 */}
				<CounterActions />
				{/* Tab 2 */}
			</CounterProvider>
		</>
	);
}

export default CounterWrapper;
