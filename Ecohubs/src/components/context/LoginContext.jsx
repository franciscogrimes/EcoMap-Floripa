import { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);

  async function validaLogin(email, senha) {
    try {
      const response = await fetch("http://localhost:3000/usuarios");
      const dados = await response.json();

      let insertEmail = false;

      dados.map((usuario) => {
        if (usuario.email == email) {
          console.log(email);
          insertEmail = true;
          if (usuario.senha == senha) {
            localStorage.setItem("isAutenticado", true);
            console.log(senha);
            window.location.href = "/";
          } else {
            alert("Senha Incorreta!");
            return;
          }
        }
      });
      if (!insertEmail) {
        alert("Email não cadastrado!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <LoginContext.Provider value={{ usuarios, setUsuarios, validaLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
