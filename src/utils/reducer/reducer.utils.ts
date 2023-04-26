import { AnyAction } from "redux";

type Matchable<AC extends ()=>AnyAction> = AC & {
    type: ReturnType<AC>['type'];
    match(action: AnyAction): action is ReturnType<AC>;
}

//Function Overloading

//Action creator with paramater
export function withMatcher<AC extends () => AnyAction & {type: string}>(actionCreator: AC): Matchable<AC>;

//Action creator without paramater (any number of argument)
export function withMatcher<AC extends (...args: any[]) => AnyAction & {type: string}>(actionCreator: AC): Matchable<AC>;

//Generic function
export function withMatcher(actionCreator: Function){
    const type = actionCreator().type;
    return Object.assign(actionCreator, {
        type,
        match(action: AnyAction){
            return action.type === type;
        }
    })
}

//Action Type which define action with payload
export type ActionWithPayload<T, P> = {
    type: T;
    payload: P;
}

//Action Type without payload
export type Action<T> = {
    type: T;
}

//Function Overloading

//Create Action with payload
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

//Create Action without payload
export function createAction<T extends string>(type: T, payload: void): Action<T>;

//This will handle both case with Action with payload and Action without payload
export function createAction<T extends string, P>(type: T, payload: P){
    return { type, payload }
}

// export const createAction = (type, payload) => ({ type, payload });
