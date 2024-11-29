import { trackApiMethods, type TrackScrobbleResponse } from '$lib/api/lastfm/services';
import { getUserLastfmFromCookies } from '$lib/api/middleware';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { mapper } from './mapper';
import { generateTimestamp } from '$lib/utils';

export const GET: RequestHandler = async ({ cookies, params }) => {
	const { artist, track } = params;

	if (!artist || !track) {
		return error(400, { message: 'Missing required parameters' });
	}

	try {
		const { user: username } = getUserLastfmFromCookies(cookies);

		const response = await trackApiMethods.getInfo({
			track,
			artist,
			username
		});

		return json(mapper(response.track), { status: 200 });
	} catch (err) {
		return error(500, { message: err.message });
	}
};
export type ResponsePostTrackScrobble = {
	scrobble: TrackScrobbleResponse['scrobbles']['scrobble'];
	requestParams: {
		artist: string;
		track: string;
		album: string;
	};
};
export const POST: RequestHandler = async ({ cookies, params, url }) => {
	const album = url.searchParams.get('album');

	const { artist, track } = params;
	if (!artist || !track || !album) {
		return error(400, { message: 'Missing required parameters' });
	}
	try {
		const { session: sk } = getUserLastfmFromCookies(cookies);

		const response = await trackApiMethods.postTrackScrobble({
			artist,
			sk,
			track,
			album,
			timestamp: String(generateTimestamp())
		});
		return json(
			{
				scrobble: response.scrobbles.scrobble,
				requestParams: { artist, track, album }
			} as ResponsePostTrackScrobble,
			{ status: 200 }
		);
	} catch (err) {
		return error(500, { message: err.message });
	}
};
