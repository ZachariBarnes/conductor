import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "./reducers";

// persist config
const persistConfig = {
  key: "app",
  storage
};

// redux devtool integration
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  return createStore(
    persistReducer(persistConfig, reducers),
    composeEnhancers(applyMiddleware(thunk))
  );
};

// store is exported and is accessible for ad-hoc require
export const store = configureStore();

// persistor is exported and is accessible for persist gate functions
export const persistor = persistStore(store);
