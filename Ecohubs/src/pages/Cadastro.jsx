import { useForm } from "react-hook-form";

function cadastro() {
  const { register } = useForm();
  return (
    <>
      <form>
        <h2>Dados pessoais:</h2>
        <label htmlFor="name">Nome completo:</label>
        <input
          type="text"
          name="name"
          {...register("name", {
            required: true,
            maxLength: 50,
            minLength: 10,
          })}
        />
        <label htmlFor="gender">Sexo:</label>
        <select name="gender" {...register("gender")}>
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
        <label htmlFor="birth">Data de nascimento</label>
        <input type="date" />
        <label htmlFor="mail">E-mail:</label>
        <input
          type="email"
          {...register("mail", {
            required: true,
          })}
        />
        <label htmlFor="password">Senha:</label>
        <input type="password" {...register("password", {})} />

        <h2>Endereço:</h2>

        <label htmlFor="cep">CEP:</label>
        <input
          type="number"
          name="cep"
          {...register("cep", {
            required: true,
            maxLength: 8,
            minLength: 8,
          })}
        />
        <label htmlFor="neighborhood">Bairro:</label>
        <input type="text" />
        <label htmlFor="city">Cidade:</label>
        <input type="text" />
        <label htmlFor="state">Estado:</label>
        <input type="text" />

        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
}

export default cadastro;
