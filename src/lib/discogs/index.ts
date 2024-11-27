import { DISCOGS_API_BASE_URL, DISCOGS_API_TOKEN } from '$env/static/private';

const config = {
	base_url: DISCOGS_API_BASE_URL,
	token: DISCOGS_API_TOKEN
};

export const buildUrl = (params?: string[]) => {
	const url = new URL(config.base_url);
	const api_token = config.token;
	return `${url.toString()} ${params ? params.join('/') : ''}?token=${api_token}`;
};
