import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UtilitsContext } from "../components/context/UtilitsContext";

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
  const onSubmit = async (formData) => {
    try {
      await cadastrarUsuario(formData);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2>Dados pessoais:</h2>

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

          <div>
            <label htmlFor="gender">Gênero:</label>
            <select name="gender" {...register("gender")}>
              <option>Selecione uma opção</option>
              <option value="female">Feminino</option>
              <option value="male">Masculino</option>
              <option value="other">Outro</option>
            </select>
          </div>
          <label htmlFor="cpf">CPF:</label>
          <input
            type="number"
            name="cpf"
            {...register("cpf", {
              maxLength: 11,
              minLength: 11,
            })}
          />
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
        <div>
          <h2>Endereço:</h2>

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

          <label htmlFor="city">Cidade:</label>
          <input type="text" name="city" {...register("city")} />

          <label htmlFor="state">Estado:</label>
          <input type="text" name="state" {...register("state")} />
        </div>
        <input onClick={handleSubmit(onSubmit)} value="Cadastrar" />
      </form>
    </div>
  );
}

export default Cadastro;
