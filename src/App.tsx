import './App.css';
import Pomodoro from './components/Pomodoro';
import TwentyTwenty from './components/TwentyTwenty';

function App() {
	return (
		<>
			<div className="flex flex-col gap-4 p-4">
				<Pomodoro workTimerTarget={60} pauseTimerTarget={3} />
				<TwentyTwenty />
			</div>
		</>
	);
}

export default App;
