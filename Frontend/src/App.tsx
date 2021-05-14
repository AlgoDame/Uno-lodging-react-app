import React from 'react';
import Container from './Container';
import "./global styles/global.css";
import { withRouter } from "react-router-dom"
function App() {
  return (
    <div className="App">
      <Container />
    </div>
  );
}

export default withRouter(App);
