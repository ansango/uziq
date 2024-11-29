import type { AlbumGetInfoResponse } from '$lib/api/lastfm/services';

export type MappedAlbum = {
	artist: string;
	cover: string;
	title: string;
	tags: string[];
	url: string;
	plays: number;
	userplays: number;
};

export const mapper = (album: AlbumGetInfoResponse['album']): MappedAlbum => {
	const { artist, image, name, playcount, tags, url, userplaycount } = album;
	return {
		artist,
		cover: image[3]['#text'],
		title: name,
		plays: parseInt(playcount),
		tags: Array.isArray(tags.tag) ? tags?.tag.map((t) => t.name) : [...(tags.tag?.name || '')],
		url,
		userplays: parseInt(userplaycount || '0')
	};
};
