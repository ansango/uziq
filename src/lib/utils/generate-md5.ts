import crypto from 'node:crypto';

export const generateMd5 = (str: string) => crypto.createHash('md5').update(str).digest('hex');
