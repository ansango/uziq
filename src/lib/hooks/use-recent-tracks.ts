import { clientApi } from '$lib/utils';
import { createQuery } from '@tanstack/svelte-query';
const { getRecentTracks } = clientApi();

export const useGetRecentTracks = ({
	limit,
	...rest
}: {
	limit?: number;
	staleTime?: number;
	refetchInterval?: number;
	refetchIntervalInBackground?: boolean;
	refetchOnReconnect?: boolean;
	refetchOnWindowFocus?: boolean;
}) => {
	return createQuery({
		queryKey: getRecentTracks.queryKey,
		queryFn: getRecentTracks.queryFn,
		// remove recent tracks duplicates without nowplaying attribute
		select: (data) =>
			data
				?.filter((track, index, self) => {
					return (
						self.findIndex(
							(t) => t.name === track.name && track.artist['#text'] === t.artist['#text']
						) === index
					);
				})
				.slice(0, undefined === limit ? data.length : limit),
		...rest
	});
};
