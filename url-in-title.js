async function queryActiveTabs() {
  return browser.tabs.query({active: true, lastFocusedWindow: true})
}

async function updateActionTooltip() { // update extension action tooltip if tab title contains the URL already
  tab = (await queryActiveTabs())[0]
  if (tab.title.endsWith(" - " + tab.url)) {
    browser.action.setTitle({title: "Tab title contains URL", tabId: tab.id})
  }
}

async function addURLtoTabTitle(tab) {
  await browser.scripting.executeScript({
    target: {
      tabId: tab.id,
    },
    func: () => {
      if (!document.title.endsWith(" - " + window.location.href)) {
        document.title += " - " + window.location.href
      }
    }
  }).then(updateActionTooltip) // update extension action tooltip to reflect current state
}

if (window.matchMedia('(prefers-color-scheme: dark').matches) { // color icon based on color scheme preference
  browser.action.setIcon({
    path: 'icons/iconwhite.svg'
  })
}

browser.action.onClicked.addListener(addURLtoTabTitle) // when extension action is clicked, append URL to tab title if it isn't already there
browser.commands.onCommand.addListener(async (command) => { // when keyboard shortcut is activated
  if (command === "add-url-to-title") {
    addURLtoTabTitle((await queryActiveTabs())[0])
  }
});