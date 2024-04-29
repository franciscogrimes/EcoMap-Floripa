import { useForm } from "react-hook-form";
import Input from "../components/form/form-input";
import Select from "../components/form/form-select";
import style from "./styles/Cadastro.module.css"

function cadastro() {
  const { register } = useForm();
  return (
    <div>
      <h1>Cadastro</h1>
      <form>
        <div>
          <h2>Dados pessoais:</h2>

          <Input
            type="text"
            name="name"
            text="Nome Completo:"
            {...register("name", {
              required: true,
              maxLength: 50,
              minLength: 10,
            })}
          />

          <Select
            name="gender"
            text="Selecione seu gênero:"
            {...register("gender")}
          />
          <Input
            type="number"
            name="cpf"
            text="CPF:"
            {...register("cpf", {
              maxLength: 11,
              minLength: 11,
            })}
          />
          <Input type="date" name="birth" text="Data de nascimento:" />
          <Input
            type="email"
            name="email"
            text="Email:"
            {...register("email", {
              required: true,
            })}
          />
          <Input
            type="password"
            name="password"
            text="Senha:"
            {...register("password", {})}
          />
        </div>
        <div>
          <h2>Endereço:</h2>

          <Input
            type="number"
            name="cep"
            text="CEP:"
            {...register("cep", {
              required: true,
              maxLength: 8,
              minLength: 8,
            })}
          />
          <Input type="text" name="neighborhood" text="Bairro:" />
          <Input type="text" name="city" text="Cidade:" />
          <Input type="text" name="state" text="Estado:" />
        </div> 
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default cadastro;
