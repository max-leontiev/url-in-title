/*
URL in Title - a simple Firefox extension that lets you add the current tab's URL to its title with the click of a button.
Copyright (C) 2024 Max Leontiev

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License 
as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. 
If not, see <https://www.gnu.org/licenses/>. 
*/

function addAndRemoveURL() {
  // append URL to title if it isn't there already
  if (!document.title.endsWith(' - ' + window.location.href)) {
    document.title += ' - ' + window.location.href;
  }
  // remove URL from title after 10 seconds
  setTimeout(() => {
    if (document.title.endsWith(' - ' + window.location.href)) {
      document.title = document.title.slice(
        0,
        -' - '.concat(window.location.href).length
      );
    }
  }, 10000);
}

async function addURLtoTitle(tab) {
  // executes script on the specified tab
  await browser.scripting.executeScript({
    target: {
      tabId: tab.id,
    },
    func: addAndRemoveURL,
  });
}

// when toolbar button (AKA extension action) is clicked, append URL to title
browser.action.onClicked.addListener(addURLtoTitle);
// when keyboard shortcut is used, append URL to title
browser.commands.onCommand.addListener(async (command) => {
  if (command === 'Add URL to title') {
    addURLtoTitle(
      (await browser.tabs.query({ active: true, lastFocusedWindow: true }))[0]
    );
  }
});
