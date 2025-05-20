/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FaPlay, FaStop } from "react-icons/fa";
import useCommonTimer from "./CommonTimer";
import { Button } from "./ui/button";

const TwentyTwenty = () => {
	const twentyTimer = useCommonTimer({
		timeTarget: 20,
		onTargetReached: () => {
			const notif = new Notification("The 20/20 Rules", {
				body: "Look away from the screen for 20 seconds.\nYou will be notified when you can look back at the screen",
				requireInteraction: true
			});

			notif.onclose = () => {
				console.log("Notification closed");
				setTimeout(() =>{
					twentyTimer.toggleTimer();
					new Notification("The 20/20 Rules", {
						body: "You can look back at the screen now",
						requireInteraction: true
					});
				}, 20000);
			};
		}
	});

	function toggleTwentyTimer() {
		twentyTimer.isActive ? twentyTimer.resetTimer() : twentyTimer.toggleTimer();
	}

	return (
		<>
			<div className="border-2 p-2 rounded-md">
				{/* Title */}
				<p className="text-sm -mt-2 -mb-2">20/20 Rule</p>

				{/* Timer */}
				<p className="text-4xl py-1">{twentyTimer.timeFormated}</p>

				{/* Control buttons */}
				<div className="">
					<Button onClick={toggleTwentyTimer}>{twentyTimer.isActive ? <FaStop /> : <FaPlay />}</Button>
				</div>
			</div>
		</>
	);
};

export default TwentyTwenty;
