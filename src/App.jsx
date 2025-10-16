import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import Footer from "./components/layout/Footer";
import Catalogo from "./pages/Catalogo";
import Carrito from "./pages/Carrito";
import './App.css';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <main>
              <section id="catalogo">
                <Catalogo />
              </section>
            </main>
          </>
        } />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
