import { buildAuthHeader, buildUrl, method } from '..';
import { config } from '../config';

type GetReleaseRequest = {
	oauth_token: string;
	oauth_token_secret: string;
	id: string;
};

export const releaseApiMethods = {
	getRelease: async ({ oauth_token, oauth_token_secret, id }: GetReleaseRequest) => {
		const response = await fetch(buildUrl(method.release.getRelease(id)), {
			headers: {
				Authorization: buildAuthHeader({
					signature: `${config.secret_key}&${oauth_token_secret}`,
					extra: { oauth_token }
				})
			}
		});

		if (!response.ok) {
			throw new Error('Failed to fetch release');
		}

		return response.json();
	}
};
