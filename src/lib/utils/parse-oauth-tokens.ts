export const parseOauthTokens = (response: string) =>
	response.split('&').map((item) => item.split('=')[1]);
