import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UtilitsContext } from "../components/context/UtilitsContext";
import style from "./styles/Cadastro.module.css";
import { Link } from "react-router-dom";


function Cadastro() {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      <form className={style.form}>
        <h2>Dados pessoais:</h2>
        <div className={style.dadosPessoais}>
          <div className={style.dpCol1}>
            <label htmlFor="name">Nome Completo: </label>
            <input
              type="text"
              name="name"
              {...register("name", {
                required: "Campo obrigatório",
                maxLength: { value: 50, message: "Máximo de 50 caracteres" },
                minLength: { value: 10, message: "Mínimo de 10 caracteres" },
              })}
            />
            {errors.name && (
              <p className={style.error}>{errors.name.message}</p>
            )}

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
                maxLength: { value: 11, message: "CPF inválido" },
                minLength: { value: 11, message: "CPF inválido" },
              })}
            />
            {errors.cpf && <p className={style.error}>{errors.cpf.message}</p>}
          </div>
          <div className={style.dpCol2}>
            <label htmlFor="birth">Data de nascimento:</label>
            <input type="date" name="birth" />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              {...register("email", {
                required: "Campo obrigatório",
              })}
            />
            {errors.email && (
              <p className={style.error}>{errors.email.message}</p>
            )}

            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              name="senha"
              {...register("senha", {
                required: "Campo obrigatório",
              })}
            />
            {errors.senha && (
              <p className={style.error}>{errors.senha.message}</p>
            )}
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
                required: "Campo obrigatório",
                maxLength: { value: 8, message: "CEP inválido" },
                minLength: { value: 8, message: "CEP inválido" },
                onBlur: () => enderecoCompleto(),
              })}
            />
            {errors.cep && <p className={style.error}>{errors.cep.message}</p>}

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
        <div className={style.btn}>
        <button>
          <Link to='/login' path='relative'>Voltar</Link>
        </button>
        <button onClick={handleSubmit(onSubmit)}>Cadastrar Usuário</button>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;
