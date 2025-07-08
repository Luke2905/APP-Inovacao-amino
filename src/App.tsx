import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './views/home.tsx';
import Formulas from './views/formulas/formulas.tsx';
import FormulasIA from './views/formulas/formulasIA.tsx';
import BuscaPropriedades from './views/buscaAvancada.tsx';
import Comparativo from './views/comparativo/comparativo.tsx';
import Aplicacao from './views/aplicacoes/aplicacao.tsx';
import AcessoNegado from './alerts/semAutorizacao.tsx';
import ReactDOM from "react-dom/client";
import MenuLateral from './components/sideMenu.tsx';
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './views/login.tsx';
import PrivateRoute from './components/privateRouter.tsx'; //← Controla as rotas

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); // ← Armazena o Token do Usuario

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);     //← Só exibe o menu lateral caso o usuario esteja autenticado
  }, []);

  return (
    <div className="layout">
      <Router>
        {/* Apenas mostra o menu lateral se estiver autenticado */}
        {isAuthenticated && <MenuLateral />}
        <header>
          <h1>Inovação AMINO</h1>
        </header>
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Rotas protegidas */}
            <Route path="/home" element={
              <PrivateRoute><Home /></PrivateRoute>
            } />
            <Route path="/formulas" element={
              <PrivateRoute allowedProfiles={['ADMIN', 'Laboratório']}><Formulas /></PrivateRoute>
            } />
            <Route path="/formulaia" element={
              <PrivateRoute allowedProfiles={['ADMIN']}><FormulasIA /></PrivateRoute>
            } />
            <Route path="/busca" element={
              <PrivateRoute allowedProfiles={['ADMIN', 'Laboratório', 'Vendedor']}><BuscaPropriedades /></PrivateRoute>
            } />
            <Route path="/comparativo" element={
              <PrivateRoute allowedProfiles={['ADMIN', 'Laboratório', 'Vendedor']}><Comparativo /></PrivateRoute>
            } />
            <Route path="/aplicacao" element={
              <PrivateRoute allowedProfiles={['ADMIN', 'Laboratório']}><Aplicacao /></PrivateRoute>
            } />
            <Route path="/acesso-negado" element={<AcessoNegado />} />
          </Routes>
        </main>
      </Router>
      <footer>
        <p>
          Desenvolvido por TI AMINO - © 2025 Todos os Direitos Reservados -
          <a href='https://www.amino.com.br/'> Amino</a>
        </p>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
