## Intro

This is a simplified version of state machine in javascript.

## Installation

```shell
$ npm i --save-dev y-state-machine
# or
$ yarn add --dev y-state-machine
```

## Usage

In a nutshell:

```js
import {StateMachine} from 'y-state-machine'

class YourStateMachine extends StateMachine {
  edit() {}
  onedit() {
    console.log('you are editing')
  }
}

const sm = new YourStateMachine({
  name: 'any_name_you_like',
  init: 'view',
  transitions: [
    {
      name: 'edit',
      from: 'view',
      to: 'editing'
    }
  ]
})

document.addEventListener('click', function handler(e) {
  sm.edit() // 'you are editing'
  sm.edit() // nothing happens
})

```

In the example above, you declare a simple state machine called `YourStateMachine`.

It extends the base class of `StateMachine` and has two methods: `edit` and `onedit`.

The `edit` method corresponds to the `name` field in the only element of `transitions`, 

which is one of the properties of the option that you use to instantiate `YourStateMachine`

When invoke `sm.edit()`, behind the scene, `sm` checks whether the current state match the need for such activity

In this example, the current state has to be `view` in order to invoke `edit` method successfully.

By setting `init: 'view'`, the initial state of `sm` will be `view`.

> The real codes executed would be the ones within `onedit` method.

> There should always be a `action` and `onaction` pair

`sm` will call `onedit` internally and the state will become `editing`.

The second time you try to invoke `edit`, the state would be `editing` and won't match the requirement.

In other words, nothing happens.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017-present, Yuchen Liu