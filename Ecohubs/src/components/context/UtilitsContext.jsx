import { createContext, useState } from "react";

export const UtilitsContext = createContext();

export const UtilitsContextProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [dadosCadastro, setDadosCadastro] = useState([]);
  

  async function cadastrarUsuario(dadosCadastrais) {
    try {
      const usuarioExistente = dados.find((usuario) => {
        return usuario.email === dadosCadastrais.email;
      });

      if (usuarioExistente) {
        throw new Error("O usuário já está cadastrado na plataforma");
      } else {
        const response = await fetch("http://localhost:3000/usuarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dadosCadastrais),
        });
        const dados = await response.json();
        return dados;
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      throw error; // Lança o erro para ser tratado externamente, se necessário
    }
  }

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


  // function usuariosCadastrados(){
  //   fetch("http://localhost:3000/usuarios")
  //   .then((resp) => resp.json())
  //   .then((data) => {
  //     const numeroDeUsuarios = data.length;
  //     setNumeroDeUsuarios("Número de usuários cadastrados:", numeroDeUsuarios);
  //   })
  //   .catch((err) => console.log(err))
  // }
  return (
    <UtilitsContext.Provider
      value={{
        usuarios,
        setUsuarios,
        validaLogin,
        dadosCadastro,
        setDadosCadastro,
        cadastrarUsuario,

      }}
    >
      {children}
    </UtilitsContext.Provider>
  );
};
