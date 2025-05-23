import "./App.css";
import Pomodoro from "./components/Pomodoro";
import { RandomTask } from "./components/RandomTask";
import TwentyTwenty from "./components/TwentyTwenty";
import { Button } from "./components/ui/button";
import { handleRequestNotificationPermission } from "./lib/common";
import { useLocalStorage } from "./lib/useLocalStorage";

function App() {
	const [points, setPoints] = useLocalStorage<number>("points", 0);
	const shouldAskForNotificationPermission = Notification?.permission !== "granted";

	return (
		<>
			<div className="border-2 p-2 rounded-md select-none">
				<div className="flex justify-center items-center">
					<span className="text-3xl font-bold">{points.toLocaleString()} </span>
					<span className="text-2xl pl-1"> 🍪</span>
					{/* <span className="text-xs pl-1">{(points / 3600 / 24)}hrs</span> */}
				</div>

				{shouldAskForNotificationPermission && (
					<Button onClick={handleRequestNotificationPermission}>Enable Notifications</Button>
				)}

				<div className="flex flex-col gap-4 p-4">
					<Pomodoro workTimerTarget={60} pauseTimerTarget={3} setPoints={setPoints} />
					<TwentyTwenty setPoints={setPoints} />
					<RandomTask />
				</div>
			</div>
		</>
	);
}

export default App;
