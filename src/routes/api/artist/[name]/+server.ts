import { artistApiMethods } from '$lib/api/lastfm/services';
import { getUserLastfmFromCookies } from '$lib/api/middleware';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, cookies }) => {
	const { name: artist } = params;

	if (!artist) {
		return error(400, { message: 'Missing required parameters' });
	}
	try {
		const { user } = getUserLastfmFromCookies(cookies);
		const response = await artistApiMethods.getInfo({
			artist,
			user
		});
		return json(response.artist, { status: 200 });
	} catch (err) {
		error(500, { message: err.message });
	}
};
