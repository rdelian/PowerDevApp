import { useState } from "react";
import useCommonTimer from "./CommonTimer";
import { Button } from "./ui/button";
import { FaPlay, FaStop, FaUndo } from "react-icons/fa";
import config from "@/config";

type PomodoroProps = {
	workTimerTarget: number;
	pauseTimerTarget: number;
	setPoints: (value: number | ((val: number) => number)) => void;
};

const Pomodoro = ({ workTimerTarget, pauseTimerTarget, setPoints }: PomodoroProps) => {
	const [isWorkingPhase, setIsWorkingPhase] = useState(true);

	const workTimer = useCommonTimer({
		timeTarget: workTimerTarget,
		onTargetReached: workTimerFinished,
		onTick: () => {
			if (!workTimer.isActive) return;
			setPoints(prevPoints => prevPoints + config.pomodoro.pointsPerSecond);
		}
	});

	const breakTimer = useCommonTimer({
		timeTarget: pauseTimerTarget,
		onTargetReached: breakTimerFinished
	});

	function isAnyTimerActive() {
		return workTimer.isActive || breakTimer.isActive;
	}

	function workTimerFinished() {
		setIsWorkingPhase(false);
		new Notification("Pomodoro Timer", {
			body: "Time to take a break!",
			requireInteraction: true
		});
	}

	function breakTimerFinished() {
		setIsWorkingPhase(true);
		new Notification("Pomodoro Timer", {
			body: "Time to get back to work!",
			requireInteraction: true
		});
	}

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
			{/* <p>Points: {points}</p> */}
			<div className="border-2 p-2 rounded-md">
				{/* Title */}
				<p className="text-sm -mt-2 -mb-2">{isWorkingPhase ? "Work" : "Break"}</p>

				{/* Timer */}
				<p className="text-4xl py-1">{isWorkingPhase ? workTimer.timeFormated : breakTimer.timeFormated}</p>

				{/* Control buttons */}
				<div className="flex gap-2 justify-center">
					<Button onClick={togglePomodoro}>
						{isAnyTimerActive() ? <FaStop /> : <FaPlay />}
					</Button>
					<Button onClick={resetPomodoro}>
						<FaUndo />
					</Button>
				</div>
			</div>
		</>
	);
};

export default Pomodoro;
