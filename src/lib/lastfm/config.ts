import {
	LASTFM_API_BASE_URL,
	LASTFM_API_KEY,
	LASTFM_APPNAME,
	LASTFM_SHARED_SECRET
} from '$env/static/private';

export const config = {
	api_key: LASTFM_API_KEY,
	app_name: LASTFM_APPNAME,
	base_url: LASTFM_API_BASE_URL,
	format: {
		json: 'json',
		xml: 'xml'
	},
	share_secret: LASTFM_SHARED_SECRET
};
