import { Switch, Route, Redirect } from "react-router-dom";
import ClientRoute from "./Route";
import TodoApp from "../components/TodoApp/TodoApp";
import TodoAppConnector from "../components/TodoApp/TodoApp-connector";

const TodoSwitch = () => {
  return (
    <Switch>
      <Route
        exact={true}
        path={ClientRoute.Todo.home}
        component={(props) => <TodoAppConnector {...props} />}
      ></Route>
      <Route
        exact={true}
        path={ClientRoute.Todo.aboutUs}
        component={(props) => <TodoAppConnector {...props} />}
      ></Route>
      <Redirect from="/" to={ClientRoute.Todo.main} />
    </Switch>
  );
};

export default TodoSwitch;
