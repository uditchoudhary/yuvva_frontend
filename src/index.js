import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// import { createStore, applyMiddleware } from "redux";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { CookiesProvider } from "react-cookie";
import rootReducer from "./Store/Reducers/rootReducer";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
const initalState = {};

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(rootReducer, initalState, composedEnhancer);

createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </CookiesProvider>
    </BrowserRouter>
  // </React.StrictMode>
);

serviceWorker.register();
