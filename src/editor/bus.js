function Emitter() {
  const self = {
    listeners: {},
    on: (eventName, handler) => {
      if (self.listeners[eventName] === undefined)
        self.listeners[eventName] = [];
      self.listeners[eventName].push(handler);
    },
    emit: (eventName, ...args) => {
      if (self.listeners[eventName] !== undefined)
        self.listeners[eventName].forEach(handler => handler.apply(args));
    }
  }

  return self;
}

const emitter = new Emitter();

emitter.options = {
    image: {
        uploadURL: "None",
        dropzoneOptions: {}
    },
    hideModules: {},
    modulesOrder: [],
    paragraphSeparator: "div",
    maxHeight: undefined,
    pasteAsPlainText: false,
    customModules: [],
}

emitter.utils = {
  getHTMLOfSelection () {
    if (window.getSelection !== undefined) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const clonedSelection = selection.getRangeAt(0).cloneContents();
        const div = document.createElement('div');
        div.appendChild(clonedSelection);
        return div.innerHTML;
      }
    }

    return '';
  }
}

export default emitter;
