import { generateTimestamp } from '$lib/utils';
import { trackApiMethods } from '$lib/api/lastfm/services';
import { getUserLastfmFromCookies } from '$lib/api/middleware';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies, request }) => {
	try {
		const { session: sk } = getUserLastfmFromCookies(cookies);
		const { artist, track, album } = await request.json();

		if (!artist || !track || !album) {
			return error(400, { message: 'Missing required parameters' });
		}

		const response = await trackApiMethods.postTrackScrobble({
			artist,
			sk,
			track,
			album,
			timestamp: String(generateTimestamp())
		});

		return json(response.scrobbles.scrobble, { status: 200 });
	} catch (err) {
		return error(500, { message: err.message });
	}
};
