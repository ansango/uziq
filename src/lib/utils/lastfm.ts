const config = {
	api_key: `${import.meta.env.LASTFM_API_KEY}`,
	app_name: `${import.meta.env.LASTFM_APPNAME}`,
	base_url: `${import.meta.env.LASTFM_API_BASE_URL}`,
	format: {
		json: 'json',
		xml: 'xml'
	},
	share_secret: `${import.meta.env.LASTFM_SHARED_SECRET}`,
	username: `${import.meta.env.LASTFM_USER}`
};

export const method = {
	user: {
		getFriends: 'user.getFriends',
		getInfo: 'user.getInfo',
		getLovedTracks: 'user.getLovedTracks',
		getPersonalTags: 'user.getPersonalTags',
		getRecentTracks: 'user.getRecentTracks',
		getTopAlbums: 'user.getTopAlbums',
		getTopArtists: 'user.getTopArtists',
		getTopTags: 'user.getTopTags',
		getTopTracks: 'user.getTopTracks',
		getWeeklyAlbumChart: 'user.getWeeklyAlbumChart',
		getWeeklyArtistChart: 'user.getWeeklyArtistChart',
		getWeeklyChartList: 'user.getWeeklyChartList',
		getWeeklyTrackChart: 'user.getWeeklyTrackChart'
	},
	album: {
		getInfo: 'album.getInfo',
		getTags: 'album.getTags',
		getTopTags: 'album.getTopTags',
		search: 'album.search'
	},
	artist: {
		getInfo: 'artist.getInfo',
		getTags: 'artist.getTags',
		getSimilar: 'artist.getSimilar',
		getTopAlbums: 'artist.getTopAlbums',
		getTopTags: 'artist.getTopTags',
		getTopTracks: 'artist.getTopTracks',
		search: 'artist.search'
	},
	track: {
		getInfo: 'track.getInfo',
		getSimilar: 'track.getSimilar',
		getTags: 'track.getTags',
		getTopTags: 'track.getTopTags',
		search: 'track.search'
	},
	tag: {
		getInfo: 'tag.getInfo',
		getTopArtists: 'tag.getTopArtists',
		getTopTracks: 'tag.getTopTracks',
		getTopAlbums: 'tag.getTopAlbums',
		getTopTags: 'tag.getTopTags',
		getSimilar: 'tag.getSimilar',
		getWeeklyChartList: 'tag.getWeeklyChartList'
	},
	library: {
		getArtists: 'library.getArtists'
	},
	chart: {
		getTopArtists: 'chart.getTopArtists',
		getTopTags: 'chart.getTopTags',
		getTopTracks: 'chart.getTopTracks'
	},
	geo: {
		getTopArtists: 'geo.getTopArtists',
		getTopTracks: 'geo.getTopTracks'
	}
};

export const buildUrl = (method: string, params: { [key: string]: string | number }) => {
	const url = new URL(config.base_url);
	url.searchParams.append('method', method);

	Object.entries(params).forEach(([key, value]) => {
		url.searchParams.append(key, value.toString());
	});

	const api_key = config.api_key;
	const format = config.format.json;

	return `${url.toString()}&api_key=${api_key}&format=${format}`;
};
