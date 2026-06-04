export function url_display(raw_url: string) {
	const url = new URL(raw_url);
	return (url.hostname + url.pathname).replace(/\/$/, '');
}
