function addAndRemoveURL() {
  if (!document.title.endsWith(" - " + window.location.href)) { // append URL to title if it isn't there already
    document.title += " - " + window.location.href
  }
  setTimeout(() => { // remove URL from title after 1 second
    if (document.title.endsWith(" - " + window.location.href)) { 
      document.title = document.title.slice(0, -(" - ".concat(window.location.href).length))
    }
  }, 1000)
}

async function addURLtoTitle(tab) {
  await browser.scripting.executeScript({
    target: {
      tabId: tab.id,
    },
    func: addAndRemoveURL
  })
}

if (window.matchMedia('(prefers-color-scheme: dark').matches) { // color icon based on color scheme preference
  browser.action.setIcon({
    path: 'icons/iconwhite.svg'
  })
}

browser.action.onClicked.addListener(addURLtoTitle) // when extension action is clicked, append URL to tab title if it isn't already there
browser.commands.onCommand.addListener(async (command) => { // when keyboard shortcut is activated
  if (command === "Add URL to title") {
    addURLtoTitle((await browser.tabs.query({active: true, lastFocusedWindow: true}))[0])
  }
});
