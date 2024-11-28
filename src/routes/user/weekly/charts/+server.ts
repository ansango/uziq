import { userApiMethods } from '$lib/api/lastfm/services';
import { getUserLastfmFromCookies } from '$lib/middleware';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	try {
		const { user } = getUserLastfmFromCookies(cookies);
		const response = await userApiMethods.getWeeklyChartList({ user });
		return json(response.weeklychartlist.chart, { status: 200 });
	} catch (err) {
		return error(500, { message: err.message });
	}
};
