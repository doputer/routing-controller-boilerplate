//@ts-ignore
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/landing";
import "./App.css";

const App = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Landing} />
      </Switch>
    </Router>
  );
};

export default App;
