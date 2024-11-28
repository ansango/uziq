import { userApiMethods } from '$lib/discogs/services';
import { getUserDiscogsFromCookies } from '$lib/middleware';

import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies, url }) => {
	const page = url.searchParams.get('page') || 1;
	console.log('page', page);
	try {
		const { oauth_token, oauth_token_secret, username } = getUserDiscogsFromCookies(cookies);
		const response = await userApiMethods.getCollectionFolderReleases(
			{
				username,
				oauth_token,
				oauth_token_secret,
				folderId: String(0)
			},
			{ per_page: 10, sort_order: 'desc', sort: 'added', page }
		);

		return json(response, { status: 200 });
	} catch (err) {
		return error(500, { message: err.message });
	}
};
