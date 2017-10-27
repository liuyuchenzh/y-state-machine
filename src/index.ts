export interface Transition {
  name: string
  from: string | string[]
  to: string
}

export interface StateMachineOption {
  name: string
  init: string
  transitions: Transition[]
}

/**
 * const sm = new StateMachine(option)
 * mutation of a -> b
 * we call it an action
 * in transition, it will be
 * { { name: 'action', from: 'a', to: 'b' } }
 * when an action happens
 * internally will invoke sm.action()
 * meanwhile, StateMachine will check whether the current state satisfy the change // sm.state === transitions.action.from
 * if it meets the requirement, invoke sm.onaction() and toggle state // sm.state = transition.action.to
 * otherwise ignore the action
 */
export class StateMachine implements StateMachineOption {
  name: string
  init: string
  state: string
  transitions: Transition[]

  constructor(option: StateMachineOption) {
    Object.assign(this, option)
    this.state = this.init
    this.register()
  }

  register() {
    this.transitions.forEach(state => {
      const action: string = state.name
      // error handling
      // no action
      if (!(action in this)) {
        console.warn(
          `in StateMachine, forgot to declare ${action} method in ${this.name ||
          this.constructor.name}`
        )
      }
      // no onAction
      if (!(`on${action}` in this)) {
        console.error(
          `in StateMachine, forgot to declare on${action} method in ${this
            .name || this.constructor.name}`
        )
      }
      // action is not function
      if (typeof this[action] !== 'function') {
        console.warn(
          `in StateMachine, method ${action} should be a function in ${this
            .name || this.constructor.name}`
        )
      }
      // onAction is not function
      if (typeof this['on' + action] !== 'function') {
        console.error(
          `in StateMachine, method on${action} should be a function in ${this
            .name || this.constructor.name}`
        )
      }

      // reassign action
      this[action] = (...args) => {
        // from could be wildcard
        const isWildCard: boolean = state.from === '*'
        // and it also could be array
        const isMultiFrom: boolean = Array.isArray(state.from)
        const validSingleFrom: boolean = !isWildCard && !isMultiFrom
        if (validSingleFrom && this.state !== state.from) {
          return
        } else if (state.from.indexOf(this.state) < 0) {
          return
        }
        this[`on${action}`](...args)
        this.state = state.to
      }
    })
  }
}
