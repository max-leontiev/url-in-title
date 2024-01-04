async function changeTitle() { // update extension action tooltip if tab title contains the URL already
  activeTab = (await browser.tabs.query({active: true, lastFocusedWindow: true}))[0]
  if (activeTab.title.endsWith(" - " + activeTab.url)) {
    browser.action.setTitle({title: "Tab title contains URL", tabId: activeTab.id})
  }
}

if (window.matchMedia('(prefers-color-scheme: dark').matches) { // color icon based on color scheme preference
  browser.action.setIcon({
    path: {
      16: 'icons/iconwhite.svg',
      32: 'icons/iconwhite.svg',
      48: 'icons/iconwhite.svg',
      64: 'icons/iconwhite.svg',
      96: 'icons/iconwhite.svg'
    }
  })
}

browser.action.onClicked.addListener(async () => { // when extension action is clicked, append URL to tab title if it isn't already there
  browser.scripting.executeScript({
    target: {
      tabId: (await browser.tabs.query({active: true, lastFocusedWindow: true}))[0].id,
    },
    func: () => {
      if (!document.title.endsWith(" - " + window.location.href)) {
        document.title += " - " + window.location.href
      }
    }
  }).then(changeTitle) // update extension action tooltip to reflect current state
})