import { addToast } from '$lib/stores';
import { createMutation, QueryClient } from '@tanstack/svelte-query';
import { trackQueryClient, userQueryClient } from '../client';

const { postBatchTrackScrobble } = trackQueryClient();
const { getRecentTracks } = userQueryClient();

type Params = {
	queryClient: QueryClient;
	id: string;
};

export const usePostTrackBatchScrobble = ({ queryClient, id }: Params) =>
	createMutation({
		mutationKey: postBatchTrackScrobble.mutationKey(id),
		mutationFn: (data: {
			id: string;
			artist: string;
			album: string;
			tracklist: { name: string }[];
		}) =>
			postBatchTrackScrobble.queryFn(data.id, {
				tracklist: data.tracklist.map((track) => track.name),
				artist: data.artist,
				album: data.album
			}),
		onSuccess: () => {
			addToast({
				message: 'Album scrobbled!',
				type: 'success',
				dismissible: true,
				timeout: 3000
			});
			queryClient.invalidateQueries({ queryKey: getRecentTracks.queryKey });
		},
		onError: () => {
			addToast({
				message: 'Failed to scrobble album',
				type: 'error',
				dismissible: true,
				timeout: 3000
			});
		}
	});
