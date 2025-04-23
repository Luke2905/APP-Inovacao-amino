import React, { useState } from 'react';
import '../App.css';
import App from '../App.tsx'
import { Outlet, Link } from "react-router-dom";

const MenuLateral = () => {
  const [expandido, setExpandido] = useState(false); // -> estado de expansão do meno

  const toggleMenu = () => {
    setExpandido(!expandido);
  };

  return (
    <>
    <div className={`menu-lateral ${expandido ? 'expandido' : ''}`}>
    <button className={`toggle-btn fa ${expandido ? 'fa-minus' : 'fa-bars'}`} onClick={toggleMenu}>
    </button>
      <h4>AMINO</h4>
      <div className="itens-menu">
        <ul>
        <li>
             <Link to="/home">
                <i className={`fa ${expandido ? 'fa-home' : 'fa-home'}`}></i>
                {expandido && <span>Home</span>}
            </Link>
         </li>
         <li>
             <Link to="/aplicacao">
                <i className={`fa ${expandido ? 'fa-wand-magic-sparkles' : 'fa-wand-magic-sparkles'}`}></i>
                {expandido && <span>Aplicações</span>}
            </Link>
         </li>
         <li>
             <Link to="/formulas">
                <i className={`fa ${expandido ? 'fa-flask' : 'fa-flask'}`}></i>
                {expandido && <span>Formulas</span>}
            </Link>
         </li>
         <li>
             <Link to="/busca">
                <i className={`fa ${expandido ? 'fa-magnifying-glass' : 'fa-magnifying-glass'}`}></i>
                {expandido && <span>Busca Avançada</span>}
            </Link>
         </li>

        </ul>
      </div>
    </div>
    <Outlet/>
    </>
  );
};

export default MenuLateral;
