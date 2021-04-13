import OLSKString from 'OLSKString';

const mod = {

	JBXPlayListItemHumanURL (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('JBXErrorInputNotValid');
		}

		return OLSKString.OLSKStringSnippet(inputData.replace(/https?:\/\/(www\.)?/, ''));
	},

};

export default mod;
