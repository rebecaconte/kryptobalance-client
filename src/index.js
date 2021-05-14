import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import MyNavbar from "./components/MyNavbar";
import MyFooter from "./components/MyFooter"


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MyNavbar />
      <App />
      <MyFooter />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
