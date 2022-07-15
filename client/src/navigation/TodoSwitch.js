import { Switch, Route, Redirect } from "react-router-dom";
import ClientRoute from "./Route";
import TodoAppConnector from "../components/todoApp/TodoApp-connector";
import Statistics from "../components/statistics/Statistics";
import AboutUs from "../components/aboutUs/AboutUs";
const TodoSwitch = () => {
  return (
    <Switch>
      <Route
        exact={true}
        path={"/main"}
        component={(props) => <TodoAppConnector {...props} />}
      ></Route>
      <Route
        exact={true}
        path={ClientRoute.Todo.aboutUs}
        component={(props) => <AboutUs {...props} />}
      ></Route>
      <Route
        exact={true}
        path={ClientRoute.Todo.statistics}
        component={(props) => <Statistics {...props} />}
      ></Route>

      <Redirect from="/" to={ClientRoute.Todo.main} />
    </Switch>
  );
};

export default TodoSwitch;
