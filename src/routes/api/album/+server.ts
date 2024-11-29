import { albumApiMethods } from '$lib/api/lastfm/services';
import { getUserLastfmFromCookies } from '$lib/api/middleware';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	try {
		const { user: username } = getUserLastfmFromCookies(cookies);
		const response = await albumApiMethods.getInfo({
			album: 'The Dark Side of the Moon',
			artist: 'Pink Floyd',
			username
		});
		return json(response.album, { status: 200 });
	} catch (err) {
		return error(500, { message: err.message });
	}
};
