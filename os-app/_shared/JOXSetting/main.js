const mod = {

	JOXSettingErrors (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('JOXErrorInputNotValid');
		}

		const errors = {};

		if (typeof inputData.JOXSettingKey !== 'string') {
			errors.JOXSettingKey = [
				'JOXErrorNotString',
			];
		} else if (!inputData.JOXSettingKey.trim()) {
			errors.JOXSettingKey = [
				'JOXErrorNotFilled',
			];
		}

		if (typeof inputData.JOXSettingValue !== 'string') {
			errors.JOXSettingValue = [
				'JOXErrorNotString',
			];
		}

		return Object.entries(errors).length ? errors : null;
	},

	JOXSettingDirectory () {
		return 'jox_settings';
	},

	JOXSettingPath (inputData) {
		return `${ mod.JOXSettingDirectory() }/${ inputData.JOXSettingKey }`;
	},

	JOXSettingStub (inputData) {
		return {
			JOXSettingKey: inputData.split('/').pop(),
		};
	},

};

export default Object.assign(mod, {
	ZDRSchemaKey: 'JOXSetting',
	ZDRSchemaDispatchValidate: mod.JOXSettingErrors,
	ZDRSchemaPath: mod.JOXSettingPath,
	ZDRSchemaStub: mod.JOXSettingStub,
	ZDRSchemaMethods: {
		
		async JOXSettingList () {
			return Object.values(await this.App.JOXSetting.ZDRModelListObjects());
		},

	},
});
