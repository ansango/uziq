import { createQuery } from '@tanstack/svelte-query';
import { releaseQueryClient } from '../client';

const { getRelease } = releaseQueryClient();

export const useGetReleaseById = (id: string) =>
	createQuery({
		queryKey: getRelease.queryKey(id),
		queryFn: () => getRelease.queryFn(id),
		enabled: !!id,
		staleTime: Infinity
	});
