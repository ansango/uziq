import { buildAuthHeader, buildUrl, method } from '..';
import { config } from '../config';

export const userApiMethods = {
	getCollectionFolders: async ({
		username,
		oauth_token,
		oauth_token_secret
	}: {
		username: string;
		oauth_token: string;
		oauth_token_secret: string;
	}) => {
		const response = await fetch(buildUrl(method.user.getCollectionFolders(username)), {
			headers: {
				Authorization: buildAuthHeader({
					signature: `${config.secret_key}&${oauth_token_secret}`,
					extra: { oauth_token }
				})
			}
		});

		return response.json();
	},
	getCollectionFolderReleases: async ({
		username,
		oauth_token,
		oauth_token_secret,
		folderId
	}: {
		username: string;
		oauth_token: string;
		oauth_token_secret: string;
		folderId: string;
	}) => {
		const response = await fetch(
			buildUrl(method.user.getCollectionFolderReleases(username, folderId)),
			{
				headers: {
					Authorization: buildAuthHeader({
						signature: `${config.secret_key}&${oauth_token_secret}`,
						extra: { oauth_token }
					})
				}
			}
		);

		return response.json();
	}
};
