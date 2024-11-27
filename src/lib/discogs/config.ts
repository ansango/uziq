import {
	DISCOGS_API_BASE_URL,
	DISCOGS_CALLBACK_URL,
	DISCOGS_CLIENT_KEY,
	DISCOGS_SECRET_KEY
} from '$env/static/private';

export const config = {
	base_url: DISCOGS_API_BASE_URL,
	client_key: DISCOGS_CLIENT_KEY,
	secret_key: DISCOGS_SECRET_KEY,
	callback_url: DISCOGS_CALLBACK_URL
};
