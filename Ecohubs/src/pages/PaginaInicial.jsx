import Navbar from "../components/Navbar/Navbar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import style from "./styles/PaginaInicial.module.css";
import Maps from "leaflet";
import MarkerIconUrl from "./assets/been-here-solid-60.png";
import pontosColeta from "../../data/db.json";
import { useEffect, useState } from "react";
import CardPonto from "../components/cardPontos/CardPonto";
// import { Outlet } from "react-router-dom";

function home() {

  // Mapa
  const markerIcon = new Maps.Icon({
    iconUrl: MarkerIconUrl,
    iconSize: [35, 45],
  });
  const position = [-27.5937966, -48.5652894];

  // Quantidade de usuários logados na plataforma
  const [numeroUsuarios, setNumeroUsuarios] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/usuarios")
      .then((resp) => resp.json())
      .then((data) => {
        setNumeroUsuarios(data.length);
      })
      .catch((err) => console.log(err));
  }, []);

  // Quantidade de Pontos de coletas

  const [numeroPontos, setNumeroPontos] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/pontosColeta")
      .then((resp) => resp.json())
      .then((data) => {
        setNumeroPontos(data.length);
      })
      .catch((err) => console.log(err));
  }, []);

  // Exibição de cards

  const [dadosPontosColeta, setdadosPontosColeta] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/pontosColeta")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setdadosPontosColeta(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={style.container}>
      <Navbar />

      <div>
        <MapContainer
          center={position}
          zoom={14}
          className={style.Leaflet_container}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {pontosColeta.pontosColeta.map((ponto, index) => (
            <Marker
              position={[
                parseFloat(ponto.latitude),
                parseFloat(ponto.longitude),
              ]}
              icon={markerIcon}
              key={index}
            >
              <Popup>
                Id: {ponto.id} <br />
                Nome do Local: {ponto.nomeLocal} <br />
                Descrição: {ponto.descricao} <br />
                Resíduos: {ponto.residuos}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className={style.infoGeral}>
        <div>
          <h1>Usuários ativos: {numeroUsuarios}</h1>
        </div>
        <div>
          <h1>Pontos de coletas cadastrados: {numeroPontos}</h1>
        </div>
      </div>
      <div className={style.cards}>
        {dadosPontosColeta.map((ponto, index) => (
          <CardPonto
            nomeLocal={ponto.nomeLocal}
            descricao={ponto.descricao}
            residuos={ponto.residuos}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default home;
