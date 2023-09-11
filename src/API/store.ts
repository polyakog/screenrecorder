import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { recordApi } from './recordApi'



export const store = configureStore({
  reducer: {
    [recordApi.reducerPath]: recordApi.reducer,
 
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      recordApi.middleware,
     
    ),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
