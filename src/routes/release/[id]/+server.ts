import { generateTimestamp } from '$lib';
import { releaseApiMethods } from '$lib/api/discogs/services/release';
import { trackApiMethods } from '$lib/api/lastfm/services';
import { getUserDiscogsFromCookies, getUserLastfmFromCookies } from '$lib/middleware';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, cookies }) => {
	try {
		const { oauth_token, oauth_token_secret } = getUserDiscogsFromCookies(cookies);
		const response = await releaseApiMethods.getRelease({
			oauth_token,
			oauth_token_secret,
			id: String(params.id)
		});

		return json(response, { status: 200 });
	} catch (err) {
		error(500, { message: err.message });
	}
};

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { session: sk } = getUserLastfmFromCookies(cookies);
		const { artist, tracklist, album } = await request.json();

		if (!artist || !tracklist || !album) {
			return error(400, { message: 'Missing required parameters' });
		}

		const response = await trackApiMethods.postBatchTrackScrobble({
			sk,
			tracks: tracklist.map((track: string) => ({
				artist,
				track,
				timestamp: generateTimestamp(),
				album
			}))
		});

		return json(response, { status: 200 });
	} catch (err) {
		error(500, { message: err.message });
	}
};
