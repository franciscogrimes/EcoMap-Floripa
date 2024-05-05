import { useContext, useState } from "react";
import { UtilitsContext } from "../components/context/UtilitsContext";
import style from "./styles/Login.module.css";
import { Link } from "react-router-dom";

export default function App() {
  const [usuario, setUsuario] = useState({
    email: "",
    senha: "",
  });

  const { validaLogin } = useContext(UtilitsContext);

  async function validacao() {
    await validaLogin(usuario.email, usuario.senha);
  }

  return (
    <div className={style.container}>
      <div className={style.containerLogin}>
        <div className={style.title}>
          <h1>Login</h1>
        </div>
        <div className={style.input}>
          <label htmlFor="email">Email:</label>
          <input
            className={style.inputEmail}
            type="email"
            value={usuario.email}
            onChange={(evento) =>
              setUsuario({ ...usuario, email: evento.target.value })
            }
          />
          <label htmlFor="password">Senha:</label>
          <input
            className={style.inputPass}
            type="password"
            value={usuario.senha}
            onChange={(evento) =>
              setUsuario({ ...usuario, senha: evento.target.value })
            }
          />
        </div>
        <button onClick={() => validacao()}>Login</button>
        <div className={style.signUp}>
          <Link to="/sign-up" relative="path">
            Ainda não possui cadastro?
          </Link>
        </div>
      </div>
    </div>
  );
}
