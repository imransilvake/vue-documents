class DocumentsService {
	/**
	 * fetch documents
	 * @returns
	 */
	documentsFetch = async () => {
		const url = 'https://apply-frontend.crosslend.net/documents.json';
		return await fetch(url).then((res) => res.json());
	};
}
const instance = new DocumentsService();
export default instance;
