import { createStore } from 'redux';

import { loadState } from './modules/localstorage'
import rootReducer from './modules/rootReducer';

const store = createStore(rootReducer,loadState() );
store.subscribe(() => {
  saveState({
    todos: store.getState().todos
  })
})

export default store
