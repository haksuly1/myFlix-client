import React from "react";
//import axios from "axios";
//import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { MainView } from "./components/main-view/main-view";
//React bootstrap
import Container from "react-bootstrap/Container";

//index.scss
import "./index.scss";

//const store = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
        <Container> 
          <MainView />
        </Container>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);

