import type { GetReleaseResponse } from '$lib/api/discogs/services';
import { parseArtistDiscogs, unParseDuration } from '$lib/utils';

type TrackList = {
	duration: number;
	title: string;
};

export type MappedRelease = {
	id: number;
	title: string;
	artist: string;
	cover: string;
	year: number;
	country: string;
	url: string;
	tracklist: TrackList[];
};

export const mapper = (release: GetReleaseResponse): MappedRelease => {
	const { artists, id, tracklist, year, country, title, uri } = release;

	return {
		id,
		title,
		artist: parseArtistDiscogs(artists[0].name),
		cover: release?.images ? release.images?.[0]?.uri : '',
		year,
		country,
		url: uri || '',
		tracklist: tracklist.map(({ duration, title }) => ({
			duration: unParseDuration(duration),
			title
		}))
	};
};
