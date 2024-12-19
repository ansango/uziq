import { fetcher } from '$lib/utils';
import type { Track } from '../../../routes/api/track/mapper';
import type { ResponsePostTrackScrobble } from '../../../routes/api/track/scrobble/+server';

type TrackParams = {
	artist: string;
	track: string;
};

type PostTrackParams = TrackParams & {
	album: string;
};

type PostBatchTrackParams = Omit<PostTrackParams, 'track'> & {
	tracklist: string[];
};

export const trackQueryClient = (customFetch = fetch) => ({
	getTrack: ({ artist, track }: TrackParams) => ({
		queryKey: ['track', artist, track],
		queryFn: () =>
			fetcher<Track>(customFetch)(`/api/track`, {
				method: 'POST',
				body: JSON.stringify({ artist, track })
			})
	}),
	postTrackScrobble: ({ artist, track }: TrackParams) => ({
		mutationKey: ['scrobble', artist, track],
		mutationFn: ({ album, artist, track }: PostTrackParams) =>
			fetcher<ResponsePostTrackScrobble>()(`/api/track/scrobble`, {
				method: 'POST',
				body: JSON.stringify({ album, artist, track })
			})
	}),
	postBatchTrackScrobble: (releaseId: string) => ({
		mutationKey: ['scrobble', releaseId],
		mutationFn: (params: PostBatchTrackParams) =>
			fetcher<boolean>(customFetch)(`/api/release/${releaseId}`, {
				method: 'POST',
				body: JSON.stringify(params)
			})
	})
});
