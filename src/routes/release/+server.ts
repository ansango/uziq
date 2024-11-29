import { releaseApiMethods } from '$lib/api/discogs/services';
import { getUserDiscogsFromCookies } from '$lib/api/middleware';

import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies, url }) => {
	const page = url.searchParams.get('page') || 1;
	const perPage = url.searchParams.get('per_page') || 10;
	try {
		const { oauth_token, oauth_token_secret, username } = getUserDiscogsFromCookies(cookies);
		const response = await releaseApiMethods.getCollectionFolderReleases(
			{
				username,
				oauth_token,
				oauth_token_secret,
				folderId: String(0)
			},
			{ per_page: perPage, sort_order: 'desc', sort: 'added', page }
		);

		return json(response, { status: 200 });
	} catch (err) {
		return error(500, { message: err.message });
	}
};
