import type { Track as TrackResponse } from '$lib/api/lastfm/services';

export type Track = {
	artist: string;
	duration: number;
	title: string;
	playcount: string;
	userplaycount: number;
};

export const mapper = (track: TrackResponse): Track => {
	const { artist, duration, name, playcount, userplaycount } = track;

	return {
		artist: artist.name,
		duration: parseInt(duration),
		title: name,
		playcount,
		userplaycount: Number(userplaycount || '0')
	};
};
