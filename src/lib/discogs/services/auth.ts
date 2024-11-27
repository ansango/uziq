import { buildAuthHeader, buildUrl, method } from '..';
import { config } from '../config';
import { generateNonce, generateTimestamp, parseOauthTokens } from '../utils';

export const authApiMethods = {
	getToken: async () => {
		const nonce = generateNonce();
		const timestamp = generateTimestamp();
		const signature = `${config.secret_key}&`;
		const authorizationHeader = `OAuth oauth_consumer_key="${config.client_key}", oauth_nonce="${nonce}", oauth_signature="${signature}", oauth_signature_method="PLAINTEXT", oauth_timestamp="${timestamp}", oauth_callback="${config.callback_url}"`;
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
		const nonce = generateNonce();
		const timestamp = generateTimestamp();
		const signature = `${config.secret_key}&${params.oauth_token_secret}`;
		const authorizationHeader = `OAuth oauth_consumer_key="${config.client_key}", oauth_nonce="${nonce}", oauth_signature="${signature}", oauth_signature_method="PLAINTEXT", oauth_timestamp="${timestamp}", oauth_token="${params.oauth_token}", oauth_verifier="${params.verifier}"`;
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
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: buildAuthHeader({
					nonce: generateNonce(),
					timestamp: generateTimestamp(),
					signature: `${config.secret_key}&${oauth_token_secret}`,
					oauth_token
				}),
				'User-Agent': 'ansango/1.0'
			}
		});
		return response.json();
	}
};
