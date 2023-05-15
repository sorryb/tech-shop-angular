import { Action, ActionReducer, MetaReducer } from '@ngrx/store';
import { merge, pick } from 'lodash-es';

function setSavedState(state: any, localStorageKey: string) {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}

function getSavedState(localStorageKey: string): any {
  return JSON.parse(localStorage.getItem(localStorageKey) as string);
}


export const getStorageMetaReducers = (localStorageKey: string, stateKeys: Array<string>): MetaReducer<any> => {
  return <S, A extends Action = Action>(reducer: ActionReducer<S, A>) => {
    let onInit = true; // after load/refresh…
    return function(state: S, action: A): S {
      // reduce the nextState.
      const nextState = reducer(state, action);
      // init the application state.
      if (onInit) {
        onInit = false;
        const savedState = getSavedState(localStorageKey);
        return merge(nextState, savedState) as any;
      }
      // save the next state to the application storage.
      const stateToSave = pick(nextState, stateKeys);
      setSavedState(stateToSave, localStorageKey);
      return nextState as any;
    };
  };
};
