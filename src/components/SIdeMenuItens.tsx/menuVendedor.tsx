import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../../App.css';
import App from '../../App';
import { Outlet, Link } from "react-router-dom";

const MenuVendedor = () => {
  const [expandido, setExpandido] = useState(false); // -> estado de expansão do meno
  const navigate = useNavigate();

  const toggleMenu = () => {
    setExpandido(!expandido);
  };

  const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/login');
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
             <Link to="/busca">
                <i className={`fa ${expandido ? 'fa-magnifying-glass' : 'fa-magnifying-glass'}`}></i>
                {expandido && <span>Busca Avançada</span>}
            </Link>
         </li>
         <li>
             <Link to="/comparativo">
                <i className={`fa ${expandido ? 'fa-square-poll-vertical' : 'fa-square-poll-vertical'}`}></i>
                {expandido && <span>Comparativo</span>}
            </Link>
         </li>
           <li onClick={handleLogout} style={{ cursor: 'pointer', color: '#dc3545' }}>
            <i className={`fa ${expandido ? 'fa-right-from-bracket' : 'fa-sign-out-alt'}`}></i>
            {expandido && <span>Logout</span>}
          </li>
        </ul>
      </div>
    </div>
    <Outlet/>
    </>
  );
};

export default MenuVendedor;
