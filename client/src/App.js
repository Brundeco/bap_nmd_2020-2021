import "./App.scss";
import "./components/Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";

import {
  Home,
  Dashboard,
  CreateEvent,
  GetEvent,
  UpdateEvent,
  GetEventList,
  CreateProperty,
  GetPropertyList,
  CreateUser,
  LoginUser,
  Chat,
  Conversation,
  GetProperty,
} from "./pages";
import { ExpiredSession } from "./components";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />

        <Route path="/register" component={CreateUser} />
        <Route path="/login" component={LoginUser} />

        <Route path="/expired" component={ExpiredSession} />

        <Route path="/dashboard" component={Dashboard} />

        <Route path="/events" component={GetEventList} />
        <Route path="/event/:id" component={GetEvent} />
        <Route path="/update-event/:id" component={UpdateEvent} />
        <Route path="/create-event" component={CreateEvent} />

        <Route path="/properties" component={GetPropertyList} />
        <Route path="/create-property" component={CreateProperty} />
        <Route path="/property/:id" component={GetProperty} />

        <Route path="/chat/:author_id/:author" component={Chat} />
        <Route path="/conversation" component={Conversation} />
      </div>
    </Router>
  );
}

export default App;
