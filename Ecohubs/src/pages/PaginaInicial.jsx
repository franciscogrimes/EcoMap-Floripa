import Navbar from "../components/Navbar/Navbar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import style from "./styles/PaginaInicial.module.css";
import Maps from "leaflet";

const markerIcon = new Maps.Icon({
  iconUrl: require("./assets/been-here-solid-60.png"),
  iconSize: [35, 45],
});

function home() {
  const position = [51.505, -0.09];

  return (
    <div>
      <Navbar />

      <MapContainer
        center={position}
        zoom={13}
        className={style.Leaflet_container}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[13.084622, 80.248357]} icon={markerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default home;
