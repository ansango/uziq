import { userApiMethods } from '$lib/discogs/services';
import { getUserDiscogsFromCookies } from '$lib/middleware';

import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	try {
		const { oauth_token, oauth_token_secret, username } = getUserDiscogsFromCookies(cookies);
		const response = await userApiMethods.getCollectionFolderReleases({
			username,
			oauth_token,
			oauth_token_secret,
			folderId: String(0)
		});

		return json(response, { status: 200 });
	} catch (err) {
		return error(500, { message: err.message });
	}
};
