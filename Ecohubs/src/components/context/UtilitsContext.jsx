import { createContext, useState } from "react";

export const UtilitsContext = createContext();

export const UtilitsContextProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);


  // function PostCadastro(dados){
  //   fetch("http://localhost:3000/usuarios")
  //   .then(resp => resp.json())
  //   .then(dados => )
  // }

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
    <UtilitsContext.Provider value={{ usuarios, setUsuarios, validaLogin}}>
      {children}
    </UtilitsContext.Provider>
  );
};
