import "./App.scss";
import "./components/Nav";
import "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, CreateEvent } from "./pages";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route path="/postevent" component={CreateEvent} />
      </div>
    </Router>
  );
}

export default App;
