import { generateMd5 } from './generate-md5';

export const generateSignature = (
	params: Record<string, string | number | undefined>,
	shareSecret: string
) => {
	const paramKeysSig = Object.keys(params)
		.sort()
		.reduce((acc: string, key: string) => `${acc}${key}${params[key]}`, '');
	const partialApiSig = `${paramKeysSig}${shareSecret}`;
	return generateMd5(partialApiSig);
};
