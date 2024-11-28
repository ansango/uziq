import { LASTFM_SESSION, LASTFM_USER } from '$lib/middleware';
import { error, type Cookies } from '@sveltejs/kit';

export const getUserLastfmFromCookies = (cookies: Cookies) => {
	const user = cookies.get(LASTFM_USER);
	const session = cookies.get(LASTFM_SESSION);
	if (!user) {
		return error(404, { message: 'User not found' });
	}

	if (!session) {
		return error(404, { message: 'Session not found' });
	}
	return { user, session };
};
