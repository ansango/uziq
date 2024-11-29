export const parseArtistDiscogs = (artist: string) => artist.replace(/\(\d+\)/g, '').trim();
