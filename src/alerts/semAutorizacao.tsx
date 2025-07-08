import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import ReactDOM from "react-dom/client";
import App from '../App.tsx'
import { table } from "console";
import moment from "moment";
import "./alerts.css"
import api from "../service/api.ts";
import { Alert } from "react-bootstrap";
import Conteudo from "./conteudo.tsx";


const AcessoNegado = () => {
  const navigate = useNavigate();

  return (
    <div className="acesso-negado-container">
      <h1>🚫 Acesso Negado</h1>
      <p>Você não tem permissão para acessar esta página.</p>
      <button onClick={() => navigate('/home')} className="btn-voltar">
        Voltar para a Home
      </button>
    </div>
  );
};

export default AcessoNegado;