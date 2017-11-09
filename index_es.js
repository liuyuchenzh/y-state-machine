var StateMachine = (function () {
    function StateMachine(option) {
        Object.assign(this, option);
        this.state = this.init;
        this.register();
    }
    StateMachine.prototype.register = function () {
        var _this = this;
        this.transitions.forEach(function (state) {
            var action = state.name;
            if (!(action in _this)) {
                console.warn("in StateMachine, forgot to declare " + action + " method in " + (_this.name ||
                    _this.constructor.name));
            }
            if (!("on" + action in _this)) {
                console.error("in StateMachine, forgot to declare on" + action + " method in " + (_this
                    .name || _this.constructor.name));
            }
            if (typeof _this[action] !== 'function') {
                console.warn("in StateMachine, method " + action + " should be a function in " + (_this
                    .name || _this.constructor.name));
            }
            if (typeof _this['on' + action] !== 'function') {
                console.error("in StateMachine, method on" + action + " should be a function in " + (_this
                    .name || _this.constructor.name));
            }
            _this[action] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var isWildCard = state.from === '*';
                var isMultiFrom = Array.isArray(state.from);
                var validSingleFrom = !isWildCard && !isMultiFrom;
                if (validSingleFrom && _this.state !== state.from) {
                    return;
                }
                else if (state.from.indexOf(_this.state) < 0) {
                    return;
                }
                _this["on" + action].apply(_this, args);
                _this.state = state.to;
            };
        });
    };
    return StateMachine;
}());

export { StateMachine };
