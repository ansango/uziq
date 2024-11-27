import { config } from './config';

export const buildUrl = (params?: string[]) => {
	const url = new URL(config.base_url);
	return `${url.toString()}${params ? params.join('/') : ''}`;
};

export const buildAuthHeader = ({
	nonce,
	timestamp,
	signature,
	oauth_token
}: {
	nonce: string;
	timestamp: number;
	signature: string;
	oauth_token: string;
}) =>
	`OAuth oauth_consumer_key="${config.client_key}", oauth_nonce="${nonce}", oauth_signature="${signature}", oauth_signature_method="PLAINTEXT", oauth_timestamp="${timestamp}", oauth_token="${oauth_token}"`;

export const method = {
	auth: {
		getToken: ['oauth', 'request_token'],
		postAccessToken: ['oauth', 'access_token'],
		getIdentity: ['oauth', 'identity']
	},
	user: {
		getCollectionFolders: (username: string) => ['users', username, 'collection', 'folders']
	}
};
