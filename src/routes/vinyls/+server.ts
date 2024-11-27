import { DISCOGS_OAUTH_TOKEN, DISCOGS_OAUTH_TOKEN_SECRET, DISCOGS_USER } from '$lib';
import { userApiMethods } from '$lib/discogs/services';

import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	const username = cookies.get(DISCOGS_USER);
	const oauth_token = cookies.get(DISCOGS_OAUTH_TOKEN);
	const oauth_token_secret = cookies.get(DISCOGS_OAUTH_TOKEN_SECRET);

	if (!username || !oauth_token || !oauth_token_secret) {
		return json({ error: 'User not found' }, { status: 404 });
	}
	const response = await userApiMethods.getCollectionFolderReleases({
		username,
		oauth_token,
		oauth_token_secret,
		folderId: String(0)
	});

	return json(response, { status: 200 });
};
