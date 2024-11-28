import { releaseApiMethods } from '$lib/api/discogs/services/release';
import { trackApiMethods, type BatchTracksScrobbleRequest } from '$lib/api/lastfm/services';
import { getUserDiscogsFromCookies, getUserLastfmFromCookies } from '$lib/middleware';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, cookies }) => {
	try {
		const { oauth_token, oauth_token_secret } = getUserDiscogsFromCookies(cookies);
		const release = await releaseApiMethods.getRelease({
			oauth_token,
			oauth_token_secret,
			id: String(params.id)
		});
		return json(release, { status: 200 });
	} catch (err) {
		error(500, { message: err.message });
	}
};

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { session: sk } = getUserLastfmFromCookies(cookies);
		const data = await request.json();
		const tracks: BatchTracksScrobbleRequest['tracks'] = data.tracklist.map((track: any) => ({
			artist: data.artist,
			track,
			timestamp: Math.floor(Date.now() / 1000),
			album: data.album
		}));

		const result = await trackApiMethods.postBatchTrackScrobble({
			sk,
			tracks
		});

		return json(result, { status: 200 });
	} catch (err) {
		error(500, { message: err.message });
	}
};
