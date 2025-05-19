import { useState } from "react";
import CommonTimer from "./CommonTimer";
import { Button } from "./ui/button";
import { FaPlay, FaStop, FaUndo } from "react-icons/fa";

type PomodoroProps = {
	workTimerTarget: number;
	pauseTimerTarget: number;
};

const Pomodoro = ({ workTimerTarget, pauseTimerTarget }: PomodoroProps) => {
	const [isWorkingPhase, setIsWorkingPhase] = useState(true);
	const [points, setPoints] = useState(0);

	const workTimer = CommonTimer({
		timeTarget: workTimerTarget * 60,
		onTargetReached: () => setIsWorkingPhase(false),
		onTick: () => setPoints(prevPoints => prevPoints + 1)
	});

	const breakTimer = CommonTimer({
		timeTarget: pauseTimerTarget * 60,
		onTargetReached: () => setIsWorkingPhase(true)
	});

	const isAnyTimerActive = workTimer.isActive || breakTimer.isActive;

	function togglePomodoro() {
		if (isWorkingPhase) {
			workTimer.toggleTimer();
		} else {
			breakTimer.toggleTimer();
		}
	}

	function resetPomodoro() {
		setIsWorkingPhase(true);
		workTimer.resetTimer();
		breakTimer.resetTimer();
	}

	return (
		<>
			<p>Points: {points}</p>
			<div className="border-2 p-2 rounded-md">
				{/* Title */}
				<p className="text-sm -mt-2 -mb-2">{isWorkingPhase ? "Work" : "Break"}</p>

				{/* Timer */}
				<p className="text-4xl py-1">{isWorkingPhase ? workTimer.time : breakTimer.time}</p>

				{/* Control buttons */}
				<div className="flex gap-2 justify-between">
					<Button size="sm" onClick={togglePomodoro}>
						{isAnyTimerActive ? <FaStop /> : <FaPlay />}
					</Button>
					<Button size="sm" onClick={resetPomodoro}>
						<FaUndo />
					</Button>
				</div>
			</div>
		</>
	);
};

export default Pomodoro;
