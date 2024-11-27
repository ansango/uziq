import {
	DISCOGS_OAUTH_TOKEN,
	DISCOGS_OAUTH_TOKEN_SECRET,
	DISCOGS_USER,
	LASTFM_SESSION,
	LASTFM_USER
} from '$lib';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const lastfmUser = cookies.get(LASTFM_USER);
	const lastfmSession = cookies.get(LASTFM_SESSION);
	const discogsToken = cookies.get(DISCOGS_OAUTH_TOKEN);
	const discogsTokenSecret = cookies.get(DISCOGS_OAUTH_TOKEN_SECRET);
	const discogsUser = cookies.get(DISCOGS_USER);
	return { lastfmUser, lastfmSession, discogsToken, discogsTokenSecret, discogsUser };
};
