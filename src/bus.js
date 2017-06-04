import EventEmitter from 'wolfy87-eventemitter';
const emitter = new EventEmitter();

emitter.options = {
    image: {
        uploadURL: "None"
    },

    hideModules: {}
}

export default emitter;
