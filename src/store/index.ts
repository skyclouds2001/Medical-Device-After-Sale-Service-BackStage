import { createStore } from 'redux'
import type { Reducer, Action } from 'redux'

export interface CustomState {
  title: string
}

export interface CustomAction extends Action<string> {
  title: string
}

export type CustomReducer = Reducer<CustomState, CustomAction>

const defaultState: CustomState = {
  title: ''
}

const reducer: CustomReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'title/update':
      return { title: action.title }
    default:
      return state
  }
}

const store = createStore(reducer)

export default store
