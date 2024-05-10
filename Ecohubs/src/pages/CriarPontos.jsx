import Navbar from "../components/Navbar/Navbar";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { UtilitsContext } from "../components/context/UtilitsContext";
import style from "./styles/CriarPontos.module.css";
import { useParams } from "react-router-dom";

function criaPontos() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm(); // Assegure-se de desestruturar `errors` do `formState`

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

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/pontosColeta/${id}`)
        .then((resp) => resp.json())
        .then((data) => {
          setValue("nomeLocal", data.nomeLocal);
          setValue("id", data.id);
          setValue("descricao", data.descricao);
          setValue("residuos", data.residuos);
          setValue("cep", data.cep);
          setValue("latitude", data.latitude);
          setValue("longitude", data.longitude);
          setValue("neighborhood", data.neighborhood);
          setValue("city", data.city);
          setValue("state", data.state);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const { cadastrarPonto } = useContext(UtilitsContext);

  const onSubmit = async (dadosPonto) => {
    if (id) {
      try {
        await fetch(`http://localhost:3000/pontosColeta/${dadosPonto.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosPonto),
        });
        alert("Ponto de coleta atualizado com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar ponto de coleta:", error);
        alert("Erro ao atualizar ponto de coleta");
      }
    } else {
      cadastrarPonto(dadosPonto);
    }
  };

  return (
    <div className={style.container}>
      <Navbar />
      <div>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
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
                  required: "Nome do local é obrigatório",
                  maxLength: {
                    value: 50,
                    message:
                      "Nome do local não pode ter mais que 50 caracteres",
                  },
                  minLength: {
                    value: 9,
                    message: "Nome do local deve ter pelo menos 9 caracteres",
                  },
                })}
              />
              {errors.nomeLocal && <p>{errors.nomeLocal.message}</p>}
            </div>
            <div className={style.id}>
              <label htmlFor="id">Identificador do usuário: </label>
              <input
                type="number"
                name="id"
                {...register("id", {
                  required: "Identificador é obrigatório",
                  maxLength: {
                    value: 2,
                    message: "Identificador deve ter no máximo 2 dígitos",
                  },
                  minLength: {
                    value: 1,
                    message: "Identificador deve ter pelo menos 1 dígito",
                  },
                })}
              />
              {errors.id && <p>{errors.id.message}</p>}
            </div>
          </div>
          <div className={style.descricao}>
            <label htmlFor="descricao">Descrição: </label>
            <input
              className={style.descricaoInput}
              type="text"
              name="descricao"
              {...register("descricao", {
                required: "Descrição é obrigatória",
                maxLength: {
                  value: 200,
                  message: "Descrição não pode ter mais que 200 caracteres",
                },
                minLength: {
                  value: 15,
                  message: "Descrição deve ter pelo menos 15 caracteres",
                },
              })}
            />
            {errors.descricao && <p>{errors.descricao.message}</p>}
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
              {errors.residuos && <p>{errors.residuos.message}</p>}
            </div>
            <div className={style.cep}>
              <label htmlFor="cep">CEP:</label>
              <input
                type="text"
                name="cep"
                {...register("cep", {
                  required: "CEP é obrigatório",
                  maxLength: {
                    value: 8,
                    message: "CEP deve ter exatamente 8 caracteres",
                  },
                  minLength: {
                    value: 8,
                    message: "CEP deve ter exatamente 8 caracteres",
                  },
                  onBlur: () => {
                    coordenadas(), enderecoCompleto();
                  },
                })}
              />
              {errors.cep && <p>{errors.cep.message}</p>}
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
          <button type="submit">Cadastrar Ponto</button>
        </form>
      </div>
    </div>
  );
}

export default criaPontos;
