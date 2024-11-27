import { DISCOGS_API_BASE_URL, DISCOGS_CLIENT_KEY, DISCOGS_SECRET_KEY } from '$env/static/private';

const config = {
	base_url: DISCOGS_API_BASE_URL,
	client_key: DISCOGS_CLIENT_KEY,
	secret_key: DISCOGS_SECRET_KEY
};

export const buildUrl = (params?: string[]) => {
	const url = new URL(config.base_url);
	return `${url.toString()}${params ? params.join('/') : ''}`;
};

// https://api.discogs.com/oauth/request_token
// https://www.discogs.com/es/oauth/authorize
// https://api.discogs.com/oauth/access_token

const method = {
	auth: {
		getToken: ['oauth', 'request_token'],
		postAccessToken: ['oauth', 'access_token']
	}
};

/**
 * Authorization:
        OAuth oauth_consumer_key="your_consumer_key",
        oauth_nonce="random_string_or_timestamp",
        oauth_signature="your_consumer_secret&",
        oauth_signature_method="PLAINTEXT",
        oauth_timestamp="current_timestamp",
        oauth_callback="your_callback"
 */

const generateNonce = () => Math.random().toString(36).substring(2, 15);

export const authApiMethods = {
	getToken: async () => {
		const url = buildUrl(method.auth.getToken);
		const nonce = generateNonce();
		const timestamp = Math.floor(Date.now() / 1000);

		// Genera la firma
		const signature = `${config.secret_key}&`;
		console.log('Signature:', signature);

		// Construye el encabezado de autorización
		const authorizationHeader = `OAuth oauth_consumer_key="${config.client_key}", oauth_nonce="${nonce}", oauth_signature="${signature}", oauth_signature_method="PLAINTEXT", oauth_timestamp="${timestamp}", oauth_callback="http://localhost:5173/auth/callback"`;
		console.log('Authorization Header:', authorizationHeader);

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: authorizationHeader,
				'User-Agent': 'ansango/1.0'
			}
		});

		return response.text();
	},
	postAccessToken: async (oauth_token: string, oauth_token_secret: string, verifier: string) => {
		const url = buildUrl(method.auth.postAccessToken);
		const nonce = generateNonce();
		const timestamp = Math.floor(Date.now() / 1000);

		// Genera la firma
		const signature = `${config.secret_key}&${oauth_token_secret}`;
		console.log('Signature:', signature);

		// Construye el encabezado de autorización
		const authorizationHeader = `OAuth oauth_consumer_key="${config.client_key}", oauth_nonce="${nonce}", oauth_signature="${signature}", oauth_signature_method="PLAINTEXT", oauth_timestamp="${timestamp}", oauth_token="${oauth_token}", oauth_verifier="${verifier}"`;
		console.log('Authorization Header:', authorizationHeader);

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: authorizationHeader,
				'User-Agent': 'ansango/1.0'
			}
		});

		return response.text();
	}
};
