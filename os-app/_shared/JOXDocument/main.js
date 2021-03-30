import { factory } from 'ulid';
const uniqueID = factory();
import OLSKRemoteStorage from 'OLSKRemoteStorage';

const mod = {

	JOXDocumentErrors (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('JOXErrorInputNotValid');
		}

		const errors = {};

		if (typeof inputData.JOXDocumentID !== 'string') {
			errors.JOXDocumentID = [
				'JOXErrorNotString',
			];
		} else if (!inputData.JOXDocumentID.trim()) {
			errors.JOXDocumentID = [
				'JOXErrorNotFilled',
			];
		}

		if (!(inputData.JOXDocumentCreationDate instanceof Date) || Number.isNaN(inputData.JOXDocumentCreationDate.getTime())) {
			errors.JOXDocumentCreationDate = [
				'JOXErrorNotDate',
			];
		}

		if (!(inputData.JOXDocumentModificationDate instanceof Date) || Number.isNaN(inputData.JOXDocumentModificationDate.getTime())) {
			errors.JOXDocumentModificationDate = [
				'JOXErrorNotDate',
			];
		}

		if (typeof inputData.JOXDocumentNotes !== 'string') {
			errors.JOXDocumentNotes = [
				'JOXErrorNotString',
			];
		}

		if (typeof inputData.JOXDocumentURL !== 'undefined') {
			if (typeof inputData.JOXDocumentURL !== 'string') {
				errors.JOXDocumentURL = [
					'JOXErrorNotString',
				];
			}
		}

		if (typeof inputData.JOXDocumentName !== 'undefined') {
			if (typeof inputData.JOXDocumentName !== 'string') {
				errors.JOXDocumentName = [
					'JOXErrorNotString',
				];
			}
		}

		if (typeof inputData.JOXDocumentIsArchived !== 'undefined') {
			if (typeof inputData.JOXDocumentIsArchived !== 'boolean') {
				errors.JOXDocumentIsArchived = [
					'JOXErrorNotBoolean',
				];
			}
		}

		return Object.entries(errors).length ? errors : null;
	},
	
	JOXDocumentDirectory () {
		return 'jox_documents';
	},

	JOXDocumentObjectPath (inputData) {
		return `${ mod.JOXDocumentDirectory() }/${ inputData.JOXDocumentID }`;
	},

	JOXDocumentStub (inputData) {
		return {
			JOXDocumentID: inputData.split('/').pop(),
		};
	},

};

export default Object.assign(mod, {
	ZDRSchemaKey: 'JOXDocument',
	ZDRSchemaDispatchValidate: mod.JOXDocumentErrors,
	ZDRSchemaPath: mod.JOXDocumentObjectPath,
	ZDRSchemaStub: mod.JOXDocumentStub,
	ZDRSchemaMethods: {
		
		JOXDocumentCreate (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('JOXErrorInputNotValid');
			}

			const JOXDocumentCreationDate = new Date();

			return this.App.JOXDocument.ZDRModelWriteObject(Object.assign(inputData, Object.assign({
				JOXDocumentID: uniqueID(),
				JOXDocumentCreationDate,
				JOXDocumentModificationDate: JOXDocumentCreationDate,
			}, inputData)));
		},

		JOXDocumentUpdate (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('JOXErrorInputNotValid');
			}

			return this.App.JOXDocument.ZDRModelWriteObject(Object.assign(inputData, {
				JOXDocumentModificationDate: new Date(),
			}));
		},

		async JOXDocumentList () {
			return Object.values(await this.App.ZDRStorageListingObjects(mod.JOXDocumentDirectory())).map(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse);;
		},

	},
});
