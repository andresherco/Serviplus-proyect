import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <li className="nav-item">
          <Link to={"/Home"} className="nav-link">
            <i className="nav-icon fas fa-th" />
            <p>
              Inicio
            </p>
          </Link>
        </li>
       
        <li className="nav-item">
          <Link to={"/Tikets"} className="nav-link">
            <i className="nav-icon fas  fa-paper-plane" />
            <p>
              Tikets
            </p>
          </Link>
        </li>

        <li className="nav-item">
          <Link to={"/Respuestas"} className="nav-link">
            <i className="nav-icon fas fa-share" />     
            <p>
              Respuestas
            </p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
