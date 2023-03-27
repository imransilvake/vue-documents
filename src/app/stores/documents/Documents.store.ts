import { defineStore } from 'pinia';

import { DocumentsFetchPayloadInterface, DocumentsStateInterface } from './Documents.interface';
import DocumentsService from './Documents.service';
import {
	documentsApplyDateFilter,
	documentsFilterTypes,
	documentsMapDateFormat,
	documentsSortListByDate
} from './Documents.utility';

export const useDocumentsStore = defineStore('documents', {
	state: (): DocumentsStateInterface => ({
		documents: null
	}),
	actions: {
		/**
		 * fetch documents
		 * @param payload
		 */
		async documentsFetch(payload?: DocumentsFetchPayloadInterface) {
			try {
				const res = await DocumentsService.documentsFetch();
				let list = res?.documents;

				// apply date filters
				list = payload ? documentsApplyDateFilter(list, payload) : list;

				// sort list by date
				list = documentsSortListByDate(list);

				// filter types
				list = documentsFilterTypes(list);

				// map date format
				list = documentsMapDateFormat(list);

				this.documents = list;
			} catch {
				this.documents = null;
			}
		}
	}
});
