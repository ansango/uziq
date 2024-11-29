export const parseDuration = (ms: number): string => {
	const totalSeconds = Math.floor(ms / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const unParseDuration = (duration: string): number => {
	const [minutes, seconds] = duration.split(':').map(Number);
	const result = minutes * 60 * 1000 + seconds * 1000;
	return isNaN(result) ? 0 : result;
};
