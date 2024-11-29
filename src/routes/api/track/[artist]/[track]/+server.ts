import { trackApiMethods } from '$lib/api/lastfm/services';
import { getUserLastfmFromCookies } from '$lib/api/middleware';
import { error, json, type RequestHandler } from '@sveltejs/kit';

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

		return json(response.track, { status: 200 });
	} catch (err) {
		return error(500, { message: err.message });
	}
};
