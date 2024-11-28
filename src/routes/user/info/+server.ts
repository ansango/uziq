import { userApiMethods } from '$lib/lastfm/services';
import { getUserLastfmFromCookies } from '$lib/middleware';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	const user = getUserLastfmFromCookies(cookies);
	const response = await userApiMethods.getInfo({ user });
	return json({ ...response }, { status: 200 });
};
