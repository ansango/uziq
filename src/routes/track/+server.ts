import { trackApiMethods, userApiMethods } from '$lib/lastfm/services';
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

export const POST: RequestHandler = async ({ cookies }) => {
	const session = cookies.get('session');
	if (!session) {
		return json({ error: 'Session not found' }, { status: 404 });
	}
	const sk = session;
	const artist = 'Mogwai';
	const track = 'Yes! I Am A Long Way From Home';
	const album = 'Young Team (Deluxe Edition)';
	const timestamp = Math.floor(Date.now() / 1000).toString();

	const response = await trackApiMethods.postTrackScrobble({
		artist,
		track,
		timestamp,
		sk,
		album
	});

	return json(response, { status: 200 });
};
