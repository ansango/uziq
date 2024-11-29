import { DISCOGS_OAUTH_TOKEN, DISCOGS_OAUTH_TOKEN_SECRET, DISCOGS_USER } from '$lib/api/middleware';
import { error, type Cookies } from '@sveltejs/kit';

export const getUserDiscogsFromCookies = (cookies: Cookies) => {
	const username = cookies.get(DISCOGS_USER);
	const oauth_token = cookies.get(DISCOGS_OAUTH_TOKEN);
	const oauth_token_secret = cookies.get(DISCOGS_OAUTH_TOKEN_SECRET);

	if (!username) {
		return error(404, { message: 'User not found' });
	}

	if (!oauth_token) {
		return error(404, { message: 'OAuth token not found' });
	}

	if (!oauth_token_secret) {
		return error(404, { message: 'OAuth token secret not found' });
	}
	return { username, oauth_token, oauth_token_secret };
};
