import type { TrackScrobbleRequest } from '$lib/api/lastfm/services';

import { addToast } from '$lib/stores';
import { createMutation, QueryClient } from '@tanstack/svelte-query';
import { trackQueryClient, userQueryClient } from '../client';

type Params = {
	queryClient: QueryClient;
	id: string;
};

const { postTrackScrobble } = trackQueryClient();
const { getRecentTracks } = userQueryClient();

export const usePostTrackScrobble = ({ id, queryClient }: Params) =>
	createMutation({
		mutationKey: postTrackScrobble.mutationKey(id),
		mutationFn: (data: Omit<TrackScrobbleRequest, 'sk' | 'timestamp'>) =>
			postTrackScrobble.queryFn(id, data),
		onSuccess: ({ track }) => {
			addToast({
				message: `${track['#text']} scrobbled!`,
				type: 'success',
				dismissible: true,
				timeout: 3000
			});
			queryClient.invalidateQueries({ queryKey: getRecentTracks.queryKey });
			queryClient.invalidateQueries({ queryKey: ['track', track['#text']] });
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
