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
  Messages,
  GetProperty,
  NoLocation,
  GetPropertyListAdmin,
  UpdateProperty,
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
        <Route path="/no-location" component={NoLocation} />

        <Route path="/dashboard" component={Dashboard} />
        <Route path="/events" component={GetEventList} />
        <Route path="/event/:id" component={GetEvent} />
        <Route path="/update-event/:id" component={UpdateEvent} />
        <Route path="/create-event" component={CreateEvent} />

        <Route path="/properties" component={GetPropertyList} />
        <Route path="/create-property" component={CreateProperty} />
        <Route path="/update-property/:id" component={UpdateProperty} />
        <Route path="/property/:id/:author_id" component={GetProperty} />
        <Route path="/properties-admin" component={GetPropertyListAdmin} />

        <Route path="/chat/:recepient_id/:recepient/:conversation_id" component={Chat} />
        <Route path="/messages/:user" component={Messages} />
      </div>
    </Router>
  );
}

export default App;
