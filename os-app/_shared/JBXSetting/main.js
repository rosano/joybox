const mod = {

	JBXSettingErrors (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('JBXErrorInputNotValid');
		}

		const errors = {};

		if (typeof inputData.JBXSettingKey !== 'string') {
			errors.JBXSettingKey = [
				'JBXErrorNotString',
			];
		} else if (!inputData.JBXSettingKey.trim()) {
			errors.JBXSettingKey = [
				'JBXErrorNotFilled',
			];
		}

		if (typeof inputData.JBXSettingValue !== 'string') {
			errors.JBXSettingValue = [
				'JBXErrorNotString',
			];
		}

		return Object.entries(errors).length ? errors : null;
	},

	JBXSettingDirectory () {
		return 'jbx_settings';
	},

	JBXSettingPath (inputData) {
		return `${ mod.JBXSettingDirectory() }/${ inputData.JBXSettingKey }`;
	},

	JBXSettingStub (inputData) {
		return {
			JBXSettingKey: inputData.split('/').pop(),
		};
	},

};

export default Object.assign(mod, {
	ZDRSchemaKey: 'JBXSetting',
	ZDRSchemaDispatchValidate: mod.JBXSettingErrors,
	ZDRSchemaPath: mod.JBXSettingPath,
	ZDRSchemaStub: mod.JBXSettingStub,
	ZDRSchemaMethods: {
		
		async JBXSettingList () {
			return Object.values(await this.App.JBXSetting.ZDRModelListObjects());
		},

	},
});
