import "./App.scss";
import "./components/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Home,
  Dashboard,
  CreateEvent,
  GetEvent,
  UpdateEvent,
  GetEventList,
  CreateProperty,
  GetProperty,
} from "./pages";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />

        <Route exact path="/dashboard" component={Dashboard} />

        <Route path="/events" component={GetEventList} />
        <Route path="/event/:id" component={GetEvent} />
        <Route path="/update-event/:id" component={UpdateEvent} />
        <Route path="/create-event" component={CreateEvent} />

        <Route path="/property" component={GetProperty} />
        <Route path="/create-property" component={CreateProperty} />
      </div>
    </Router>
  );
}

export default App;
