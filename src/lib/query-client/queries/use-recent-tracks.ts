import type { UserGetRecentTracksResponse } from '$lib/api/lastfm/services';
import { createQuery } from '@tanstack/svelte-query';
import { userQueryClient } from '../client';

const { getRecentTracks } = userQueryClient();

const trackUnique = (tracks: UserGetRecentTracksResponse['recenttracks']['track']) =>
	tracks.filter((track, index, self) => {
		return (
			self.findIndex(
				(t) => t.name === track.name && track.artist['#text'] === t.artist['#text']
			) === index
		);
	});

export const useGetRecentTracks = ({
	limit,
	duplicates = false,
	...rest
}: {
	limit?: number;
	staleTime?: number;
	refetchInterval?: number;
	refetchIntervalInBackground?: boolean;
	refetchOnReconnect?: boolean;
	refetchOnWindowFocus?: boolean;
	duplicates?: boolean;
}) => {
	return createQuery({
		queryKey: getRecentTracks.queryKey,
		queryFn: getRecentTracks.queryFn,
		select: (data) =>
			(!duplicates ? trackUnique(data) : data).slice(0, undefined === limit ? data.length : limit),
		...rest
	});
};
