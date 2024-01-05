# URL in Title
A simple extension which lets you add the URL of the active tab to its title temporarily. The URL is removed from the title after 10 seconds.

## Usage
To add the URL to the active tab's title, you can either:
- Click on the URL in Title toolbar button
- Use the URL in Title keyboard shortcut (`Ctrl` + `Alt` + `S` by default).\
This shortcut can be customized - see https://support.mozilla.org/en-US/kb/manage-extension-shortcuts-firefox

After 10 seconds, the URL will be automatically removed from the tab's title.

I designed this extension for use with the [AutoType feature](https://keepass.info/help/base/autotype.html) of the KeePass password manager.\
Specifically, how I use this extension is:
1. On a page where I need to enter credentials, I use `Ctrl` + `Alt` + `S` (the extension shortcut) to add the URL to the title. This lets KeePass match the active window with the corresponding credentials in the database.

2. I press `Ctrl` + `Alt` + `A` (the default KeePass Global Auto-Type hotkey) to enter my credentials. 

## Permissions

Unlike other similar extensions (see [Alternatives](#alternatives)), this extension will **not** ask to *Access your data for all websites*. In fact, you will not be prompted for any permissions at all, since this extension gets access to the current tab **only** when you interact with it (see [Usage](#usage)).

Under the hood, this extension uses the `activeTab` and `scripting` permissions (see the [manifest](manifest.json)). `activeTab` is needed so that, when you interact with the extension, it gets permission to run a script on the active tab (using the `scripting` permission). This script adds the URL to the tab title, and removes it after a 1-second timeout (see [url-in-title.js](url-in-title.js)).

As stated in the [Request the Right Permissions](https://extensionworkshop.com/documentation/develop/request-the-right-permissions/) article in Mozilla's docs, extension developers should avoid requesting the `tabs` permission and host permissions for `<all_urls>`. However, almost all of the other URL in title extensions do this - in fact, 4 out of 5 of the most popular [alternatives](#alternatives) listed below need host permissions for `<all_urls>`, which is what causes the scary *Access your data for all websites* warning.

If you want more information about Firefox extension permissions, check out Mozilla's [Permission request messages for Firefox extensions](https://support.mozilla.org/en-US/kb/permission-request-messages-firefox-extensions) article and the [permissions docs on MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions).

## Alternatives
There are dozens (hundreds?) of extensions available that do everything this extension does, and more. Here are a few, roughly ordered by popularity:
- [Add URL to Window Title (Advanced KeePass Usage)](https://addons.mozilla.org/en-CA/firefox/addon/add-url-to-window-title/) by [Eric](https://addons.mozilla.org/en-CA/firefox/user/11022160/)
- [Tab ReTitle](https://addons.mozilla.org/en-CA/firefox/addon/tab-retitle/) by [Lazyuki](https://addons.mozilla.org/en-CA/firefox/user/13853154/)
- [URL in title](https://addons.mozilla.org/en-CA/firefox/addon/url-in-title-keepass/) by [M-Gregoire](https://addons.mozilla.org/en-CA/firefox/user/13512544/)
- [URL in Title](https://addons.mozilla.org/en-CA/firefox/addon/title-has-url/) by [em_te](https://addons.mozilla.org/en-CA/firefox/user/194/)
- [KeePass Helper - URL in title](https://addons.mozilla.org/en-CA/firefox/addon/keepass-helper-url-in-title/) by [pbanasiak](https://addons.mozilla.org/en-CA/firefox/user/1894772/)

Out of all of the alternative extensions above, I would be most inclined to use [KeePass Helper - URL in title](https://addons.mozilla.org/en-CA/firefox/addon/keepass-helper-url-in-title/) by [pbanasiak](https://addons.mozilla.org/en-CA/firefox/user/1894772/), since it does not request host permissions for `<all_urls>` (see [Permissions](#permissions) for more info). However, it still requests the `tabs` permission, which is unnecessary for my use case. Also, although the extension uses the [MPL 2.0](http://www.mozilla.org/MPL/2.0/) open-source license, the author does not link to the source code. I don't like this because it means I'd have to install the extension to look at the code.

## Another alternative: a bookmarklet

Here is a bookmarklet that provides similar functionality to this extension:
```
javascript:void((() => {document.title = document.title.endsWith(" - " + window.location.href) ? document.title : document.title + " - " + window.location.href;setTimeout(() => {document.title = document.title.endsWith(" - " + window.location.href) ? document.title.slice(0, -(" - ".concat(window.location.href).length)) : document.title;}, 10000)})())
```
The code has no line breaks because bookmarklets must be one liners.\
For more info, see [Bookmarklet](https://en.wikipedia.org/wiki/Bookmarklet) on Wikipedia.

Like this extension, the above bookmarklet adds the URL to the current tab's title when clicked and removes it after 10 seconds. However, the bookmarklet cannot be used with a shortcut (unless you use another extension that lets you assign a shortcut to a bookmark).

## Why another URL in title extension?
If there are so many alternatives, why did I create this extension?\
These were my reasons, in order of importance:

1. Other URL in title extensions ask for excessive permissions - namely, host permissions for `<all_urls>` (which shows up in Firefox as *Access your data for all websites*). I do not like this, even though I can look at the source code and see that nothing untoward is going on. This also goes against the best practices layed out by Mozilla in their [Request the Right Permissions](https://extensionworkshop.com/documentation/develop/request-the-right-permissions/) article. See the [Permissions](#permissions) section for a more thorough discussion.

2. Other URL in title extensions add the URL to every tab's title, and leave it there indefinitely. This is unnecessary and (in my opinion) a bit annoying.

3. Other URL in title extensions do more than I need them to. This is obviously a positive for people who need those extra features, but I don't (and I assume I'm not the only one).

4. I wanted to start making my own browser extensions, and this project was an easy starting point.

## License

This project is licensed under the GPLv3 License - see the [LICENSE.txt](LICENSE.txt) file for details.\
Copyright © 2023 Max Leontiev
