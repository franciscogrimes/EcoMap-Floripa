import Navbar from "../components/Navbar/Navbar";
function criaPontos() {
  const { register, handleSubmit } = useForm();

  return (
    <div>
      <Navbar />
      <div>
        <h1>Cadastro de Pontos de coleta</h1>
      </div>
      <div>
        <form>
        <label htmlFor="localName">Nome do local: </label>
          <input
            type="text"
            name="localName"
            {...register("localName", {
              required: true,
              maxLength: 50,
              minLength: 9,
            })}
          />
        <label htmlFor="description">Descrição: </label>
          <input
            type="text"
            name="description"
            {...register("description", {
              required: true,
              maxLength: 200,
              minLength: 15,
            })}
          />
        <label htmlFor="id">Identificador do usuário: </label>
          <input
            type="number"
            name="id"
            {...register("id", {
              required: true,
              maxLength: 2,
              minLength: 1,
            })}
          />

          <div>
            <label htmlFor="residos">Residuos:</label>
            <select name="residos" {...register("residos")}>
              <option>Selecione uma opção</option>
              <option value="female">Vidro</option>
              <option value="male">Papel</option>
              <option value="other">Plastico</option>
              <option value="other">Metal</option>
              <option value="other">Bateria</option>
              <option value="other">Orgânico</option>
              <option value="other">Qualquer residuo</option>
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
        </form>
      </div>
    </div>
  );
}

export default criaPontos;
