import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Debtor from "./Components/Debtor/Debtor";
import Header from "./Components/Header/Header";

function App() {
  return (
    <>
      <div className="">
        <Header />
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route exact path="/debtor/:id" element={<Debtor />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
