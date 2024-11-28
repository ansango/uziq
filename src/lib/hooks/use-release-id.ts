import { clientApi } from '$lib/utils';
import { createQuery } from '@tanstack/svelte-query';

const { getRelease } = clientApi();
const { queryKey, queryFn } = getRelease;

export const useGetReleaseById = (id: string) =>
	createQuery({
		queryKey: queryKey(id),
		queryFn: () => queryFn(id),
		enabled: !!id,
		select: (data) => ({ ...data, artist: data.artists[0].name.replace(/\(\d+\)/g, '').trim() })
	});
