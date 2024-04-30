import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UtilitsContext } from "../components/context/UtilitsContext";

function cadastro() {
  const { register, setValue, getValues, handleSubmit } = useForm();

  const enderecoCompleto = async () => {
    let CEP = getValues("cep");

    if (!!CEP && CEP.length == 8) {
      await fetch(`https://viacep.com.br/ws/${CEP}/json/`)
        .then((resp) => resp.json())
        .then((dados) => {
          setValue("neighborhood", dados.bairro);
          setValue("city", dados.localidade);
          setValue("state", dados.uf);
        })
        .catch((error) => console.log(error));
    }
  };

  const { cadastraUsuario } = useContext(UtilitsContext);
  const onSubmit = async (dadosForm) => {
    await cadastraUsuario(dadosForm);
  };

  return (
    <>
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
        <input type="submit" value="Cadastrar" />
      </form>
    </>
  );
}

export default cadastro;
