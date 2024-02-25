import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import SyntaxChecker from "./components/excercise/SyntaxChecker";
import Home from "./Home";

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen py-4 px-8">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/syntaxChecker" element={<SyntaxChecker />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
