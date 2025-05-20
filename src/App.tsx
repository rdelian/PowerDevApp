import "./App.css";
import Pomodoro from "./components/Pomodoro";
import TwentyTwenty from "./components/TwentyTwenty";
import { Button } from "./components/ui/button";
import { handleRequestNotificationPermission } from "./lib/common";

function App() {
	return (
		<>
			{Notification && Notification.permission !== "granted" ? (
				<Button onClick={handleRequestNotificationPermission}>Enable Notifications</Button>
			) : null}
			<div className="flex flex-col gap-4 p-4">
				<Pomodoro workTimerTarget={.1} pauseTimerTarget={0.5} />
				<TwentyTwenty />
			</div>
		</>
	);
}

export default App;
