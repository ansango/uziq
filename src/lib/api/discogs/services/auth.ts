import { parseOauthTokens } from '$lib/utils';
import { buildAuthHeader, buildUrl, method } from '..';
import { config } from '../config';
import type {
	AuthGetIdentityRequest,
	AuthGetIdentityResponse,
	AuthGetTokenResponse,
	AuthPostAccessTokenRequest,
	AuthPostAccessTokenResponse
} from './auth.types';

/**
 * Defines the methods available for authentication-related operations in the Discogs API.
 */
export type AuthApiMethods = {
	/**
	 * Requests an OAuth token from the Discogs API.
	 * @returns A promise that resolves to an AuthGetTokenResponse object.
	 */
	getToken: () => Promise<AuthGetTokenResponse>;

	/**
	 * Posts an access token to the Discogs API.
	 * @param params - The request payload containing the OAuth token, token secret, and verifier.
	 * @returns A promise that resolves to an AuthPostAccessTokenResponse object.
	 */
	postAccessToken: (params: AuthPostAccessTokenRequest) => Promise<AuthPostAccessTokenResponse>;

	/**
	 * Gets the identity of the authenticated user from the Discogs API.
	 * @param params - The request payload containing the OAuth token and token secret.
	 * @returns A promise that resolves to an AuthGetIdentityResponse object.
	 */
	getIdentity: (params: AuthGetIdentityRequest) => Promise<AuthGetIdentityResponse>;
};

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
