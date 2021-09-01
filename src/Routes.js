import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Events from "./pages/Events";
import Home from "./pages/Home";
import SingleEvent from "./pages/SingleEvent";
import NewEvent from "./pages/NewEvent";
import Dashboard from "./pages/Dashboard";
import { useUserContext } from "./contexts/UserProvider";

const Routes = () => {
  const { state } = useUserContext();

  return (
    <Switch>
      <Route exact path="/login">
        {!state.user ? <Login /> : <Redirect to="/dashboard" />}
      </Route>
      <Route exact path="/signup">
        <SignUp />
      </Route>
      <Route exact path="/events/:category">
        <Events />
      </Route>
      <Route exact path="/events">
        <Events />
      </Route>
      <Route exact path="/newEvent">
        <NewEvent />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/event/:eventId">
        <SingleEvent />
      </Route>
      {state?.user ? (
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
      ) : (
        <Redirect to="/login" />
      )}
    </Switch>
  );
};

export default Routes;
