// components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
  allowedProfiles?: string[]; // ← Controla o acesso as rotas
}

const PrivateRoute = ({ children, allowedProfiles }: PrivateRouteProps) => {
  const token = localStorage.getItem('token'); //← Armazena o TOKEN de usuario
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}'); // ← Armazena os Dados de Usuario

  {/*Verificação do TOKEN */}
  if (!token) {
    return <Navigate to="/login" />; //← Se não for validado retorna para o login
  }

  {/*Verificação da liberação as rotas */}
  if (allowedProfiles && !allowedProfiles.includes(usuario.perfil)) { 
    return <Navigate to="/acesso-negado" />; //← Retorna para não autorizado
  }

  return children;
};

export default PrivateRoute;
