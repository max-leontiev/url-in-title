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

async function addURLtoTitle(tab) { // executes script on the specified tab
  await browser.scripting.executeScript({
    target: {
      tabId: tab.id,
    },
    func: addAndRemoveURL
  })
}

browser.action.onClicked.addListener(addURLtoTitle) // when toolbar button (AKA extension action) is clicked, append URL to title
browser.commands.onCommand.addListener(async (command) => { // when keyboard shortcut is used, append URL to title
  if (command === "Add URL to title") {
    addURLtoTitle((await browser.tabs.query({active: true, lastFocusedWindow: true}))[0])
  }
});
