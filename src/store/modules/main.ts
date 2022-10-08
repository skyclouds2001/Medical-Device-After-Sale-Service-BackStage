import { createSlice } from '@reduxjs/toolkit'

export interface MainState {
  counter: number
  title: string
}

const initialState: MainState = {
  counter: 0,
  title: 'redux toolkit pre'
}

export const main = createSlice({
  name: 'main',

  initialState,

  reducers: {
    setCounter(state, { payload }) {
      state.counter = payload.counter
    }
  }
})

export const { setCounter } = main.actions

export default main.reducer
