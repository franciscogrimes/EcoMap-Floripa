import Navbar from "../components/Navbar/Navbar";
function criaPontos() {
  const { register, handleSubmit } = useForm();

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
        </form>
      </div>
    </div>
  );
}

export default criaPontos;
