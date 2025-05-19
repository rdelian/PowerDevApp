/**
 * Formats a given number of seconds into a string in "MM:SS" format.
 *
 * @param seconds - The total number of seconds to format.
 * @returns A string representing the time in minutes and seconds, zero-padded to two digits each. (e.g., "05:30").
 */
export function formatTime(seconds: number) {
	const _min = Math.floor(seconds / 60);
	const _sec = seconds % 60;
	return `${String(_min).padStart(2, "0")}:${String(_sec).padStart(2, "0")}`;
}
