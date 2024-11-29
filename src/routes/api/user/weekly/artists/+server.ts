import { userApiMethods } from '$lib/api/lastfm/services';
import { getUserLastfmFromCookies } from '$lib/api/middleware';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	try {
		const { user } = getUserLastfmFromCookies(cookies);
		const response = await userApiMethods.getWeeklyArtistChart({ user });
		return json(response.weeklyartistchart.artist, { status: 200 });
	} catch (err) {
		return error(500, { message: err.message });
	}
};
