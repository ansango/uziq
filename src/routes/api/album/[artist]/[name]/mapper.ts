import type { AlbumGetInfoResponse } from '$lib/api/lastfm/services';

export type Album = {
	artist: string;
	cover: string;
	title: string;
	plays: number;
	tags: { name: string; url: string }[];
	url: string;
	userplays: number;
};

export const mapper = (album: AlbumGetInfoResponse['album']) => {
	const { artist, image, name, playcount, tags, url, userplaycount } = album;
	return {
		artist,
		cover: image[3]['#text'],
		title: name,
		plays: playcount,
		tags: tags.tag,
		url,
		userplays: userplaycount
	};
};
