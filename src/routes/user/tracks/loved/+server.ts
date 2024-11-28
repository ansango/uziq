import { LASTFM_SESSION, LASTFM_USER } from '$lib';
import { userApiMethods } from '$lib/lastfm/services';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	const session = cookies.get(LASTFM_SESSION);
	const user = cookies.get(LASTFM_USER);

	if (!session || !user) {
		return json({ error: 'Session or user not found' }, { status: 404 });
	}

	const {
		lovedtracks: { track }
	} = await userApiMethods.getLovedTracks({ user });

	return json(track, { status: 200 });
};
