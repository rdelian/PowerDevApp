import "./App.css";
import Pomodoro from "./components/Pomodoro";
import TwentyTwenty from "./components/TwentyTwenty";
import { Button } from "./components/ui/button";
import { handleRequestNotificationPermission } from "./lib/common";
import { useLocalStorage } from "./lib/useLocalStorage";

function App() {
	const [points, setPoints] = useLocalStorage<number>("points", 0);

	return (
		<>
			<div className="border-2 p-2 rounded-md select-none">
				<div className="flex justify-center items-center">
					<span className="text-3xl font-bold">{points.toLocaleString()} </span>
					<span className="text-2xl pl-1"> 🍪</span>
					{/* <span className="text-xs pl-1">{(points / 3600 / 24)}hrs</span> */}
				</div>
				{Notification && Notification.permission !== "granted" ? (
					<Button onClick={handleRequestNotificationPermission}>Enable Notifications</Button>
				) : null}
				<div className="flex flex-col gap-4 p-4">
					<Pomodoro workTimerTarget={60} pauseTimerTarget={3} setPoints={setPoints} />
					<TwentyTwenty setPoints={setPoints} />
				</div>
			</div>
		</>
	);
}

export default App;
