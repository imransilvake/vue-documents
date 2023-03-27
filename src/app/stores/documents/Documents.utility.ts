import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { DocumentsContentInterface, DocumentsFetchPayloadInterface } from './Documents.interface';

dayjs.extend(isBetween);

const allowedTypes = ['pdf', 'docx'];

/**
 * apply date filter (from and to)
 * @param documents
 * @param payload
 * @returns
 */
export const documentsApplyDateFilter = (documents: DocumentsContentInterface[], payload: DocumentsFetchPayloadInterface) =>
	documents?.filter((d) => dayjs(d.date).isBetween(payload.from, payload.to, 'day', '[]'));

/**
 * sort list by date
 * @param documents
 * @returns
 */
export const documentsSortListByDate = (documents: DocumentsContentInterface[]) =>
	documents?.sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());

/**
 * filter document types
 * allowed types: .pdf, .docx
 * @param documents
 * @returns
 */
export const documentsFilterTypes = (documents: DocumentsContentInterface[]) =>
	documents?.filter((d) => {
		const extension = d.name.split('.').pop() || '';
		return allowedTypes.includes(extension);
	});

/**
 * map date format
 * type: dd-mm-yyyy
 * @param documents
 * @returns
 */
export const documentsMapDateFormat = (documents: DocumentsContentInterface[]) =>
	documents?.map((d) => ({ ...d, date: dayjs(d.date).format('DD-MM-YYYY') }));
