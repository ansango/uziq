/**
 * Fetches data from the specified endpoint using the provided options.
 *
 * @template T - The expected return type of the response.
 * @param {string} endpoint - The URL to fetch data from.
 * @param {RequestInit} [options={}] - Optional configuration for the fetch request.
 * @returns {Promise<T>} - A promise that resolves to the fetched data.
 * @throws {Error} - Throws an error if the response is not ok.
 */
export const fetcher = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
	const defaultOptions: RequestInit = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const response = await fetch(endpoint, {
		...defaultOptions,
		...options,
		headers: {
			...defaultOptions.headers,
			...options.headers
		}
	});

	if (!response.ok) throw new Error(`Error: ${response.statusText}`);

	return response.json() as Promise<T>;
};
