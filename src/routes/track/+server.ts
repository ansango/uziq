import { userApiMethods } from '$lib/lastfm/services';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	const session = cookies.get('session');
	const user = cookies.get('user');

	if (!session || !user) {
		return json({ error: 'Session or user not found' }, { status: 404 });
	}

	const {
		recenttracks: { track }
	} = await userApiMethods.getRecentTracks({ user });

	return json(track, { status: 200 });
};
