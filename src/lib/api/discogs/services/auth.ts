import { buildAuthHeader, buildUrl, method } from '..';
import { config } from '../config';
import { parseOauthTokens } from '../utils';
import type { AuthApiMethods } from './auth.types';

export const authApiMethods: AuthApiMethods = {
	getToken: async () => {
		const authorizationHeader = buildAuthHeader({
			signature: `${config.secret_key}&`,
			extra: { oauth_callback: config.callback_url }
		});

		const response = await fetch(buildUrl(method.auth.getToken), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: authorizationHeader,
				'User-Agent': 'ansango/1.0'
			}
		});

		const [oauth_token, oauth_token_secret] = parseOauthTokens(await response.text());
		return { oauth_token, oauth_token_secret };
	},
	postAccessToken: async (params: {
		oauth_token: string;
		oauth_token_secret: string;
		verifier: string;
	}) => {
		const authorizationHeader = buildAuthHeader({
			signature: `${config.secret_key}&${params.oauth_token_secret}`,
			extra: { oauth_token: params.oauth_token, oauth_verifier: params.verifier }
		});

		const response = await fetch(buildUrl(method.auth.postAccessToken), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: authorizationHeader,
				'User-Agent': 'ansango/1.0'
			}
		});
		const [oauth_token, oauth_token_secret] = parseOauthTokens(await response.text());
		return { oauth_token, oauth_token_secret };
	},
	getIdentity: async ({
		oauth_token,
		oauth_token_secret
	}: {
		oauth_token: string;
		oauth_token_secret: string;
	}) => {
		const response = await fetch(buildUrl(method.auth.getIdentity), {
			method: 'GET',
			headers: {
				Authorization: buildAuthHeader({
					signature: `${config.secret_key}&${oauth_token_secret}`,
					extra: { oauth_token }
				}),
				'User-Agent': 'ansango/1.0'
			}
		});
		return response.json();
	}
};
