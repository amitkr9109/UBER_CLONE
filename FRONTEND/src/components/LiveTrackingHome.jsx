// LiveTracking.jsx
import React, { useEffect, useRef } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

const LiveTrackingHome = () => {
  const mapElement = useRef();
  const mapInstance = useRef();
  const userMarker = useRef();

  useEffect(() => {
    // Initialize map
    mapInstance.current = tt.map({
      key: import.meta.env.VITE_TOMTOM_API_KEY,
      container: mapElement.current,
      center: [77.431095, 23.2523208], // default center
      zoom: 13,
    });

    // Cleanup on unmount
    return () => mapInstance.current.remove();
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;

    const updateLocation = (position) => {
      const { latitude, longitude } = position.coords;

      // Add or move user marker
      if (!userMarker.current) {
        userMarker.current = new tt.Marker({ color: "red" })
          .setLngLat([longitude, latitude])
          .addTo(mapInstance.current);
      } else {
        userMarker.current.setLngLat([longitude, latitude]);
      }

      // Center map on user
      mapInstance.current.setCenter([longitude, latitude]);
    };

    // Get initial location and watch for changes
    navigator.geolocation.getCurrentPosition(updateLocation);
    const watchId = navigator.geolocation.watchPosition(updateLocation);

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return <div ref={mapElement} style={{ width: "100%", height: "100%" }} />;
};

export default LiveTrackingHome;
