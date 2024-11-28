import { LASTFM_USER } from '$lib/constants';
import { json, type Cookies } from '@sveltejs/kit';

export const getUserLastfmFromCookies = (cookies: Cookies) => {
	const user = cookies.get(LASTFM_USER);
	if (!user) {
		throw json({ error: 'User not found' }, { status: 404 });
	}
	return user;
};
