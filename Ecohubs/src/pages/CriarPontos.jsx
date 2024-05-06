import Navbar from "../components/Navbar/Navbar";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UtilitsContext } from "../components/context/UtilitsContext";
import style from "./styles/CriarPontos.module.css";

function criaPontos() {
  const { register, handleSubmit, setValue, getValues } = useForm();

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
    <div className={style.container}>
      <Navbar />
      <div>
        <form className={style.form}>
          <div className={style.title}>
            <h1>Cadastro de Pontos de coleta</h1>
          </div>

          <div className={style.idUsuario}>
            <div className={style.local}>
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
            </div>
            <div className={style.id}>
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
            </div>
          </div>
          <div className={style.descricao}>
            <label htmlFor="descricao">Descrição: </label>
            <input
              className={style.descricaoInput}
              type="text"
              name="descricao"
              {...register("descricao", {
                required: true,
                maxLength: 200,
                minLength: 15,
              })}
            />
          </div>
          <div className={style.tipoLocal}>
            <div className={style.residuos}>
              <label htmlFor="residuos">Tipo de residuos:</label>
              <select name="residuos" {...register("residuos")}>
                <option>Selecione uma opção</option>
                <option value="vidro">Vidro</option>
                <option value="papel">Papel</option>
                <option value="plastico">Plastico</option>
                <option value="metal">Metal</option>
                <option value="bateria">Bateria</option>
                <option value="organico">Orgânico</option>
                <option value="entulhos">Entulho</option>
                <option value="Todos">Qualquer residuo</option>
              </select>
            </div>
            <div className={style.cep}>
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
            </div>
          </div>
          <div className={style.latLong}>
            <div className={style.latitude}>
              <label htmlFor="latitude">Latitude:</label>
              <input type="text" name="latitude" {...register("latitude")} />
            </div>
            <div className={style.longitude}>
              <label htmlFor="longitude">Longitude:</label>
              <input type="text" name="longitude" {...register("longitude")} />
            </div>
          </div>
          <div className={style.endereco}>
            <div className={style.bairro}>
              <label htmlFor="neighborhood">Bairro:</label>
              <input
                type="text"
                name="neighborhood"
                {...register("neighborhood")}
              />
            </div>
            <div className={style.cidade}>
              <label htmlFor="city">Cidade:</label>
              <input type="text" name="city" {...register("city")} />
            </div>
            <div className={style.estado}>
              <label htmlFor="state">Estado:</label>
              <input type="text" name="state" {...register("state")} />
            </div>
          </div>
          <button onClick={handleSubmit(onSubmit)}>Cadastrar Ponto</button>
        </form>
      </div>
    </div>
  );
}

export default criaPontos;
