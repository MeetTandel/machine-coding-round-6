import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home/Home";
import { RestaurantItem } from "./pages/RestaurantItem/RestaurantItem";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<RestaurantItem />} />
      </Routes>
    </div>
  );
}

export default App;
