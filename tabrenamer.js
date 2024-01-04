async function changeTitle() {
  activeTab = (await browser.tabs.query({active: true, lastFocusedWindow: true}))[0]
  if (activeTab.title.endsWith(" - " + activeTab.url)) {
    browser.action.setTitle({title: "Tab title contains URL", tabId: activeTab.id})
  }
}

// th = async () => (await browser.theme.getCurrent())
// browser.theme.getCurrent().then(console.log)
if (window.matchMedia('(prefers-color-scheme: dark').matches) {
  browser.action.setIcon({
    path: {
      16: 'icons/iconwhite.svg',
      32: 'icons/iconwhite.svg',
      48: 'icons/iconwhite.svg',
      64: 'icons/iconwhite.svg',
      96: 'icons/iconwhite.svg'
    }
  })
  console.log("prefers dark")
}

browser.action.onClicked.addListener(async () => {
  browser.scripting.executeScript({
    target: {
      tabId: (await browser.tabs.query({active: true, lastFocusedWindow: true}))[0].id,
    },
    func: () => {
      if (!document.title.endsWith(" - " + window.location.href)) {
        document.title += " - " + window.location.href
      }
    }
  }).then(changeTitle)
})