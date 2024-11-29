import { artistApiMethods } from '$lib/api/lastfm/services';
import { getUserLastfmFromCookies } from '$lib/api/middleware';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { mapper } from './mapper';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { artist } = await request.json();

	if (!artist) {
		return error(400, { message: 'Missing required parameters' });
	}
	try {
		const { user } = getUserLastfmFromCookies(cookies);
		const response = await artistApiMethods.getInfo({
			artist,
			user
		});
		return json(mapper(response.artist), { status: 200 });
	} catch (err) {
		error(500, { message: err.message });
	}
};
