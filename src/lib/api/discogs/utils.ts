export const generateNonce = () => Math.random().toString(36).substring(2, 15);
export const generateTimestamp = () => Math.floor(Date.now() / 1000);
export const parseOauthTokens = (response: string) =>
	response.split('&').map((item) => item.split('=')[1]);
