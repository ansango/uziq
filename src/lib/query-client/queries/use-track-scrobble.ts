import type { TrackScrobbleResponse } from '$lib/api/lastfm/services';

import { addToast } from '$lib/stores';
import { createMutation, QueryClient } from '@tanstack/svelte-query';
import { trackQueryClient, userQueryClient } from '../client';
import { fetcher } from '$lib/utils';

type Params = {
	queryClient: QueryClient;
	id: string;
};

const { postTrackScrobble } = trackQueryClient();
const { getRecentTracks } = userQueryClient();

export const usePostTrackScrobble = ({ id, queryClient }: Params) => {
	return createMutation({
		mutationKey: postTrackScrobble.mutationKey(id),
		mutationFn: ({ album, artist, track }: { artist: string; album: string; track: string }) =>
			fetcher<{
				srobble: TrackScrobbleResponse['scrobbles']['scrobble'];
				requestParams: {
					artist: string;
					track: string;
					album: string;
				};
			}>()(`/api/track/${artist}/${track}/?album=${album}`, {
				method: 'POST'
			}),
		onSuccess: ({ requestParams: { album, artist, track } }) => {
			addToast({
				message: `${track} scrobbled!`,
				type: 'success',
				dismissible: true,
				timeout: 3000
			});
			queryClient.invalidateQueries({ queryKey: getRecentTracks.queryKey });
			queryClient.invalidateQueries({ queryKey: ['track', track, artist, album] });
		},
		onError: () => {
			addToast({
				message: 'Failed to scrobble track',
				type: 'error',
				dismissible: true,
				timeout: 3000
			});
		}
	});
};
