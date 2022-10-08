import { configureStore } from '@reduxjs/toolkit'
import * as reducer from './modules'
import { MainState } from '@/store/modules/main'

export default configureStore({
  reducer: {
    ...reducer
  }
})

export interface RootStore {
  main: MainState
}
