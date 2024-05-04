import { createContext, useState } from "react";

export const UtilitsContext = createContext();

export const UtilitsContextProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [dadosCadastro, setDadosCadastro] = useState([]);
  const [dadosPonto, setDadosPonto] = useState([]);

  function getUsuarios() {
    fetch("http://localhost:3000/usuarios")
      .then((resp) => resp.json())
      .then((data) => setUsuarios(data)) // Atualiza o estado 'usuarios'
      .catch((err) => console.error(err));
  }

  // function cadastrarUsuario(dadosCadastrais) {
  //   // Verificar se o usuário já está cadastrado
  //   getUsuarios(dadosCadastrais){
  //     const usuarioExistente = usuarios.find(
  //       (usuario) => usuario.email === dadosCadastrais.email
  //     );
  //     if (usuarioExistente) {
  //       alert("Usuário já possui cadastro na plataforma!");
  //     } else {
  //       fetch("http://localhost:3000/usuarios", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(dadosCadastrais),
  //       })
  //         .then(() => {
  //           alert("Usuário cadastrado com sucesso!");
  //           window.location.href = "/login";
  //         })
  //         .catch(() => alert("Erro ao efetuar cadastro do usuário"));
  //     }
  //   };
  // }

  async function validaLogin(email, senha) {
    try {
      const response = await fetch("http://localhost:3000/usuarios");
      const dados = await response.json();

      let insertEmail = false;

      dados.map((usuario) => {
        if (usuario.email === email) {
          console.log(email);
          insertEmail = true;
          if (usuario.senha === senha) {
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

  function cadastrarPonto(dadosPonto) {
    fetch("http://localhost:3000/pontosColeta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosPonto),
    })
      .then(() => alert("Ponto de coleta cadastrado"))
      .catch(() => alert("Erro ao realizar cadastro do ponto"));
  }

  return (
    <UtilitsContext.Provider
      value={{
        usuarios,
        setUsuarios,
        validaLogin,
        dadosCadastro,
        dadosPonto,
        setDadosPonto,
        setDadosCadastro,
        cadastrarPonto,
        getUsuarios,
      }}
    >
      {children}
    </UtilitsContext.Provider>
  );
};
