import type {
	GetCollectionFolderReleasesResponse,
	GetReleaseResponse
} from '$lib/api/discogs/services';
import { fetcher } from '../utils/fetcher';

export const releaseQueryClient = (customFetch = fetch) => ({
	getReleases: {
		queryKey: (page: string) => ['release', page],
		queryFn: (page: string, perPage = 10) =>
			fetcher<GetCollectionFolderReleasesResponse>(customFetch)(
				`/release?page=${page}&per_page=${perPage}`
			)
	},
	getRelease: {
		queryKey: (id: string) => ['release', id],
		queryFn: (id: string) => fetcher<GetReleaseResponse>(customFetch)(`/release/${id}`)
	}
});
