class StateMachine {
    constructor(option) {
        Object.assign(this, option);
        this.state = this.init;
        this.register();
    }
    register() {
        this.transitions.forEach(state => {
            const action = state.name;
            if (!(action in this)) {
                console.warn(`in StateMachine, forgot to declare ${action} method in ${this.name ||
                    this.constructor.name}`);
            }
            if (!(`on${action}` in this)) {
                console.error(`in StateMachine, forgot to declare on${action} method in ${this
                    .name || this.constructor.name}`);
            }
            if (typeof this[action] !== 'function') {
                console.warn(`in StateMachine, method ${action} should be a function in ${this
                    .name || this.constructor.name}`);
            }
            if (typeof this['on' + action] !== 'function') {
                console.error(`in StateMachine, method on${action} should be a function in ${this
                    .name || this.constructor.name}`);
            }
            this[action] = (...args) => {
                const isWildCard = state.from === '*';
                const isMultiFrom = Array.isArray(state.from);
                const validSingleFrom = !isWildCard && !isMultiFrom;
                if (validSingleFrom && this.state !== state.from) {
                    return;
                }
                else if (state.from.indexOf(this.state) < 0) {
                    return;
                }
                this[`on${action}`](...args);
                this.state = state.to;
            };
        });
    }
}

export { StateMachine };
