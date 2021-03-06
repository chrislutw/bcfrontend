import Vue from 'vue'

export default function() {
  const Clipboard = {
    install() {
      window.Clipboard = (function(window, document, navigator) {
        let textArea

        function isOS() {
          return navigator.userAgent.match(/ipad|iphone/i)
        }

        function createTextArea(text) {
          textArea = document.createElement('textArea')
          textArea.value = text
          document.body.appendChild(textArea)
        }

        function selectText() {
          let range, selection

          if (isOS()) {
            range = document.createRange()
            range.selectNodeContents(textArea)
            selection = window.getSelection()
            selection.removeAllRanges()
            selection.addRange(range)
            textArea.setSelectionRange(0, 999999)
          } else {
            textArea.select()
          }
        }

        function copyToClipboard() {
          document.execCommand('Copy')
          document.body.removeChild(textArea)
        }

        const copy = function(text) {
          createTextArea(text)
          selectText()
          copyToClipboard()
        }

        return {
          copy
        }
      })(window, document, navigator)
    }
  }

  Vue.use(Clipboard)
}
