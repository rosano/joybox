export default require('OLSKRollupScaffold').OLSKRollupScaffoldScanStart(__dirname, {
	OLSKRollupPluginSwapTokens: Object.assign(require('OLSKUIAssets').OLSKUIAssetsSwapTokens(), {
		JBX_PLAY_PROXY_URL_TEMPLATE_SWAP_TOKEN: process.env.JBX_PLAY_PROXY_URL_TEMPLATE,
		OLSK_APROPOS_FEEDBACK_EMAIL_SWAP_TOKEN: Buffer.from(`mailto:${ process.env.OLSK_APROPOS_FEEDBACK_EMAIL }`).toString('base64'),
	}),
});
