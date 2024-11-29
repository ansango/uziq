import {
	type AlbumGetInfoResponse,
	type ArtistGetInfoResponse,
	type TrackGetInfoResponse
} from '$lib/api/lastfm/services';
import { parseDuration, unParseDuration } from '$lib/utils';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export type RequestBody = {
	album?: string;
	artist?: string;
	tracks?: Array<{
		duration: string;
		title: string;
	}>;
	cover?: string;
	year?: string;
};

export type ResponseReleaseMetadata = {
	artist: string;
	artistMetadata: {
		tags: Array<{
			name: string;
			url: string;
		}>;
		similars: Array<{
			name: string;
			url: string;
		}>;
		ontour: string;
		stats: {
			playcount: string;
			listeners: string;
		};
	};
	album: string;
	albumMetadata: {
		year?: string;
		cover: string;
		stats: {
			playcount: string;
			listeners: string;
			userplaycount: string;
		};
		tracks: Array<{
			duration: string;
			playcount: string;
			name: string;
			userplaycount: string;
		}>;
	};
};

export const POST: RequestHandler = async ({ request, fetch }) => {
	const { artist, album, tracks, cover, year } = (await request.json()) as RequestBody;

	if (!artist || !album || !tracks || !cover) {
		return error(400, { message: 'Missing required parameters' });
	}

	try {
		const rawArtist = await fetch('/api/artist/' + artist);
		const responseArtist = (await rawArtist.json()) as ArtistGetInfoResponse['artist'];

		const artistMetadata = {
			tags: responseArtist.tags.tag,
			similars: responseArtist.similar.artist,
			ontour: responseArtist.ontour,
			stats: responseArtist.stats
		};
		const rawAlbum = await fetch('/api/album/' + artist + '/' + album);
		const responseAlbum = (await rawAlbum.json()) as AlbumGetInfoResponse['album'];

		const responsetracks = await Promise.all(
			tracks.map(async (track) => {
				try {
					const rawTrack = await fetch('/api/track/' + artist + '/' + track.title);
					const responseTrack = (await rawTrack.json()) as TrackGetInfoResponse['track'];
					return responseTrack
						? {
								duration:
									track.duration !== ''
										? unParseDuration(track.duration)
										: parseInt(responseTrack.duration),
								playcount: responseTrack.playcount,
								name: track.title,
								userplaycount: responseTrack.userplaycount
							}
						: { duration: 0, playcount: 0, userplaycount: 0, name: track.title };
				} catch (error) {
					console.log(error);
					return {
						duration: 0,
						playcount: 0,
						name: track.title,
						userplaycount: 0
					};
				}
			})
		);

		const albumMetadata = {
			cover,
			year,
			stats: {
				playcount: responseAlbum.playcount,
				listeners: responseAlbum.listeners,
				userplaycount: responseAlbum.userplaycount
			},

			tracks: responsetracks.map(({ duration, playcount, name, userplaycount }) => ({
				duration: parseDuration(duration),
				playcount,
				name,
				userplaycount
			}))
		};

		return json({ artist, artistMetadata, album, albumMetadata } as ResponseReleaseMetadata, {
			status: 200
		});
	} catch (err) {
		return error(500, { message: err.message });
	}
};
