import Navbar from "../components/Navbar/Navbar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import style from "./styles/PaginaInicial.module.css";
import Maps from "leaflet";
import MarkerIconUrl from "./assets/marker-icon.png";
import pontosColeta from "../../data/db.json";
import { useEffect, useState } from "react";
import CardPonto from "../components/cardPontos/CardPonto";
// import { Outlet } from "react-router-dom";

function home() {
  // Mapa
  const markerIcon = new Maps.Icon({
    iconUrl: MarkerIconUrl,
    iconSize: [25, 35],
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
                Nome do Local: {ponto.nomeLocal} <br />
                Descrição: {ponto.descricao} <br />
                Resíduos: {ponto.residuos}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className={style.infoGeral}>
        <h2>Informações gerais</h2>
        <div className={style.infoGeralDim}>
          <div className={style.usuarios}>
            <h1>Usuários ativos: {numeroUsuarios}</h1>
          </div>
          <div className={style.pontos}>
            <h1>Pontos de coletas cadastrados: {numeroPontos}</h1>
          </div>
        </div>
      </div>
      <div className={style.cards}>
        <h2>Conheça os pontos de coleta mais próximo de você!</h2>
        {dadosPontosColeta.map((ponto, index) => (
          <CardPonto
            nomeLocal={ponto.nomeLocal}
            descricao={ponto.descricao}
            residuos={ponto.residuos}
            neighborhood={ponto.neighborhood}
            city={ponto.city}
            state={ponto.state}
            latitude={ponto.latitude}
            longitude={ponto.longitude}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default home;
