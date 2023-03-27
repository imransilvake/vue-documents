import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import PrimeVue from 'primevue/config';

import VDocumentsTable from '@/screens/documents/VDocumentsTable.vue';
import { useDocumentsStore } from '@/stores/documents/Documents.store';

import {
	documentsApplyDateFilter,
	documentsFilterTypes,
	documentsMapDateFormat,
	documentsSortListByDate
} from './Documents.utility';

describe('Documents Store', () => {
	beforeEach(() => {
		setActivePinia(createPinia());
		mount(VDocumentsTable, {
			global: {
				plugins: [PrimeVue, createTestingPinia({ stubActions: false })]
			}
		});
	});

	it('that the documents by default are null', () => {
		const store = useDocumentsStore();
		expect(store.documents).toBe(null);
	});

	it('that the fetch documents actions is called one time', () => {
		const store = useDocumentsStore();
		expect(store.documentsFetch).toHaveBeenCalledTimes(1);
	});

	it('that the fetch documents actions is called two time', () => {
		const store = useDocumentsStore();
		store.documentsFetch();
		expect(store.documentsFetch).toHaveBeenCalledTimes(2);
	});

	it('that the document must exist between the given dates', () => {
		const list = [{ name: 'Imran', date: '2017-06-12T00:00:00.000Z' }];
		const payload = { from: '2017-05-12T00:00:00.000Z', to: '2017-07-12T00:00:00.000Z' };
		const result = documentsApplyDateFilter(list, payload);

		expect(result.length).toBe(1);
		expect(result[0].name).toEqual('Imran');
	});

	it('that the document must not exist between the given dates', () => {
		const list = [{ name: 'Imran', date: '2017-06-12T00:00:00.000Z' }];
		const payload = { from: '2017-07-12T00:00:00.000Z', to: '2017-08-12T00:00:00.000Z' };
		const result = documentsApplyDateFilter(list, payload);

		expect(result.length).toBe(0);
	});

	it('that the document must contain correct sorting order i.e new first', () => {
		const list = [
			{ name: 'company-test-document.mp3', date: '2017-06-12T00:00:00.000Z' },
			{ name: 'company-test-document.docx', date: '2017-08-12T00:00:00.000Z' }
		];
		const result = documentsSortListByDate(list);

		expect(result.length).toBe(2);
		expect(result[0].name).toEqual('company-test-document.docx');
		expect(result[1].name).toEqual('company-test-document.mp3');
	});

	it('that the document must contain only pdf and docx extensions', () => {
		const list = [
			{ name: 'company-test-document.pdf', date: '2017-06-12T00:00:00.000Z' },
			{ name: 'company-test-document.docx', date: '2017-06-12T00:00:00.000Z' }
		];
		const result = documentsFilterTypes(list);

		expect(result.length).toBe(2);
	});

	it('that the document must not contain mp3 extension', () => {
		const list = [
			{ name: 'company-test-document.mp3', date: '2017-06-12T00:00:00.000Z' },
			{ name: 'company-test-document.docx', date: '2017-06-12T00:00:00.000Z' }
		];
		const result = documentsFilterTypes(list);

		expect(result.length).toBe(1);
	});

	it('that the document date must have dd-mm-yyy format', () => {
		const list = [
			{ name: 'company-test-document.mp3', date: '2017-06-12T00:00:00.000Z' },
			{ name: 'company-test-document.docx', date: '2017-08-12T00:00:00.000Z' }
		];
		const result = documentsMapDateFormat(list);

		expect(result.length).toBe(2);
		expect(result[0]?.date).toEqual('12-06-2017');
		expect(result[1]?.date).toEqual('12-08-2017');
	});

	it('that the document date must not have yy-mm-dd format', () => {
		const list = [
			{ name: 'company-test-document.mp3', date: '2017-06-12T00:00:00.000Z' },
			{ name: 'company-test-document.docx', date: '2017-08-12T00:00:00.000Z' }
		];
		const result = documentsMapDateFormat(list);

		expect(result.length).toBe(2);
		expect(result[0]?.date).not.toEqual('2017-06-12');
		expect(result[1]?.date).not.toEqual('2017-08-12');
	});
});
