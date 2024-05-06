import style from "./CardPonto.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { UtilitsContext } from "../../components/context/UtilitsContext";
import { useContext } from "react";
import "boxicons";

function CardPonto({
  id,
  nomeLocal,
  descricao,
  residuos,
  neighborhood,
  city,
  state,
  latitude,
  longitude,
}) {
  const { removePonto } = useContext(UtilitsContext);
  const handleRemove = () => {
    removePonto(id);
  };

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
        <div className={style.titleEdit}>
          <h2>{nomeLocal}</h2>
          {window.location.pathname === "/list-points" && (
            <>
              <button>
                <box-icon name="pencil" color="#fefae0"></box-icon>
              </button>
              <button onClick={() => handleRemove(id)}>
                <box-icon name="trash" color="#fefae0"></box-icon>
              </button>
            </>
          )}
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
