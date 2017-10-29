export interface Transition {
    name: string;
    from: string | string[];
    to: string;
}
export interface StateMachineOption {
    name: string;
    init: string;
    transitions: Transition[];
}
export declare class StateMachine implements StateMachineOption {
    name: string;
    init: string;
    state: string;
    transitions: Transition[];
    constructor(option: StateMachineOption);
    register(): void;
}
