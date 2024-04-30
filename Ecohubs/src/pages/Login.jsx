import { useContext, useState } from "react";
import { LoginContext } from "../components/context/LoginContext";
import { Outlet } from "react-router-dom";

export default function App() {
  <Outlet />;
  const [usuario, setUsuario] = useState({
    email: "",
    senha: "",
  });

  const { validaLogin } = useContext(LoginContext);

  async function validacao() {
    await validaLogin(usuario.email, usuario.senha);
  }

  return (
    <div>
      <div>
        <input
          type="email"
          value={usuario.email}
          placeholder="Email"
          onChange={(evento) =>
            setUsuario({ ...usuario, email: evento.target.value })
          }
        />
        <input
          type="password"
          value={usuario.senha}
          placeholder="Senha"
          onChange={(evento) =>
            setUsuario({ ...usuario, senha: evento.target.value })
          }
        />
      </div>
      <button onClick={() => validacao()}></button>
    </div>
  );
}
