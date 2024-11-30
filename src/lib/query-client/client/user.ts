import type {
	UserGetFriendsResponse,
	UserGetInfoResponse,
	UserGetLovedTracksResponse,
	UserGetRecentTracksResponse,
	UserGetTopAlbumsResponse,
	UserGetTopArtistsResponse,
	UserGetTopTagsResponse,
	UserGetTopTracksResponse,
	UserGetWeeklyAlbumChartResponse,
	UserGetWeeklyArtistChartResponse,
	UserGetWeeklyChartListRequest,
	UserGetWeeklyTrackChartResponse
} from '$lib/api/lastfm/services';
import { fetcher } from '$lib/utils';

export const userQueryClient = (customFetch = fetch) => ({
	getInfo: {
		queryKey: ['info'],
		queryFn: () => fetcher<UserGetInfoResponse['user']>(customFetch)('/api/user/info')
	},
	getFriends: {
		queryKey: ['friends'],
		queryFn: () => fetcher<UserGetFriendsResponse>(customFetch)('/api/user/friends')
	},
	getTopTracks: {
		queryKey: ['top-tracks'],
		queryFn: () =>
			fetcher<UserGetTopTracksResponse['toptracks']['track']>(customFetch)('/api/user/tracks')
	},
	getRecentTracks: {
		queryKey: ['recent-tracks'],
		queryFn: () =>
			fetcher<UserGetRecentTracksResponse['recenttracks']['track']>(customFetch)(
				'/api/user/tracks/recent'
			)
	},
	getLovedTracks: {
		queryKey: ['loved-tracks'],
		queryFn: () =>
			fetcher<UserGetLovedTracksResponse['lovedtracks']['track']>(customFetch)(
				'/api/user/tracks/loved'
			)
	},
	getTopArtists: {
		queryKey: ['top-artists'],
		queryFn: () =>
			fetcher<UserGetTopArtistsResponse['topartists']['artist']>(customFetch)('/api/user/artists')
	},
	getTopAlbums: {
		queryKey: ['top-albums'],
		queryFn: () =>
			fetcher<UserGetTopAlbumsResponse['topalbums']['album']>(customFetch)('/api/user/albums')
	},
	getTopTags: {
		queryKey: ['top-tags'],
		queryFn: () => fetcher<UserGetTopTagsResponse['toptags']['tag']>(customFetch)('/api/user/tags')
	},
	getWeeklyChartList: {
		queryKey: ['weekly-chart-list'],
		queryFn: () =>
			fetcher<UserGetWeeklyChartListRequest['user']>(customFetch)('/api/user/weekly/charts')
	},
	getWeeklyAlbumChart: {
		queryKey: ['weekly-album-chart'],
		queryFn: () =>
			fetcher<UserGetWeeklyAlbumChartResponse['weeklyalbumchart']['album']>(customFetch)(
				'/api/user/weekly/albums'
			)
	},
	getWeeklyArtistChart: {
		queryKey: ['weekly-artist-chart'],
		queryFn: () =>
			fetcher<UserGetWeeklyArtistChartResponse['weeklyartistchart']['artist']>(customFetch)(
				'/api/user/weekly/artists'
			)
	},
	getWeeklyTrackChart: {
		queryKey: ['weekly-track-chart'],
		queryFn: () =>
			fetcher<UserGetWeeklyTrackChartResponse['weeklytrackchart']['track']>(customFetch)(
				'/api/user/weekly/tracks'
			)
	}
});
