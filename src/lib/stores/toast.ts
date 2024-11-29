import { writable } from 'svelte/store';

export const toasts = writable<
	{
		id: number;
		type: 'info' | 'success' | 'error';
		message: string;
		dismissible: boolean;
		timeout: number;
	}[]
>([]);

export const addToast = (toast: {
	type: 'info' | 'success' | 'error';
	dismissible?: boolean;
	timeout?: number;
	message: string;
}) => {
	// Create a unique ID so we can easily find/remove it
	// if it is dismissible/has a timeout.
	const id = Math.floor(Math.random() * 10000);

	// Setup some sensible defaults for a toast.
	const defaults = {
		id,
		type: 'info',
		dismissible: true,
		timeout: 3000
	};

	// Push the toast to the top of the list of toasts
	toasts.update((all) => [{ ...defaults, ...toast }, ...all]);

	// If toast is dismissible, dismiss it after "timeout" amount of time.
	if (toast.timeout) setTimeout(() => dismissToast(id), toast.timeout);
};

export const dismissToast = (id: number) => {
	toasts.update((all) => all.filter((t) => t.id !== id));
};
