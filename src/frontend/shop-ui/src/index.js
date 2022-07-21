// Essential
import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";

// Components
import LoginPage from "./LoginPage";

// Routes
import SignUp from "./routes/sign-up";
import Home from "./routes/home";

// React Redux
import { configureStore } from "@reduxjs/toolkit";
import allReducers from "./reducers";
import { Provider } from "react-redux";

const storage = configureStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={storage}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route path="/home" element={<Home selected="home" />} />
          <Route path="/account" element={<Home selected="account" />} />
          <Route path="/wishlist" element={<Home selected="wishlist" />} />
          <Route path="/cart" element={<Home selected="cart" />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
