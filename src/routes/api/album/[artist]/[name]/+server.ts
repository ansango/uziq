import { albumApiMethods } from '$lib/api/lastfm/services';
import { getUserLastfmFromCookies } from '$lib/api/middleware';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { mapper } from './mapper';

export const GET: RequestHandler = async ({ cookies, params }) => {
	const { name: album, artist } = params;

	if (!album || !artist) {
		return error(400, { message: 'Missing required parameters' });
	}

	try {
		const { user: username } = getUserLastfmFromCookies(cookies);
		const response = await albumApiMethods.getInfo({
			album,
			artist,
			username
		});
		return json(mapper(response.album), { status: 200 });
	} catch (err) {
		return error(500, { message: err.message });
	}
};
