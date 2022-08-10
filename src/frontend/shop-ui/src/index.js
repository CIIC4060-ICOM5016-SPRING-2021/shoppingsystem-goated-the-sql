// Essential
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";

// Components
import LoginPage from "./routes/LoginPage";

// Routes
import SignUp from "./routes/sign-up";
import Home from "./routes/home";

//React Redux
import { Provider } from "react-redux";
import { reduxStorage } from "./redux-storage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={reduxStorage}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route path="/home" element={<Home selected="home" />} />
          <Route path="/statistics" element={<Home selected="statistics" />} />
          <Route path="/account" element={<Home selected="account" />} />
          <Route path="/likes" element={<Home selected="likes" />} />
          <Route path="/cart" element={<Home selected="cart" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
