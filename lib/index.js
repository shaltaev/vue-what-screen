var installFunction = function (vueConstructorInstance
// options
) {
    var scr = {
        version: "0.0.0",
        muf: [],
        setF: function (f) {
            this.muf.push(f);
        }
    };
    vueConstructorInstance.prototype.$screen = scr;
};
var vueWhatScreen = {
    install: installFunction,
    options: {}
};
export default vueWhatScreen;
