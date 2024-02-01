import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import appReducer from "./state"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
/* Import redux persist */
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistorStore
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { PersistGate } from "redux-persist/integration/react"

/* Configuring redux persist */
const persistConfig = { key: "root", storage, version: 1 }

const persistedReducer = persistReducer(persistConfig, appReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

/* Call this function to purge redux store */
// const persistor = persistStore(store)
// persistor.purge()

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <App />
    </PersistGate>
  </Provider>

)

