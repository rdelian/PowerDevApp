/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import { formatTime } from "@/lib/time";
import { useEffect, useRef, useState } from "react";

type CommonTimerProps = {
	timeTarget: number;
	onTargetReached?: () => void;
	onStart?: () => void;
	onPause?: () => void;
	onReset?: () => void;
	onTick?: () => void;
};

const useCommonTimer = ({ timeTarget, onTargetReached, onStart, onPause, onReset, onTick }: CommonTimerProps) => {
	const [time, setTime] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	timeTarget = timeTarget * 60;

	function _clearInterval() {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}

	function _startTimer() {
		// console.log("Start timer", new Date());
		setIsActive(true);
		intervalRef.current = setInterval(() => {
			setTime(prevTime => prevTime + 1);
			// console.log("Tick", new Date());
		}, 1000);

		onStart?.();
	}

	function _pauseTimer() {
		// console.log("Pause timer", new Date());
		setIsActive(false);
		_clearInterval();
		onPause?.();
	}

	function toggleTimer() {
		console.log("Toggle timer", isActive, new Date());
		isActive ? _pauseTimer() : _startTimer();
	}

	function resetTimer() {
		// console.log("Reset timer", new Date());
		setTime(0);
		setIsActive(false);
		_clearInterval();
		onReset?.();
	}

	useEffect(() => {
		onTick?.();

		// console.log("Timer tick", time, timeTarget, isActive);

		if (time < timeTarget) return;

		// console.log("[1] Target reached", new Date());
		resetTimer();
		onTargetReached?.();
		// console.log("[2] Target reached end", isActive);
	}, [time, timeTarget]);

	return {
		timeFormated: formatTime(timeTarget - time),
		timeElapsed: time,
		isActive: isActive,
		toggleTimer,
		resetTimer
	};
};

export default useCommonTimer;
