import { useContext, useState } from "react";
import { UtilitsContext } from "../components/context/UtilitsContext";

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
