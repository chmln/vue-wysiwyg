function Emitter() {
  const self = {
    listeners: {},
    on: (eventName, handler) => {
      if (self.listeners[eventName] === undefined)
        self.listeners[eventName] = [];

      self.listeners[eventName].push(handler);
      return function () {
        const idx = self.listeners[eventName].indexOf(handler);
        if (idx == -1) {
          return;
        }
        self.listeners[eventName].splice(idx, 1);
      }
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
    customModules: [],
    paragraphSeparator: "div"
}

export default emitter;
