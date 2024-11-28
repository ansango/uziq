import { config } from './config';
import { generateNonce, generateTimestamp } from './utils';

export const buildUrl = (params: string[], searchParams?: { [key: string]: string | number }) => {
	const url = new URL(`${config.base_url}/${params.join('/')}`);

	if (searchParams) {
		Object.entries(searchParams).forEach(([key, value]) =>
			url.searchParams.append(key, value.toString())
		);
	}

	return url.toString();
};

export const buildAuthHeader = ({
	signature,
	extra
}: {
	signature: string;
	extra?: { [key: string]: string };
}) =>
	`OAuth oauth_consumer_key="${config.client_key}", oauth_nonce="${generateNonce()}", oauth_signature="${signature}", oauth_signature_method="PLAINTEXT", oauth_timestamp="${generateTimestamp()}"${
		extra
			? `, ${Object.entries(extra)
					.map(([key, value]) => `${key}="${value}"`)
					.join(', ')}`
			: ''
	}`;

export const method = {
	auth: {
		getToken: ['oauth', 'request_token'],
		postAccessToken: ['oauth', 'access_token'],
		getIdentity: ['oauth', 'identity']
	},
	user: {
		getCollectionFolderReleases: ({
			folderId,
			username
		}: {
			username: string;
			folderId: string;
		}) => ['users', username, 'collection', 'folders', folderId, 'releases']
	},
	release: {
		getRelease: (releaseId: string) => ['releases', releaseId]
	}
};
