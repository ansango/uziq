import { trackApiMethods } from '$lib/api/lastfm/services';
import { getUserLastfmFromCookies } from '$lib/api/middleware';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { mapper } from './mapper';

export const POST: RequestHandler = async ({ cookies, request }) => {
	const { artist, track } = (await request.json()) as { artist: string; track: string };

	if (!artist || !track) {
		return error(400, { message: 'Missing required parameters' });
	}

	try {
		const { user: username } = getUserLastfmFromCookies(cookies);

		const response = await trackApiMethods.getInfo({
			track,
			artist,
			username
		});

		return json(mapper(response.track), { status: 200 });
	} catch (err) {
		return error(500, { message: err.message });
	}
};
