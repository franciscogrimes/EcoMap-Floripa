import { createContext } from "react";

export const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  getUsers(() => {
    fetch("http://localhost:3000/usuarios")
      .then((response) => response.json())
      .then((dados) => setUsuarios(dados).catch((erro) => console.log(erro)));
  });

  return (
    <LoginContext.Provider value={{ usuarios, setUsuarios }}>
      {children}
    </LoginContext.Provider>
  );
};
