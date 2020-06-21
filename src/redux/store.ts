import { createStore, applyMiddleware, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer, initialState } from './reducer'

const persistedState = localStorage.getItem('markerList') ? JSON.parse(localStorage.getItem('markerList')!)
                                                          : initialState

const localStorageMiddleware: Middleware = store => next => action => {
    next({...action});
  
    // *** обновляем данные в localStorage ***
    localStorage.setItem('markerList', JSON.stringify(store.getState()));
  };

export const store = createStore(
  reducer,  
  persistedState, 
  composeWithDevTools((applyMiddleware(localStorageMiddleware)))
);