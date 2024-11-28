import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			aspectRatio: {
				square: '1/1'
			}
		}
	},

	plugins: [typography, containerQueries, aspectRatio]
} as Config;
