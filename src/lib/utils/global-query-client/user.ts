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
} from '$lib/lastfm/services';
import { fetcher } from '../fetcher';

export const userQueryClient = (customFetch = fetch) => ({
	getInfo: {
		queryKey: ['info'],
		queryFn: () => fetcher<UserGetInfoResponse['user']>(customFetch)('/user/info')
	},
	getFriends: {
		queryKey: ['friends'],
		queryFn: () => fetcher<UserGetFriendsResponse>(customFetch)('/user/friends')
	},
	getTopTracks: {
		queryKey: ['top-tracks'],
		queryFn: () =>
			fetcher<UserGetTopTracksResponse['toptracks']['track']>(customFetch)('/user/tracks')
	},
	getRecentTracks: {
		queryKey: ['recent-tracks'],
		queryFn: () =>
			fetcher<UserGetRecentTracksResponse['recenttracks']['track']>(customFetch)(
				'/user/tracks/recent'
			)
	},
	getLovedTracks: {
		queryKey: ['loved-tracks'],
		queryFn: () =>
			fetcher<UserGetLovedTracksResponse['lovedtracks']['track']>(customFetch)('/user/tracks/loved')
	},
	getTopArtists: {
		queryKey: ['top-artists'],
		queryFn: () =>
			fetcher<UserGetTopArtistsResponse['topartists']['artist']>(customFetch)('/user/artists')
	},
	getTopAlbums: {
		queryKey: ['top-albums'],
		queryFn: () =>
			fetcher<UserGetTopAlbumsResponse['topalbums']['album']>(customFetch)('/user/albums')
	},

	getTopTags: {
		queryKey: ['top-tags'],
		queryFn: () => fetcher<UserGetTopTagsResponse['toptags']['tag']>(customFetch)('/user/tags')
	},
	getWeeklyChartList: {
		queryKey: ['weekly-chart-list'],
		queryFn: () =>
			fetcher<UserGetWeeklyChartListRequest['user']>(customFetch)('/user/weekly/charts')
	},
	getWeeklyAlbumChart: {
		queryKey: ['weekly-album-chart'],
		queryFn: () =>
			fetcher<UserGetWeeklyAlbumChartResponse['weeklyalbumchart']['album']>(customFetch)(
				'/user/weekly/albums'
			)
	},
	getWeeklyArtistChart: {
		queryKey: ['weekly-artist-chart'],
		queryFn: () =>
			fetcher<UserGetWeeklyArtistChartResponse['weeklyartistchart']['artist']>(customFetch)(
				'/user/weekly/artists'
			)
	},
	getWeeklyTrackChart: {
		queryKey: ['weekly-track-chart'],
		queryFn: () =>
			fetcher<UserGetWeeklyTrackChartResponse['weeklytrackchart']['track']>(customFetch)(
				'/user/weekly/tracks'
			)
	}
});
