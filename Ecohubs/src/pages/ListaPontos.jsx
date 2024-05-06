import { useState, useEffect } from "react";
import CardPonto from "../components/cardPontos/CardPonto";
import { UtilitsContext } from "../components/context/UtilitsContext";
import { useContext } from "react";

function ListaPontos() {
  const [pontos, setPontos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/pontosColeta")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setPontos(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const { removePonto } = useContext(UtilitsContext);

  return (
    <div>
      {pontos.map((ponto, index) => (
        <CardPonto
          id={ponto.id}
          nomeLocal={ponto.nomeLocal}
          descricao={ponto.descricao}
          residuos={ponto.residuos}
          neighborhood={ponto.neighborhood}
          city={ponto.city}
          state={ponto.state}
          latitude={ponto.latitude}
          longitude={ponto.longitude}
          key={index}
          handleRemove={removePonto}
        />
      ))}
    </div>
  );
}

export default ListaPontos;
