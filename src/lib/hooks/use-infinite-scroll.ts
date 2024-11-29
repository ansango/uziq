type Params = {
	action: () => void;
	element: HTMLElement;
};

export const useInfiniteScroll = () => (params: Params) => {
	const { action, element } = params;
	if (element) {
		const observer = new IntersectionObserver(
			(entries) => {
				const first = entries[0];
				if (first.isIntersecting) {
					action();
				}
			},
			{ threshold: 1 }
		);
		observer.observe(element);
	}
};
