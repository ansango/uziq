import { buildUrl, method } from '..';

export const releaseApiMethods = {
	getRelease: async (id: string) => {
		const response = await fetch(buildUrl(method.release.getRelease(id)), {
			headers: {
				UserAgent: 'ansango/1.0'
			}
		});

		if (!response.ok) {
			throw new Error('Failed to fetch release');
		}

		return response.json();
	}
};
