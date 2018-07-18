import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
// ReactDOM.render(<Root />, document.body.appendChild(document.createElement("div")));
registerServiceWorker();
