/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FaPlay, FaStop } from "react-icons/fa";
import useCommonTimer from "./CommonTimer";
import { Button } from "./ui/button";
import config from "@/config";
import { useState } from "react";

type TwentyTwentyProps = {
	setPoints: (value: number | ((val: number) => number)) => void;
};

const TwentyTwenty = ({ setPoints }: TwentyTwentyProps) => {
	const [isFinalPhase, setIsFinalPhase] = useState(false);
	const twentyTimer = useCommonTimer({
		timeTarget: 20,
		onTargetReached: handleTargetReached
	});

	function handleTargetReached() {
		const interactNotif = new Notification("The 20/20 Rules", {
			body: "Look away from the screen for 20 seconds.\nYou will be notified when you can look back at the screen",
			requireInteraction: true
		});

		interactNotif.onclose = () => {
			setIsFinalPhase(true);
			setTimeout(() => {
				twentyTimer.toggleTimer();
				new Notification("The 20/20 Rules", {
					body: "You can look back at the screen now"
				});
				setPoints(prevPoints => prevPoints + config.pomodoro.pointsPerSecond * 60 * 20);
				setIsFinalPhase(false);
			}, 20000);
		};
	}

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
					<Button disabled={isFinalPhase} onClick={toggleTwentyTimer}>
						{twentyTimer.isActive ? <FaStop /> : <FaPlay />}
					</Button>
				</div>
			</div>
		</>
	);
};

export default TwentyTwenty;
