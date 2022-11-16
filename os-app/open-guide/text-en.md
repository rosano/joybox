<div class="OLSKDecorNotice">

This document is a work-in-progress. Feel free to reach out on [Mastodon](https://mastodon.online/@rosano) or [Twitter](https://twitter.com/rosano).

</div>


Joybox helps you organize audio and video links. You can add them to your collection, with tags if needed, and then go through them based on your mood.

You can also share a playlist from multiple platforms in one place.

# Add with one click

The following 'bookmarklets' can be dragged to your browser's favourites and will do something special on click.

|||
:--- | ---
| <a class="JBXGuideBookmarklet" href="javascript:i=document.querySelector('[property=%22og:image%22]');void(t=open('JBX_GUIDE_BOOKMARKLET_ORIGINJBXPlayRoute/#JBXPlayCaptureAnchor='+encodeURIComponent(location.href)+'&JBXPlayNameAnchor='+encodeURIComponent(document.title)+(!i?'':'&JBXPlayImageAnchor='+encodeURIComponent(i.getAttribute('content'))),'Joybox','toolbar=no,width=100,height=100'));t.blur();">Queue</a> | Add the current page to your list silently and in the background. |
| <a class="JBXGuideBookmarklet" href="javascript:void(t=open('JBX_GUIDE_BOOKMARKLET_ORIGINJBXPlayRoute/#JBXPlayCaptureAnchor='+encodeURIComponent(window.prompt().split(/\s/).join('%20')),'Joybox','toolbar=no,width=100,height=100'));t.blur();">Capture</a> | Enter notes to be added your list. |

# Add by pasting links or text

Text input is interpreted based on how lines are spaced. The link can be at the beginning, middle, or end of a block of text.

|||
:--- | ---
| **Two lines single-spaced:**<br><pre>JBXGuideTokenTextbox1a</pre> | Add one item. |
| **Three lines single-spaced, including a link:**<br><pre>JBXGuideTokenTextbox1b</pre> | Add one item. |
| **Two blocks double-spaced:**<br><pre>JBXGuideTokenTextbox2a</pre> | Add two items. |
| **Two blocks double-spaced, each with a link:**<br><pre>JBXGuideTokenTextbox2b</pre> | Add two items. |
| **Two lines single-spaced, each with a link:**<br><pre>JBXGuideTokenTextbox2c</pre> | Add two items. |
| **Two links on the same line:**<br><pre>JBXGuideTokenTextbox2d</pre> | Add two items. |

# Item catalog

On the left side of the interface, you can create, search, and select items. On the right side, you can edit the details.

<div class="OLSKDecorNotice">

Editing the same item on multiple devices at the same time can result in data loss. Editing different items should be safe.

</div>

*JBXPlayDetailToolbarArchiveButtonText* hides the item from the list unless there is filter text or the *JBXPlayRevealArchiveButtonText* button was pressed.

*JBXPlayDetailMediaFetchButtonText* fetches the image, metadata, and embed url.

*JBXPlayDetailFormNameFieldText* is the name for the item. If this is empty, it will be overwritten when pressing *JBXPlayDetailMediaFetchButtonText*.

*JBXPlayDetailFormNotesFieldText* can be used for any personal comments. Any text from a capture box will be placed here.

*OLSKTaxonomyFieldText* can be used to organize items and make them easier to find.

# Sharing playlists

## Sending a playlist

1. Press the *JBXPlayStashButtonText* button.
2. Select one or more items from the list, then press OK.
3. Re-order if necessary by dragging or pressing the arrow buttons, then press *JBXPlayShareCopyButtonText*.

## Receiving a playlist

The items are grouped at the top of the list in a section called *JBXPlayChunkInboxText*. These mostly behave like any other item, but they are not editable and will not appear without clicking the shared link. Try a [sample playlist](https://go.rosano.ca/joybox-sample-playlist).

Clear the inbox by pressing *JBXPlayClearInboxButtonText*.

Add an inbox item to your collection by pressing the *JBXPlayDetailToolbarQueueButtonText* button.

# API Parameters

`JBX_GUIDE_BOOKMARKLET_ORIGINJBXPlayRoute/#PARAM=TEXT`

<div class="OLSKDecorNotice">

Note: this only works with a trailing slash before `#`.

</div>

| PARAM | TEXT |
:--- | ---
| `JBXPlayCaptureAnchor` | URL or plain text. |
| `JBXPlayNameAnchor` | Item name. Note: if multiple URLs are present in `JBXPlayCaptureAnchor`, this will set the name for all items. |
| `JBXPlayInboxAnchor` | URL-encoded JSON array of objects. |

# Shortcuts

<div class="OLSKDecorNotice">

*AccessKey* refers to a one or more shortcut keys followed by a single character. Usually it's `Alt` on Windows or `Control+Alt` on macOS, but it changes [based on your browser and operating system](https://www.w3schools.com/tags/att_global_accesskey.asp#table2).

*Launcher* refers to the app's command runner: press `Alt+Space`, type the command, then press `Enter` to run.

</div>

| Item catalog ||
:--- | ---
| Open capture box | `AccessKey+n` |
| Submit capture box | `Control+Enter` or `Command+Enter` |
| Select previous or next item, if filter field is focused | `Up` or `Down` |
| Clear filter text and selected item, focus filter field | `Escape` |
| Close, if filter field is focused | `Escape` |
| `OLSKTransportLauncherItemImportJSONText` | Launcher |
| `OLSKTransportLauncherItemExportJSONText` | Launcher |

| Global ||
:--- | ---
| `OLSKRemoteStorageLauncherItemOpenLoginLinkText` | Launcher |
| `OLSKServiceWorkerLauncherItemReloadText` | Launcher |
| `OLSKServiceWorkerLauncherItemDebugForceUpdateText` | Launcher |
| Launcher | `Alt+Space` |

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

You can get a remoteStorage account for free from [5apps](https://5apps.com/storage/) or [host your own](https://remotestorage.io/servers).

You can get a Fission account for free from [Fission Auth](https://auth.fission.codes) or [setup your own server](https://github.com/fission/fission).
