import "./App.css";
import { Switch, Route } from "react-router-dom";
import Banner from "./components/Banner/Banner.component";
import Header from "./components/Header/Header.component";
import Footer from "./components/Footer/Footer.component";
import SignIn from "./components/SignIn/SignIn.component";
import Homepage from "./pages/homepage.component";
import SignUp from "./components/SignUp/SignUp.component";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route path="/" component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
