import style from "./CardPonto.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function CardPonto({
  nomeLocal,
  descricao,
  residuos,
  neighborhood,
  city,
  state,
  latitude,
  longitude,
}) {
  return (
    <div className={style.container}>
      <div className={style.mapContainer}>
        <MapContainer
          center={[latitude, longitude]}
          zoom={14}
          style={{ height: "200px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]}>
            <Popup>
              Nome do Local: {nomeLocal} <br />
              Descrição: {descricao} <br />
              Resíduos: {residuos}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <div>
        <div>
          <h2>{nomeLocal}</h2>
        </div>
        <div>
          <p>Descrição: {descricao}</p>
        </div>
        <div>
          <p>Tipo de resíduo: {residuos}</p>
        </div>
        <div className={style.endereco}>
          <p>Endereço:</p>
          <p>
            {neighborhood}, {city} - {state}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardPonto;
