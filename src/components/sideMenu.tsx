import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';
import App from '../App.tsx'
import MenuAdmin from './SIdeMenuItens.tsx/menuAdmim.tsx';
import MenuVendedor from './SIdeMenuItens.tsx/menuVendedor.tsx';
import { Outlet, Link } from "react-router-dom";
import MenuLaboratorio from './SIdeMenuItens.tsx/menuLaboratorio.tsx';

const MenuLateral = () => {
  const [expandido, setExpandido] = useState(false); // -> estado de expansão do meno
  const navigate = useNavigate();

  const toggleMenu = () => {
    setExpandido(!expandido);
  };

  const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/login');
  };

  const usuario = JSON.parse(localStorage.getItem('usuario'));
   
   if (usuario.perfil == "Vendedor"){
    return (
      <MenuVendedor/>
    );
   }
   if (usuario.perfil == "Laboratório"){
    return (
      <MenuLaboratorio/>
    )
   }
   if (usuario.perfil == "ADMIN"){
    return (
      <MenuAdmin/>
    )
   }
};

export default MenuLateral;
