import { clientApi } from '$lib/utils';
import { createInfiniteQuery } from '@tanstack/svelte-query';
const { getReleases } = clientApi();
export const useInfiniteGetReleases = () =>
	createInfiniteQuery({
		queryKey: ['releases'],
		queryFn: ({ pageParam }) => getReleases.queryFn(String(pageParam)),
		initialPageParam: 1,
		getNextPageParam: ({ pagination }) => {
			return pagination.urls.next ? pagination.page + 1 : undefined;
		},
		select: (data) => {
			return {
				pages: data.pages.map((page) => {
					return {
						releases: page.releases.map((release) => {
							return {
								title: release.basic_information.title,
								artist: release.basic_information.artists[0].name,
								cover_image: release.basic_information.cover_image,
								id: release.id
							};
						})
					};
				}),
				pageParams: data.pageParams
			};
		},
		staleTime: 1000 * 60 * 10
	});
