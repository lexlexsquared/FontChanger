'use strict'

let fontOverwrite = '* {font-family: Papyrus, fantasy !important}' //The !important rule in CSS is used to add more importance to a property/value than normal.
let transformOverwrite = '* {text-transform:uppercase}'

// if we don't have the styleDom, create it
let styleDom = document.getElementById('i-know-what-you-did-style') //asserts new id for each style dom manipulation
if (!styleDom) {
  styleDom = document.querySelector('head').appendChild(document.createElement('style'))
  styleDom.id = 'i-know-what-you-did-style'
  styleDom.rel = 'stylesheet'
  styleDom.type = 'text/css'
}
const updateStyle = () => {
  window.chrome.storage.sync.get(['status', 'uppercase'], (items) => {
    if (!window.chrome.runtime.error) {
      if (items.status && items.uppercase) {
        styleDom.innerText = fontOverwrite + transformOverwrite
      } else if (items.status) {
        styleDom.innerText = fontOverwrite
      } else {
        styleDom.innerText = ''
      }
    }
  })
}

// run once on file load
updateStyle()

// runs every time the `popup-script.js` file send a message to `background.js`
window.chrome.runtime.onMessage.addListener(updateStyle)