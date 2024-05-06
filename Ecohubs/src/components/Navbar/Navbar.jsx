import "boxicons";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={style.navbar}>
      <div className={style.icon}>
        <Link to="/" relative="path">
          <box-icon name="recycle" color="#fefae0" size="lg"></box-icon>
        </Link>
      </div>
      <div className={style.menus}>
        <Link to="/list-points" relative="path">
          Pontos de coleta
        </Link>
        <Link to="/create-points" relative="path">
          Adicionar ponto
        </Link>
        <button onClick={() => localStorage.removeItem("isAutenticado")}>
          Sair
        </button>
      </div>
    </div>
  );
}

export default Navbar;
