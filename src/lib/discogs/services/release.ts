import { buildUrl, method } from '..';

export const releaseApiMethods = {
	getRelease: async ({ id }: { id: string }) => {
		const response = await fetch(buildUrl(method.release.getRelease(id)));

		if (!response.ok) {
			throw new Error('Failed to fetch release');
		}

		return response.json();
	}
};
