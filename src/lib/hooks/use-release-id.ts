import { releaseQueryClient } from '$lib/global-query-client';
import { createQuery } from '@tanstack/svelte-query';

const { getRelease } = releaseQueryClient();

export const useGetReleaseById = (id: string) =>
	createQuery({
		queryKey: getRelease.queryKey(id),
		queryFn: () => getRelease.queryFn(id),
		enabled: !!id,
		select: (data) => ({ ...data, artist: data.artists[0].name.replace(/\(\d+\)/g, '').trim() })
	});
