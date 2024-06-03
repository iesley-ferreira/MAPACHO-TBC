// import { configureStore } from '@reduxjs/toolkit'
// import createSagaMiddleware from 'redux-saga'
// import rootReducer from '../reducers'
// import rootSaga from '../sagas'

// const sagaMiddleware = createSagaMiddleware()

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(sagaMiddleware),
// })

// sagaMiddleware.run(rootSaga)

// export default store

// export type AppDispatch = typeof store.dispatch
// export type RootState = ReturnType<typeof store.getState>
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers'
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
