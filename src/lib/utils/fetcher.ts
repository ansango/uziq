/**
 * Fetches data from the specified endpoint using the provided options.
 *
 * @template T - The expected return type of the response.
 * @param {string} endpoint - The URL to fetch data from.
 * @param {RequestInit} [options={}] - Optional configuration for the fetch request.
 * @returns {Promise<T>} - A promise that resolves to the fetched data.
 * @throws {Error} - Throws an error if the response is not ok.
 */
export const fetcher =
	<T>(customFetch = fetch) =>
	async (input: RequestInfo, init?: RequestInit): Promise<T> => {
		const response = await customFetch(input, init);
		if (!response.ok) throw new Error(`Error: ${response.statusText}`);
		return response.json() as Promise<T>;
	};
