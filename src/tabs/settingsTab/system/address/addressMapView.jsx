import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

function AddressMapView({
  latitude = 49.76773,
  longitude = -96.8097,
  containerStyle,
  zoomLevel = 3,
  disableScroll = true,
}) {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAP_ACCESS_TOKEN
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [longitude, latitude],
      zoom: latitude == 0 ? 2.5 : zoomLevel,
    });

    new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(mapRef.current);
    if (disableScroll) {
      mapRef.current.addControl(new mapboxgl.NavigationControl());
      mapRef.current.scrollZoom.disable();
    }

    return () => {
      mapRef.current.remove();
    };
  }, [latitude, longitude]);

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <div
        id="map-container"
        ref={mapContainerRef}
        style={{ ...containerStyle }}
      />
    </div>
  );
}

export default AddressMapView;
