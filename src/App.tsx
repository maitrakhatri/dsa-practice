import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import SyntaxChecker from "./components/excercise/SyntaxChecker";
import Home from "./Home";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen py-4 px-8">
      <Helmet>
        <title>maitra learns dsa</title>
        <meta
          name="description"
          content="maitra is learning dsa and building cool stuff"
        />
        <meta name="keywords" content="maitra khatri, maitra, javascript dsa" />
        <meta name="author" content="Maitra Khatri" />
        <meta property="og:title" content="maitra learns dsa" />
        <meta
          property="og:description"
          content="maitra is learning dsa and building cool stuff"
        />
        <meta
          property="og:url"
          content="https://maitra-learns-dsa.netlify.app/"
        />
        <meta name="twitter:title" content="maitra learns dsa" />
        <meta
          name="twitter:description"
          content="maitra is learning dsa and building cool stuff"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/syntaxChecker" element={<SyntaxChecker />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
