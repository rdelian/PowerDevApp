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

const CommonTimer = ({ timeTarget, onTargetReached, onStart, onPause, onReset, onTick }: CommonTimerProps) => {
	const [time, setTime] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	function _clearTimer() {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}

	function _startTimer() {
		setIsActive(true);
		intervalRef.current = setInterval(() => {
			setTime(prevTime => prevTime + 20);
			console.log("Tick", new Date());
		}, 1000);
		onStart?.();
	}

	function _pauseTimer() {
		setIsActive(false);
		_clearTimer();
		onPause?.();
	}

	function toggleTimer() {
		isActive ? _pauseTimer() : _startTimer();
	}

	function resetTimer() {
		setTime(0);
		setIsActive(false);
		_clearTimer();
		onReset?.();
	}

	useEffect(() => {
		onTick?.();

		if (time < timeTarget) return;

		console.log("Target reached", new Date());
		resetTimer();
		onTargetReached?.();
	}, [time, timeTarget]);

	return { time: formatTime(timeTarget - time), isActive, toggleTimer, resetTimer };
};

export default CommonTimer;
