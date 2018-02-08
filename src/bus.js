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
    customModles: [],
    paragraphSeparator: "div"
}

export default emitter;
