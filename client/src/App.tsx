//@ts-ignore
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/landing";
import "./App.css";
import TestHome from "./pages/TestHome";
import Login from "./pages/Login";
import Resister from "./pages/Resister";

const App = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Landing} />
        <Route exact path="/test" component={TestHome}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Resister}/>
      </Switch>
    </Router>
  );
};

export default App;
