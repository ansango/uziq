import { LASTFM_USER } from '$lib';
import { userApiMethods } from '$lib/lastfm/services';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	const user = cookies.get(LASTFM_USER);

	if (!user) {
		return json({ error: 'User not found' }, { status: 404 });
	}
	const response = await userApiMethods.getInfo({ user });

	return json({ ...response }, { status: 200 });
};
