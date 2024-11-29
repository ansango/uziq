import type { ArtistGetInfoResponse } from '$lib/api/lastfm/services';

export type MappedArtist = {
	name: string;
	similar: string[];
	ontour?: boolean;
	plays?: number;
	userplays?: number;
	tags: string[];
	url: string;
};

export const mapper = (artist: ArtistGetInfoResponse['artist']): MappedArtist => {
	const { name, ontour, similar, stats, tags, url } = artist;
	return {
		name,
		similar: similar.artist.map((a) => a.name),
		ontour: ontour === '1',
		plays: parseInt(stats.playcount),
		userplays: parseInt(stats.userplaycount || '0'),
		tags: tags.tag.map((t) => t.name),
		url
	};
};
