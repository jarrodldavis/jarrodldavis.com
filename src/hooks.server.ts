import type { HandleServerError } from '@sveltejs/kit';
import { inspect, styleText } from 'node:util';

export const handleError: HandleServerError = ({ error, event, status }) => {
	console.error(
		'%s\n%s',
		styleText(['bold', 'red'], `[${status}] ${event.request.method} ${event.url.pathname}`),
		status === 404 && error instanceof Error ? error.message : inspect(error, { colors: true })
	);
};
