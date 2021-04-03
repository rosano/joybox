<script>
import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';

const uSerial2 = function (inputData) {
	return inputData.reduce(async function (coll, e) {
		return (await coll).concat(await new Promise(function (res, rej) {
			try {
				res(e());
			} catch (error) {
				rej(error);
			}
		}));
	}, Promise.resolve([]));
};

import JBXDocument from '../_shared/JBXDocument/main.js';
import JBXSetting from '../_shared/JBXSetting/main.js';
import JBXTransport from '../_shared/JBXTransport/main.js';
import JBXPlayLogic from './ui-logic.js';
import OLSKThrottle from 'OLSKThrottle';
import OLSKRemoteStorage from 'OLSKRemoteStorage';
import OLSKObject from 'OLSKObject';
import OLSKServiceWorker from 'OLSKServiceWorker';
import RemoteStorage from 'remotestoragejs';
import OLSKString from 'OLSKString';
import OLSKLanguageSwitcher from 'OLSKLanguageSwitcher';
import OLSKQueue from 'OLSKQueue';
import OLSKTransport from 'OLSKTransport';
import zerodatawrap from 'zerodatawrap';

const mod = {

	// VALUE

	_ValueIsLoading: true,

	_ValueFormIsVisible: false,
	_ValueFormData: '',

	_ValueRevealArchiveIsVisible: false,

	async ValueSetting (param1, param2) {
		await mod._ValueZDRWrap.App.JBXSetting.ZDRModelWriteObject({
			JBXSettingKey: param1,
			JBXSettingValue: param2,
		});

		mod._ValueSettingsAll[param1] = param2;
	},
	
	_ValueCloudToolbarHidden: true,

	_ValueSaveDocumentThrottleMap: {},

	_ValueSavePublishThrottleMap: {},

	_IsRunningDemo: false,

	// DATA

	DataSetting (inputData) {
		return mod._ValueSettingsAll[inputData];
	},

	DataNavigator () {
		return navigator.serviceWorker ? navigator : {
			serviceWorker: {},
		};
	},

	DataPlayRecipes () {
		const outputData = [];

		if (OLSK_SPEC_UI()) {
			outputData.push(...[
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncCreateDocument',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncCreateDocument () {
						return mod.ZDRSchemaDispatchSyncCreateDocument(await mod._ValueZDRWrap.App.JBXDocument.JBXDocumentCreate(mod.FakeDocumentObjectValid('FakeZDRSchemaDispatchSyncCreateDocument')));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncUpdateDocument',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncUpdateDocument () {
						return mod.ZDRSchemaDispatchSyncUpdateDocument(await mod._ValueZDRWrap.App.JBXDocument.JBXDocumentUpdate(Object.assign(mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
							return e.JBXDocumentNotes.match('FakeZDRSchemaDispatchSync');
						}).pop(), {
							JBXDocumentNotes: 'FakeZDRSchemaDispatchSyncUpdateDocument',
						})));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncDeleteDocument',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncDeleteDocument () {
						return mod.ZDRSchemaDispatchSyncDeleteDocument(await mod._ValueZDRWrap.App.JBXDocument.ZDRModelDeleteObject(mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
							return e.JBXDocumentNotes.match('FakeZDRSchemaDispatchSync');
						}).pop()));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncConflictDocument',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncConflictDocument () {
						const item = mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
							return e.JBXDocumentNotes.match('FakeZDRSchemaDispatchSyncConflictDocument');
						}).pop();
						
						return mod.ZDRSchemaDispatchSyncConflictDocument({
							origin: 'conflict',
							oldValue: JSON.parse(JSON.stringify(await mod._ValueZDRWrap.App.JBXDocument.JBXDocumentUpdate(Object.assign({}, item, {
								JBXDocumentNotes: item.JBXDocumentNotes + '-local',
							})))),
							newValue: JSON.parse(JSON.stringify(Object.assign({}, item, {
								JBXDocumentNotes: item.JBXDocumentNotes + '-remote',
							}))),
						});
					},
				},
			]);
		}

		outputData.push(...zerodatawrap.ZDRRecipes({
			ParamMod: mod,
			ParamSpecUI: OLSK_SPEC_UI(),
		}));

		outputData.push(...OLSKTransport.OLSKTransportRecipes({
			ParamWindow: window,
			OLSKLocalized: OLSKLocalized,
			OLSKTransportDispatchImportJSON: mod.OLSKTransportDispatchImportJSON,
			OLSKTransportDispatchExportInput: mod.OLSKTransportDispatchExportInput,
			ParamSpecUI: OLSK_SPEC_UI(),
		}));

		if (mod._ValueZDRWrap.ZDRStorageProtocol === zerodatawrap.ZDRProtocolRemoteStorage()) {
			outputData.push(...OLSKRemoteStorage.OLSKRemoteStorageRecipes({
				ParamWindow: window,
				ParamStorage: mod._ValueZDRWrap.ZDRStorageClient(),
				OLSKLocalized: OLSKLocalized,
				ParamMod: mod,
				ParamSpecUI: OLSK_SPEC_UI(),
			}));
		}

		outputData.push(...OLSKServiceWorker.OLSKServiceWorkerRecipes(window, mod.DataNavigator(), OLSKLocalized, OLSK_SPEC_UI()));

		if (mod._JBXPlayDetail) {
			outputData.push(...mod._JBXPlayDetail.modPublic.JBXPlayDetailRecipes());
		}

		if (mod._ValueRevealArchiveIsVisible) {
			outputData.push({
				LCHRecipeSignature: 'JBXPlayLauncherItemRevealArchive',
				LCHRecipeName: OLSKLocalized('JBXPlayRevealArchiveButtonText'),
				LCHRecipeCallback: function JBXPlayLauncherItemRevealArchive () {
					mod.ControlRevealArchive();
				},
			});
		}

		return outputData;
	},

	DataIsMobile () {
		return window.innerWidth <= 760;
	},

	FakeDocumentObjectValid(inputData) {
		return {
			JBXDocumentNotes: inputData || '',
		};
	},

	// INTERFACE

	InterfaceAddButtonDidClick () {
		mod._ValueFormIsVisible = !mod._ValueFormIsVisible;
	},

	InterfaceFormSubmitButtonDidClick (event) {
		event.preventDefault();

		JBXPlayLogic.JBXPlayDocuments(mod._ValueFormData).map(mod.ControlDocumentAdd);

		mod._ValueFormIsVisible = false;
		mod._ValueFormData = '';
	},

	InterfaceWindowDidKeydown (event) {
		if (window.Launchlet.LCHSingletonExists()) {
			return;
		}

		const handlerFunctions = {};

		handlerFunctions[event.key] && handlerFunctions[event.key]();
	},

	// CONTROL

	ControlDocumentSave(inputData) {
		OLSKThrottle.OLSKThrottleMappedTimeout(mod._ValueSaveDocumentThrottleMap, inputData.JBXDocumentID, {
			OLSKThrottleDuration: 500,
			OLSKThrottleCallback () {
				mod._ValueZDRWrap.App.JBXDocument.JBXDocumentUpdate(inputData);
			},
		});

		if (OLSK_SPEC_UI()) {
			OLSKThrottle.OLSKThrottleSkip(mod._ValueSaveDocumentThrottleMap[inputData.JBXDocumentID])	
		}
	},

	async ControlDocumentAdd (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogInsert(await mod._ValueZDRWrap.App.JBXDocument.JBXDocumentCreate(inputData));

		if (OLSK_SPEC_UI()) {
			return;
		}

		mod.ControlDocumentFetch(inputData);
	},
	
	_ControlHotfixUpdateInPlace(inputData) {
		mod.ControlDocumentActivate(inputData);
		mod._JBXPlayDetail.modPublic._JBXPlayDetailTriggerUpdate();
	},
	
	ControlDocumentActivate(inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);

		if (!inputData) {
			return;
		}

		mod._OLSKCatalog.modPublic.OLSKCatalogFocusDetail();

		if (mod.DataIsMobile()) {
			return;
		}
	},

	ControlDocumentArchive (inputData) {
		inputData.JBXDocumentIsArchived = true;

		mod.ControlDocumentSave(inputData);

		mod.ControlDocumentActivate(inputData); // #purge-svelte-force-update
	},
	
	ControlDocumentUnarchive (inputData) {
		delete inputData.JBXDocumentIsArchived;

		mod.ControlDocumentSave(inputData);

		mod.ControlDocumentActivate(inputData); // #purge-svelte-force-update
	},
	
	async ControlDocumentFetch (inputData) {
		mod.ControlDocumentSave(await mod._ValueFetchQueue.OLSKQueueAdd(function () {
			return JBXPlayLogic.JBXPlayFetch(inputData);
		}));

		mod._OLSKCatalog.modPublic.OLSKCatalogUpdate(inputData);
	},
	
	ControlDocumentDiscard (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogRemove(inputData);

		mod._ValueZDRWrap.App.JBXDocument.ZDRModelDeleteObject(inputData);
	},

	ControlRevealArchive () {
		mod._ValueRevealArchiveIsVisible = false;
	},

	// MESSAGE

	_OLSKCatalogDispatchKey (inputData) {
		return inputData.JBXDocumentID;
	},

	OLSKCatalogDispatchClick (inputData) {
		mod.ControlDocumentActivate(inputData);
	},

	OLSKCatalogDispatchArrow (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);
	},

	OLSKCatalogDispatchArchivedHide () {
		mod._ValueRevealArchiveIsVisible = true;
	},

	OLSKCatalogDispatchArchivedShow () {
		mod._ValueRevealArchiveIsVisible = false;
	},

	OLSKCatalogDispatchQuantity () {},

	OLSKAppToolbarDispatchApropos () {
		mod._OLSKModalView.modPublic.OLSKModalViewShow();
	},

	OLSKAppToolbarDispatchTongue () {
		if (window.Launchlet.LCHSingletonExists()) {
			return window.Launchlet.LCHSingletonDestroy();
		}

		// #hotfix launchlet show all items
		let selected;

		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: OLSKLanguageSwitcher.OLSKLanguageSwitcherRecipes({
				ParamLanguageCodes: window.OLSKPublicConstants('OLSKSharedPageLanguagesAvailable'),
				ParamCurrentLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
				ParamSpecUI: OLSK_SPEC_UI(),
				ParamWindow: window,
				ParamRouteConstant: window.OLSKPublicConstants('OLSKSharedActiveRouteConstant'),
				OLSKCanonical: window.OLSKCanonical,
			}).map(function (e) {
				const item = e.LCHRecipeCallback;

				return Object.assign(e, {
					LCHRecipeCallback () {
						selected = item;
					},
				})
			}),
			LCHOptionCompletionHandler () {
			  selected && selected();
			},
			LCHOptionMode: Launchlet.LCHModePreview,
			LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
		});
	},

	OLSKAppToolbarDispatchCloud () {
		mod._ValueCloudToolbarHidden = !mod._ValueCloudToolbarHidden;
	},

	OLSKAppToolbarDispatchLauncher () {
		if (window.Launchlet.LCHSingletonExists()) {
			return window.Launchlet.LCHSingletonDestroy();
		}

		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: mod.DataPlayRecipes(),
			LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
		});
	},

	JBXPlayDetailDispatchBack () {
		mod._OLSKCatalog.modPublic.OLSKCatalogFocusMaster();
	},

	JBXPlayDetailDispatchArchive () {
		mod.ControlDocumentArchive(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
	},

	JBXPlayDetailDispatchUnarchive () {
		mod.ControlDocumentUnarchive(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
	},

	JBXPlayDetailDispatchFetch () {
		mod.ControlDocumentFetch(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
	},

	JBXPlayDetailDispatchUpdate () {
		mod.ControlDocumentSave(mod._OLSKCatalog.modPublic.OLSKCatalogUpdate(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected()));
	},

	JBXPlayDetailDispatchDiscard () {
		mod.ControlDocumentDiscard(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
	},

	async OLSKTransportDispatchImportJSON (inputData) {
		await mod._ValueZDRWrap.App.JBXTransport.JBXTransportImport(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(inputData));

		await mod.SetupCatalog();
	},

	async OLSKTransportDispatchExportInput () {
		return mod._ValueZDRWrap.App.JBXTransport.JBXTransportExport({
			JBXDocument: mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll(),
			JBXSetting: await mod._ValueZDRWrap.App.JBXSetting.JBXSettingList(),
		});
	},

	ZDRSchemaDispatchSyncCreateDocument (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogInsert(inputData);
	},

	ZDRSchemaDispatchSyncUpdateDocument (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogUpdate(inputData);
		
		if (!OLSK_SPEC_UI() && mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected() && mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected().JBXDocumentID === inputData.JBXDocumentID) {
			mod._ControlHotfixUpdateInPlace(inputData);
		}
	},

	ZDRSchemaDispatchSyncDeleteDocument (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogRemove(inputData);
	},

	ZDRSchemaDispatchSyncConflictDocument (inputData) {
		return setTimeout(async function () {
			mod._OLSKCatalog.modPublic.OLSKCatalogUpdate(await mod._ValueZDRWrap.App.JBXDocument.JBXDocumentUpdate(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateConflictSelectRecent(inputData))))
		}, OLSK_SPEC_UI() ? 0 : 500);
	},

	async OLSKCloudFormDispatchSubmit (inputData) {
		const protocol = zerodatawrap.ZDRPreferenceProtocolConnect(inputData);
		(zerodatawrap.ZDRPreferenceProtocolMigrate() ? await mod.DataStorageClient(protocol) : mod._ValueZDRWrap).ZDRCloudConnect(inputData);
	},

	OLSKCloudDispatchRenew () {
		mod._ValueZDRWrap.ZDRCloudReconnect(mod._ValueCloudIdentity);
	},

	OLSKCloudStatusDispatchDisconnect () {
		mod._ValueZDRWrap.ZDRCloudDisconnect();

		mod._ValueCloudIdentity = null;

		zerodatawrap.ZDRPreferenceProtocolClear();
	},

	ZDRParamDispatchError (error) {
		mod._ValueCloudErrorText = error.toString();
	},

	ZDRParamDispatchConnected (identity, token) {
		mod._ValueCloudIdentity = identity;
		mod._ValueCloudToken = token;
	},

	ZDRParamDispatchOnline () {
		mod._ValueCloudIsOffline = false;
	},

	ZDRParamDispatchOffline () {
		mod._ValueCloudIsOffline = true;
	},

	ZDRParamDispatchSyncDidStart () {
		mod._ValueIsSyncing = true;
	},

	ZDRParamDispatchSyncDidStop () {
		mod._ValueIsSyncing = false;
	},

	OLSKCloudStatusDispatchSyncStart () {
		if (mod._ValueZDRWrap.ZDRStorageProtocol !== zerodatawrap.ZDRProtocolRemoteStorage()) {
			return;
		}

		mod._ValueZDRWrap.ZDRStorageClient().startSync();

		mod.ZDRParamDispatchSyncDidStart();
	},

	OLSKCloudStatusDispatchSyncStop () {
		if (mod._ValueZDRWrap.ZDRStorageProtocol !== zerodatawrap.ZDRProtocolRemoteStorage()) {
			return;
		}

		mod._ValueZDRWrap.ZDRStorageClient().stopSync();
	},

	// SETUP

	DataStorageClient (inputData) {
		return zerodatawrap.ZDRWrap({
			ZDRParamLibrary: (function() {
				if (inputData === zerodatawrap.ZDRProtocolFission()) {
					return webnative;
				}

				return RemoteStorage;
			})(),
			ZDRParamScopes: [{
				ZDRScopeKey: 'App',
				ZDRScopeDirectory: 'joybox',
				ZDRScopeCreatorDirectory: 'rCreativ',
				ZDRScopeSchemas: [
					Object.assign(JBXDocument, {
						ZDRSchemaDispatchSyncCreate: mod.ZDRSchemaDispatchSyncCreateDocument,
						ZDRSchemaDispatchSyncUpdate: mod.ZDRSchemaDispatchSyncUpdateDocument,
						ZDRSchemaDispatchSyncDelete: mod.ZDRSchemaDispatchSyncDeleteDocument,
						ZDRSchemaDispatchSyncConflict: mod.ZDRSchemaDispatchSyncConflictDocument,
					}),
					JBXSetting,
					JBXTransport,
					],
			}],
			ZDRParamDispatchError: mod.ZDRParamDispatchError,
			ZDRParamDispatchConnected: mod.ZDRParamDispatchConnected,
			ZDRParamDispatchOnline: mod.ZDRParamDispatchOnline,
			ZDRParamDispatchOffline: mod.ZDRParamDispatchOffline,
			_ZDRParamDispatchJSONPreStringify: OLSKObject.OLSKObjectSafeCopy,
			_ZDRParamDispatchJSONPostParse: OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse,
		})
	},

	async SetupStorageClient() {
		mod._ValueZDRWrap = await mod.DataStorageClient(zerodatawrap.ZDRPreferenceProtocol(zerodatawrap.ZDRProtocolRemoteStorage()));
	},

	async SetupCatalog() {
		if (zerodatawrap.ZDRPreferenceProtocolMigrate()) {
			const client = await mod.DataStorageClient(zerodatawrap.ZDRPreferenceProtocolMigrate());

			await Promise.all((await client.App.ZDRStoragePathsRecursive('/')).map(async function (e) {
				await mod._ValueZDRWrap.App.ZDRStorageWriteObject(e, await client.App.ZDRStorageReadObject(e));
				await client.App.ZDRStorageDeleteFile(e);
			}));

			zerodatawrap.ZDRPreferenceProtocolMigrateClear();

			client.ZDRCloudDisconnect();
		};

		if (!(await mod._ValueZDRWrap.App.JBXDocument.JBXDocumentList()).map(mod._OLSKCatalog.modPublic.OLSKCatalogInsert).length) {
			mod.OLSKCatalogDispatchQuantity(0);
		}
	},

	async SetupValueSettingsAll() {
		mod._ValueSettingsAll = Object.fromEntries((await mod._ValueZDRWrap.App.JBXSetting.JBXSettingList()).map(function (e) {
			return [e.JBXSettingKey, e.JBXSettingValue];
		}));
	},

	async SetupValueFetchQueue() {
		mod._ValueFetchQueue = OLSKQueue.OLSKQueueAPI();
	},

	SetupLoading () {
		mod._ValueIsLoading = false;

		if (mod.DataIsMobile()) {
			return;
		}

		setTimeout(function () {
			document.querySelector('.OLSKMasterListFilterField').focus();
		})
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		return uSerial2(Object.keys(mod).filter(function (e) {
			return e.match(/^Setup/);
		}).map(function (e) {
			return mod[e];
		}));
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleWillMount);

import OLSKCatalog from 'OLSKCatalog';
import JBXPlayListItem from '../sub-listing/main.svelte';
import JBXPlayDetail from '../sub-detail/main.svelte';
import OLSKAppToolbar from 'OLSKAppToolbar';
import OLSKServiceWorkerView from '../../node_modules/OLSKServiceWorker/main.svelte';
import OLSKInstall from 'OLSKInstall';
import OLSKCloud from 'OLSKCloud';
import OLSKWebView from 'OLSKWebView';
import OLSKModalView from 'OLSKModalView';
import OLSKApropos from 'OLSKApropos';
import OLSKUIAssets from 'OLSKUIAssets';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeydown } />

<div class="JBXPlay OLSKViewport" class:OLSKIsLoading={ mod._ValueIsLoading } class:OLSKIsDemoing={ mod._IsRunningDemo }>

<div class="OLSKViewportContent">

<OLSKCatalog
	bind:this={ mod._OLSKCatalog }

	OLSKMasterListItemAccessibilitySummaryFunction={ JBXPlayLogic.JBXPlayAccessibilitySummary }

	_OLSKCatalogArchiveField={ 'JBXDocumentIsArchived' }
	
	OLSKCatalogSortFunction={ JBXPlayLogic.JBXPlaySortFunction }
	OLSKCatalogIsMatch={ JBXPlayLogic.JBXPlayIsMatch }
	OLSKCatalogExactSortFunction={ JBXPlayLogic.JBXPlayExactSortFunction }

	_OLSKCatalogDispatchKey={ mod._OLSKCatalogDispatchKey }

	OLSKCatalogDispatchClick={ mod.OLSKCatalogDispatchClick }
	OLSKCatalogDispatchArrow={ mod.OLSKCatalogDispatchArrow }
	OLSKCatalogDispatchArchivedHide={ mod.OLSKCatalogDispatchArchivedHide }
	OLSKCatalogDispatchArchivedShow={ mod.OLSKCatalogDispatchArchivedShow }
	OLSKCatalogDispatchQuantity={ mod.OLSKCatalogDispatchQuantity }

	let:OLSKResultsListItem
	>

	<!-- MASTER -->

	<div class="OLSKToolbarElementGroup" slot="OLSKMasterListToolbarTail">
		<button class="JBXPlayToggleFormButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('JBXPlayToggleFormButtonText') } on:click={ mod.InterfaceAddButtonDidClick } accesskey="n">
			<div class="JBXPlayToggleFormButtonImage">{@html OLSKUIAssets._OLSKSharedCreate }</div>
		</button>
	</div>

	<!-- MASTER BODY HEAD -->

	{#if mod._ValueFormIsVisible }
		<div class="JBXPlayForm OLSKDecor OLSKDecorBigForm OLSKCommonEdgeBottom">
			<p>
				<textarea class="JBXPlayFormField" placeholder={ OLSKLocalized('JBXPlayFormFieldText') } bind:value={ mod._ValueFormData } autofocus></textarea>
			</p>
			<p>
				<button class="JBXPlayFormSubmitButton" on:click={ mod.InterfaceFormSubmitButtonDidClick }>{ OLSKLocalized('JBXPlayFormSubmitButtonText') }</button>
			</p>
		</div>
	{/if}

	<!-- MASTER LIST ITEM -->

	<div slot="OLSKMasterListItem">
		<JBXPlayListItem JBXPlayListItemObject={ OLSKResultsListItem } />
	</div>

	<!-- MASTER BODY TAIL -->

	<div class="OLSKMasterListBodyTail" slot="OLSKMasterListBodyTail">{#if mod._ValueRevealArchiveIsVisible }
		<button class="JBXPlayRevealArchiveButton OLSKDecorPress" on:click={ mod._OLSKCatalog.modPublic.OLSKCatalogRevealArchive }>{ OLSKLocalized('JBXPlayRevealArchiveButtonText') }</button>
	{/if}</div>

	<!-- DETAIL -->
	
	<div class="JBXPlayDetailContainer" slot="OLSKCatalogDetailContent" let:OLSKCatalogItemSelected>
		<JBXPlayDetail
			JBXPlayDetailItem={ OLSKCatalogItemSelected }
			JBXPlayDetailDispatchBack={ mod.JBXPlayDetailDispatchBack }
			JBXPlayDetailDispatchArchive={ mod.JBXPlayDetailDispatchArchive }
			JBXPlayDetailDispatchUnarchive={ mod.JBXPlayDetailDispatchUnarchive }
			JBXPlayDetailDispatchFetch={ mod.JBXPlayDetailDispatchFetch }
			JBXPlayDetailDispatchUpdate={ mod.JBXPlayDetailDispatchUpdate }
			JBXPlayDetailDispatchDiscard={ mod.JBXPlayDetailDispatchDiscard }
			bind:this={ mod._JBXPlayDetail }
			/>
	</div>

</OLSKCatalog>

</div>

<footer class="JBXPlayViewportFooter OLSKMobileViewFooter">

	{#if !mod._ValueCloudToolbarHidden }
		<div class="JBXPlayCloudToolbar OLSKToolbar OLSKToolbarJustify OLSKCommonEdgeTop">
			<div class="OLSKToolbarElementGroup">
			</div>

			<div class="OLSKToolbarElementGroup">
				<OLSKCloud
					OLSKCloudErrorText={ mod._ValueCloudErrorText }
					OLSKCloudDispatchRenew={ mod.OLSKCloudDispatchRenew }
					OLSKCloudFormDispatchSubmit={ mod.OLSKCloudFormDispatchSubmit }
					OLSKCloudStatusIdentityText={ mod._ValueCloudIdentity }
					OLSKCloudStatusIsSyncing={ mod._ValueIsSyncing }
					OLSKCloudStatusDispatchSyncStart={ mod.OLSKCloudStatusDispatchSyncStart }
					OLSKCloudStatusDispatchSyncStop={ mod.OLSKCloudStatusDispatchSyncStop }
					OLSKCloudStatusDispatchDisconnect={ mod.OLSKCloudStatusDispatchDisconnect }
					/>
			</div>
		</div>
	{/if}

	<OLSKAppToolbar
		OLSKAppToolbarDispatchApropos={ mod.OLSKAppToolbarDispatchApropos }
		OLSKAppToolbarDispatchTongue={ mod.OLSKAppToolbarDispatchTongue }
		OLSKAppToolbarGuideURL={ window.OLSKCanonical('JBXGuideRoute') }
		OLSKAppToolbarCloudConnected={ !!mod._ValueCloudIdentity }
		OLSKAppToolbarCloudOffline={ mod._ValueCloudIsOffline }
		OLSKAppToolbarCloudError={ !!mod._ValueCloudErrorText }
		OLSKAppToolbarDispatchCloud={ mod.OLSKAppToolbarDispatchCloud }
		OLSKAppToolbarDispatchLauncher={ mod.OLSKAppToolbarDispatchLauncher }
		/>

	<OLSKInstall />

	{#if !OLSK_SPEC_UI()}
		<OLSKServiceWorkerView OLSKServiceWorkerRegistrationRoute={ window.OLSKCanonical('JBXServiceWorkerRoute') } />
	{/if}
</footer>

</div>

<OLSKModalView OLSKModalViewTitleText={ OLSKLocalized('OLSKAproposHeadingText') } bind:this={ mod._OLSKModalView } OLSKModalViewIsCapped={ true }>
	<OLSKApropos
		OLSKAproposFeedbackValue={ `javascript:window.location.href = window.atob('${ window.btoa(OLSKString.OLSKStringFormatted(window.atob('OLSK_APROPOS_FEEDBACK_EMAIL_SWAP_TOKEN'), 'RP_X' + (mod._ValueFundClue ? '+' + mod._ValueFundClue : ''))) }')` }
		/>
</OLSKModalView>

<style>
.JBXPlayForm {
	font-size: unset;
}

.JBXPlayForm p:last-child {
	margin-bottom: 0;
}

.OLSKMasterListBodyTail {
	padding: 10px;
	
	/* @OLSKMasterListBodyTailFlexbox:Parent */
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
