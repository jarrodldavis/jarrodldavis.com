export interface Extractor {
	(): Promise<void>;
	in_path: string;
	out_path: string;
}
