import React from 'react';
import './App.css';
import Home from './views/home.tsx'
import Formulas from './views/formulas.tsx';
import BuscaPropriedades from './views/buscaAvancada.tsx';
//import MenuNav from './components/navBar.tsx';
import ReactDOM from "react-dom/client";
import MenuLateral from './components/sideMenu.tsx';
import { HashRouter as Router, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <div className="layout">
      <Router> {/* Usa HashRouter e define o basename */}
        {/* <MenuNav /> */}
        <MenuLateral />
        <header>
          <h1>Aplicativo AMINO</h1>
        </header>
        <main>
          <Routes>
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='formulas' element={<Formulas />} />
            <Route path='busca' element={<BuscaPropriedades />} />
          </Routes>
        </main>
      </Router>
      <footer>
        <p>
          Desenvolvido por Lucas Laranjeira - © 2025 Todos os Direitos Reservados -
          <a href='https://www.amino.com.br/'> Amino</a>
        </p>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
