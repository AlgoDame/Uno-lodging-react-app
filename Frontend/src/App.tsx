import React from 'react';
import Container from './Container/Container';
import "./global styles/global.css";
import { withRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/AuthContext"
function App() {
  return (
    <div className="App">
      <AuthContextProvider><Container /></AuthContextProvider>
    </div>
  );
}

export default withRouter(App);
