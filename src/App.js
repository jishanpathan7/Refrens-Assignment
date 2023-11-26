//* Packages Imports */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//* Components Import */
import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";
import Episodes from "./components/Pages/Episodes";
import Location from "./components/Pages/Location";
import CardDetails from "./components/Cards/CardDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:id" element={<CardDetails />}></Route>
        <Route path="/episodes" element={<Episodes />}></Route>
        <Route path="/episodes/:id" element={<CardDetails />}></Route>
        <Route path="/location" element={<Location />}></Route>

        <Route path="/location/:id" element={<CardDetails />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
