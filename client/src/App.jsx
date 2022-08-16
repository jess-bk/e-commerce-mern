import Annoucement from "./components/Annoucement";
import Categories from "./components/Categories";
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Annoucement />
      <Navbar />
      <Slider />
      <Categories />
      <Home />
    </>
  );
};

export default App;
