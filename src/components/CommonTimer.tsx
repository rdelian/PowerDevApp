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
	const [_isActive, setIsActive] = useState(false);
	const _intervalRef = useRef<NodeJS.Timeout | null>(null);
	const isActiveRef = useRef(false);

	timeTarget = timeTarget * 60;

	function _clearInterval() {
		if (_intervalRef.current) {
			clearInterval(_intervalRef.current);
			_intervalRef.current = null;
		}
	}

	function _startTimer() {
		setIsActive(true);
		isActiveRef.current = true;
		_intervalRef.current = setInterval(() => {
			setTime(prevTime => prevTime + 1);
		}, 1000);

		onStart?.();
	}

	function _pauseTimer() {
		setIsActive(false);
		isActiveRef.current = false;
		_clearInterval();
		onPause?.();
	}

	function toggleTimer() {
		_isActive ? _pauseTimer() : _startTimer();
	}

	function resetTimer() {
		setTime(0);
		setIsActive(false);
		isActiveRef.current = false;
		_clearInterval();
		onReset?.();
	}

	useEffect(() => {
		onTick?.();
		if (time < timeTarget) return;

		resetTimer();
		onTargetReached?.();
	}, [time, timeTarget]);

	return {
		timeFormated: formatTime(timeTarget - time),
		timeElapsed: time,
		isActive: isActiveRef.current,
		toggleTimer,
		resetTimer
	};
};

export default useCommonTimer;
