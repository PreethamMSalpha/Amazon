import "./App.css";
import Banner from "./components/Banner/Banner.component";
import Header from "./components/Header/Header.component";

function App() {
  return (
    <div>
      <Header />
      <div className="max-w-screen-2xl mx-auto">
        <Banner />
      </div>
    </div>
  );
}

export default App;
