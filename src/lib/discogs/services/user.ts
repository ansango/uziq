import { buildAuthHeader, buildUrl, method } from '..';
import { config } from '../config';
import { generateNonce, generateTimestamp } from '../utils';

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
					nonce: generateNonce(),
					timestamp: generateTimestamp(),
					signature: `${config.secret_key}&${oauth_token_secret}`,
					oauth_token
				})
			}
		});

		return response.json();
	}
};
