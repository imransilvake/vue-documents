export interface DocumentsStateInterface {
	documents: DocumentsContentInterface[] | null;
}

export interface DocumentsContentInterface {
	date: string;
	name: string;
}

export interface DocumentsFetchPayloadInterface {
	from: string;
	to: string;
}
