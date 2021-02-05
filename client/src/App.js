import "./App.scss";
import "./components/Nav";
import "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />
      </div>
    </Router>
  );
}

export default App;
