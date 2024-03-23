import { getContext, setContext } from 'svelte';

const SECTION_HEADING_CONTEXT_KEY = Symbol('section heading context');

export default function get_heading_level() {
	const level = getContext<number | undefined>(SECTION_HEADING_CONTEXT_KEY) ?? 0;
	return setContext(SECTION_HEADING_CONTEXT_KEY, level + 1);
}

export function set_heading_level(level: number) {
	setContext(SECTION_HEADING_CONTEXT_KEY, level);
}
