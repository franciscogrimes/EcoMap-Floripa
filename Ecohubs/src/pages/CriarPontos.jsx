import Navbar from "../components/Navbar/Navbar";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UtilitsContext } from "../components/context/UtilitsContext";

function criaPontos() {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const form = useForm();

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
  function coordenadas() {
    let CEP = getValues("cep");
    const apiKey = "e35cd8562d6244afb998eeb2587acac9";

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${CEP}&key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry;
          console.log(`Latitude: ${lat}, Longitude: ${lng}`);
          setValue("latitude", lat);
          setValue("longitude", lng);
        } else {
          console.error("Nenhum resultado encontrado para o CEP fornecido.");
        }
      })
      .catch((error) => {
        console.error("Erro ao obter dados de geolocalização:", error);
      });
  }

  const { cadastrarPonto } = useContext(UtilitsContext);

  const onSubmit = (dadosPonto) => {
    console.log("Ponto de coleta cadastrado", dadosPonto);
    cadastrarPonto(dadosPonto);
  };

  return (
    <div>
      <Navbar />
      <div>
        <h1>Cadastro de Pontos de coleta</h1>
      </div>
      <div>
        <form>
          <label htmlFor="nomeLocal">Nome do local: </label>
          <input
            type="text"
            name="nomeLocal"
            {...register("nomeLocal", {
              required: true,
              maxLength: 50,
              minLength: 9,
            })}
          />
          <label htmlFor="descricao">Descrição: </label>
          <input
            type="text"
            name="descricao"
            {...register("descricao", {
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
            <label htmlFor="residuos">Residuos:</label>
            <select name="residuos" {...register("residuos")}>
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
              onBlur: () => {
                coordenadas(), enderecoCompleto();
              },
            })}
          />
          <label htmlFor="latitude">Latitude:</label>
          <input type="text" name="latitude" {...register("latitude")} />
          <label htmlFor="longitude">Longitude:</label>
          <input type="text" name="longitude" {...register("longitude")} />

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
        <button onClick={handleSubmit(onSubmit)}>Cadastrar Ponto</button>
      </div>
    </div>
  );
}

export default criaPontos;
