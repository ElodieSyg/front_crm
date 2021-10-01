import { BrowserRouter, Switch, Route } from "react-router-dom";
// Import components
import Register from "./view/register";
import Login from "./view/login";
import Admin from "./view/admin";
// Import contexts
import LogContext from "./context/logContext";

const App = () => {
  return (
    <BrowserRouter>
      <LogContext>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/admin" component={Admin} />
        </Switch>
      </LogContext>
    </BrowserRouter>
  );
};

export default App;