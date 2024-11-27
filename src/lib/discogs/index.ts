import { config } from './config';
import { generateNonce, generateTimestamp, parseOauthTokens } from './utils';

export const buildUrl = (params?: string[]) => {
	const url = new URL(config.base_url);
	return `${url.toString()}${params ? params.join('/') : ''}`;
};

const method = {
	auth: {
		getToken: ['oauth', 'request_token'],
		postAccessToken: ['oauth', 'access_token']
	}
};

export const authApiMethods = {
	getToken: async () => {
		const url = buildUrl(method.auth.getToken);
		const nonce = generateNonce();
		const timestamp = generateTimestamp();
		const signature = `${config.secret_key}&`;
		const authorizationHeader = `OAuth oauth_consumer_key="${config.client_key}", oauth_nonce="${nonce}", oauth_signature="${signature}", oauth_signature_method="PLAINTEXT", oauth_timestamp="${timestamp}", oauth_callback="${config.callback_url}"`;
		const response = await fetch(url, {
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
		const url = buildUrl(method.auth.postAccessToken);
		const nonce = generateNonce();
		const timestamp = generateTimestamp();
		const signature = `${config.secret_key}&${params.oauth_token_secret}`;
		const authorizationHeader = `OAuth oauth_consumer_key="${config.client_key}", oauth_nonce="${nonce}", oauth_signature="${signature}", oauth_signature_method="PLAINTEXT", oauth_timestamp="${timestamp}", oauth_token="${params.oauth_token}", oauth_verifier="${params.verifier}"`;
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: authorizationHeader,
				'User-Agent': 'ansango/1.0'
			}
		});
		const [oauth_token, oauth_token_secret] = parseOauthTokens(await response.text());
		return { oauth_token, oauth_token_secret };
	}
};
