<div class="OLSKDecorNotice">

This document is a work-in-progress. Feel free to reach out on [Mastodon](https://merveilles.town/@rosano) or [Twitter](https://twitter.com/rosano).

</div>

# Shortcuts

<div class="OLSKDecorNotice">

*AccessKey* refers to a one or more shortcut keys followed by a single character. Usually it's `Alt` on Windows or `Control+Alt` on macOS, but it changes [based on your browser and operating system](https://www.w3schools.com/tags/att_global_accesskey.asp#table2).

*Launcher* refers to the app's command runner: press `Alt+Enter`, type the command, then press `Enter` to run.

</div>

| List of memos ||
:--- | ---
| Create new card | `AccessKey+n` |
| Select previous or next card, if filter field is focused | `Up` or `Down` |
| Clear filter text and selected card, focus filter field | `Escape` |
| Close, if filter field is focused | `Escape` |
| `OLSKTransportLauncherItemImportJSONText` | Launcher |
| `OLSKTransportLauncherItemExportJSONText` | Launcher |

| Global ||
:--- | ---
| `OLSKRemoteStorageLauncherItemOpenLoginLinkText` | Launcher |
| `OLSKServiceWorkerLauncherItemReloadText` | Launcher |
| `OLSKServiceWorkerLauncherItemDebugForceUpdateText` | Launcher |
| Launcher | `Alt+Enter` |

| Global (when cloud is connected) ||
:--- | ---
| `OLSKRemoteStorageLauncherItemCopyLoginLinkText` | Launcher |
| `OLSKFundLauncherItemEnterClueText` | Launcher |
| `OLSKFundLauncherItemClearClueText` | Launcher |
| `OLSKRemoteStorageLauncherItemDebugFlushDataText` | Launcher |

# Add to Home screen on mobile and tablet devices

This web app can be 'installed' and used as if it were a native mobile app (with an icon, working without internet access, running as a standalone app outside of the browser).

1. [Open the app](JBXPlayRoute) in your browser, then follow the steps based on your operating system:

## iOS + Safari
2. Tap the Share button <img height="22" valign="middle" alt="Share button icon" src="/_shared/__external/OLSKUIAssets/_OLSKSharediOSShare.svg" />
3. Tap *Add to Home Screen* <img height="22" valign="middle" alt="Add to Home Screen icon" src="/_shared/__external/OLSKUIAssets/_OLSKSharediOSA2HS.svg">

## Android + Chrome
2. Tap the More button <img height="22" valign="middle" alt="More button icon" src="/_shared/__external/OLSKUIAssets/_OLSKSharedAndroidMore.svg" />
3. Tap *Add to home screen*

# What are remoteStorage and Fission?

[remoteStorage](https://remotestorage.io) and [Fission](https://fission.codes) are open protocols for synchronizing data between multiple devices. Both take the level of control and flexibility of something like email and bring it to your personal data. You could think of it as a USB key for your documents that you can plug into websites to work on your stuff.

You can get a remoteStorage account for free from [5apps](https://5apps.com/storage/) or [host your own](https://wiki.remotestorage.io/Servers).

You can get a Fission account for free from [Fission Auth](https://auth.fission.codes) or [setup your own server](https://github.com/fission-suite/fission-suite).
