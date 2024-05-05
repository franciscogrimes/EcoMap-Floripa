import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UtilitsContext } from "../components/context/UtilitsContext";
import style from "./styles/Cadastro.module.css";

function Cadastro() {
  const { register, setValue, getValues, handleSubmit } = useForm();

  const enderecoCompleto = async () => {
    let CEP = getValues("cep");

    if (!!CEP && CEP.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${CEP}/json/`);
        const dados = await response.json();
        setValue("neighborhood", dados.bairro);
        setValue("city", dados.localidade);
        setValue("state", dados.uf);
      } catch (error) {
        console.error("Erro ao obter dados do CEP:", error);
      }
    }
  };

  const { cadastrarUsuario } = useContext(UtilitsContext);

  function onSubmit(dadosCadastrais) {
    console.log("Usuário Cadastrado com sucesso", dadosCadastrais);
    cadastrarUsuario(dadosCadastrais);
  }

  return (
    <div className={style.container}>
      <form>
        <h2>Dados pessoais:</h2>
        <div className={style.dadosPessoais}>
          <div className={style.dpCol1}>
            <label htmlFor="name">Nome Completo: </label>
            <input
              type="text"
              name="name"
              {...register("name", {
                required: true,
                maxLength: 50,
                minLength: 10,
              })}
            />

            <label htmlFor="gender">Gênero:</label>
            <select name="gender" {...register("gender")}>
              <option>Selecione uma opção</option>
              <option value="female">Feminino</option>
              <option value="male">Masculino</option>
              <option value="other">Outro</option>
            </select>
            <label htmlFor="cpf">CPF:</label>
            <input
              type="number"
              name="cpf"
              {...register("cpf", {
                maxLength: 11,
                minLength: 11,
              })}
            />
          </div>
          <div className={style.dpCol2}>
            <label htmlFor="birth">Data de nascimento:</label>
            <input type="date" name="birth" />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              {...register("email", {
                required: true,
              })}
            />
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              name="password"
              {...register("password", {})}
            />
          </div>
        </div>
        <h2>Endereço:</h2>
        <div className={style.endereco}>
          <div className={style.endCol1}>
            <label htmlFor="cep">CEP:</label>
            <input
              type="text"
              name="cep"
              {...register("cep", {
                required: true,
                maxLength: 8,
                minLength: 8,
                onBlur: () => enderecoCompleto(),
              })}
            />
            <label htmlFor="neighborhood">Bairro:</label>
            <input
              type="text"
              name="neighborhood"
              {...register("neighborhood")}
            />
          </div>
          <div className={style.endCol2}>
            <label htmlFor="city">Cidade:</label>
            <input type="text" name="city" {...register("city")} />

            <label htmlFor="state">Estado:</label>
            <input type="text" name="state" {...register("state")} />
          </div>
        </div>
        <button onClick={handleSubmit(onSubmit)}>Cadastrar Usuário</button>
      </form>
    </div>
  );
}

export default Cadastro;
