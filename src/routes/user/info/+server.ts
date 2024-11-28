import { userApiMethods } from '$lib/api/lastfm/services';
import { getUserLastfmFromCookies } from '$lib/middleware';
import { json, type RequestHandler, error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	try {
		const { user } = getUserLastfmFromCookies(cookies);
		const response = await userApiMethods.getInfo({ user });
		return json(response.user, { status: 200 });
	} catch (err) {
		return error(500, { message: err.message });
	}
};
