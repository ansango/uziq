import { albumApiMethods, artistApiMethods, trackApiMethods } from '$lib/api/lastfm/services';
import { getUserLastfmFromCookies } from '$lib/api/middleware';
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

const formatDuration = (ms: number): string => {
	const totalSeconds = Math.floor(ms / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const unFormatDuration = (duration: string): number => {
	const [minutes, seconds] = duration.split(':').map(Number);
	return minutes * 60 * 1000 + seconds * 1000;
};

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { artist, album, tracks, cover, year } = (await request.json()) as RequestBody;

	if (!artist || !album || !tracks || !cover) {
		return error(400, { message: 'Missing required parameters' });
	}

	try {
		const { user: username } = getUserLastfmFromCookies(cookies);
		const responseArtist = await artistApiMethods.getInfo({
			artist,
			user: username
		});

		const artistMetadata = {
			tags: responseArtist.artist.tags.tag,
			similars: responseArtist.artist.similar.artist,
			ontour: responseArtist.artist.ontour,
			stats: responseArtist.artist.stats
		};

		const responseAlbum = await albumApiMethods.getInfo({
			album,
			artist,
			username
		});

		const responsetracks = await Promise.all(
			tracks.map(async (track) => {
				try {
					const responseTrack = await trackApiMethods.getInfo({
						track: track.title,
						artist,
						username
					});
					return responseTrack.track
						? {
								duration:
									track.duration !== ''
										? unFormatDuration(track.duration)
										: parseInt(responseTrack.track.duration),
								playcount: responseTrack.track.playcount,
								name: track.title,
								userplaycount: responseTrack.track.userplaycount
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
				playcount: responseAlbum.album.playcount,
				listeners: responseAlbum.album.listeners,
				userplaycount: responseAlbum.album.userplaycount
			},

			tracks: responsetracks.map(({ duration, playcount, name, userplaycount }) => ({
				duration: formatDuration(duration),
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
