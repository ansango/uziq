import { trackApiMethods, type TrackScrobbleResponse } from '$lib/api/lastfm/services';
import { getUserLastfmFromCookies } from '$lib/api/middleware';
import { generateTimestamp } from '$lib/utils';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export type ResponsePostTrackScrobble = {
	scrobble: TrackScrobbleResponse['scrobbles']['scrobble'];
	requestParams: {
		artist: string;
		track: string;
		album: string;
	};
};

export const POST: RequestHandler = async ({ cookies, request }) => {
	const { artist, track, album } = await request.json();
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
