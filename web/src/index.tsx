import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./styles/index.scss";
import reportWebVitals from "./reportWebVitals";
import { RecipesPage } from "./pages/RecipesPage";
import { RecipeViewPage } from "./pages/RecipeViewPage";

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={RecipesPage} />
        <Route exact path="/:id" component={RecipeViewPage} />
        <Route render={() => <div>Oops Wrong Page!</div>} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
