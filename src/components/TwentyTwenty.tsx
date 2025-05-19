/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FaPlay, FaUndo } from "react-icons/fa";
import CommonTimer from "./CommonTimer";
import { Button } from "./ui/button";

const TwentyTwenty = () => {
	const twentyTimer = CommonTimer({
		timeTarget: 20 * 60,
		onTargetReached: () => console.log("20-minute timer reached")
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
				<p className="text-4xl py-1">{twentyTimer.time}</p>

				{/* Control buttons */}
				<div className="">
					<Button onClick={toggleTwentyTimer}>
						{twentyTimer.isActive ? <FaUndo /> : <FaPlay />}
					</Button>
				</div>
			</div>
		</>
	);
};

export default TwentyTwenty;
