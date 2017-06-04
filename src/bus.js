import EventEmitter from 'wolfy87-eventemitter';
const emitter = new EventEmitter();

emitter.options = {
    image: {
        uploadURL: "None"
    },

    hiddenModules: []
}

export default emitter;
