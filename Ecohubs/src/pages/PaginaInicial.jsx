import Navbar from "../components/Navbar/Navbar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import style from "./styles/PaginaInicial.module.css";
import Maps from "leaflet";
import MarkerIconUrl from "./assets/been-here-solid-60.png";
import pontosColeta from "../../data/db.json";
import { UtilitsContext } from "../components/context/UtilitsContext";

function home() {
  const markerIcon = new Maps.Icon({
    iconUrl: MarkerIconUrl,
    iconSize: [35, 45],
  });
  const position = [-27.5937966, -48.5652894];

  return (
    <div>
      <Navbar />
      <div>
        <div>
          <div>
            <h3>Usuários ativos</h3>
          </div>
        </div>
      </div>

      <MapContainer
        center={position}
        zoom={13}
        className={style.Leaflet_container}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {pontosColeta.pontosColeta.map((ponto, index) => (
          <Marker
            position={[parseFloat(ponto.latitude), parseFloat(ponto.longitude)]}
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
  );
}

export default home;
