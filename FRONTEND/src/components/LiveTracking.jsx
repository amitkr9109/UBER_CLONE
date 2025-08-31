import React, { useEffect, useRef, forwardRef, useState } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import ttServices from '@tomtom-international/web-sdk-services';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

const LiveTracking = forwardRef(({ pickup, destination }, ref) => {

  const [distance, setDistance] = useState(null);
  const [captainAtPickup, setCaptainAtPickup] = useState(false);

  const mapElement = useRef(null);
  const map = useRef(null);
  const captainMarker = useRef(null);

  const routeLayerId = 'route';
  const captainRouteLayerId = 'captain-route';


  const geocodeAddress = async (address) => {
    const res = await ttServices.services.geocode({
      key: import.meta.env.VITE_TOMTOM_API_KEY,
      query: address,
    });
    return res.results[0]?.position;
  };

  const drawRoute = async (pickupCoords, destCoords, layerId, color = '#4a90e2') => {
    if (!map.current) return;

    const routeRes = await ttServices.services.calculateRoute({
      key: import.meta.env.VITE_TOMTOM_API_KEY,
      locations: `${pickupCoords.lng},${pickupCoords.lat}:${destCoords.lng},${destCoords.lat}`,
    });

    const geojson = routeRes.toGeoJson();

    if (layerId === routeLayerId) {
      setDistance((routeRes.routes[0].summary.lengthInMeters / 1000).toFixed(2));
    }

    if (map.current.getLayer(layerId)) {
      map.current.removeLayer(layerId);
      map.current.removeSource(layerId);
    }

    map.current.addLayer({
      id: layerId,
      type: 'line',
      source: { type: 'geojson', data: geojson },
      paint: { 'line-color': color, 'line-width': 5 },
    });
  };

  const getDistanceBetween = (coord1, coord2) => {
    const R = 6371e3;
    const φ1 = (coord1.lat * Math.PI) / 180;
    const φ2 = (coord2.lat * Math.PI) / 180;
    const Δφ = ((coord2.lat - coord1.lat) * Math.PI) / 180;
    const Δλ = ((coord2.lng - coord1.lng) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) ** 2 +  Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  useEffect(() => {
    let pickupCoords, destCoords;

    const initMap = async () => {
      pickupCoords = await geocodeAddress(pickup);
      destCoords = await geocodeAddress(destination);

      map.current = tt.map({
        key: import.meta.env.VITE_TOMTOM_API_KEY,
        container: mapElement.current,
        center: [pickupCoords.lng, pickupCoords.lat],
        zoom: 13,
      });

      map.current.addControl(new tt.NavigationControl());

      map.current.on('load', async () => {
        new tt.Marker({ color: 'green' })
          .setLngLat([pickupCoords.lng, pickupCoords.lat])
          .addTo(map.current);

        new tt.Marker({ color: 'blue' })
          .setLngLat([destCoords.lng, destCoords.lat])
          .addTo(map.current);

        await drawRoute(pickupCoords, destCoords, routeLayerId, '#4a90e2');

        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(
            async (pos) => {
              const { latitude, longitude } = pos.coords;
              const captainCoords = { lat: latitude, lng: longitude };

              if (!captainMarker.current) {
                captainMarker.current = new tt.Marker({ color: 'black' })
                  .setLngLat([captainCoords.lng, captainCoords.lat])
                  .addTo(map.current);
              } else {
                captainMarker.current.setLngLat([captainCoords.lng, captainCoords.lat]);
              }

              const distanceToPickup = getDistanceBetween(captainCoords, pickupCoords);

              if (distanceToPickup < 30) {
                if (map.current.getLayer(captainRouteLayerId)) {
                  map.current.removeLayer(captainRouteLayerId);
                  map.current.removeSource(captainRouteLayerId);
                }
                setCaptainAtPickup(true);
              } else {
                if (captainAtPickup || !map.current.getLayer(captainRouteLayerId)) {
                  await drawRoute(captainCoords, pickupCoords, captainRouteLayerId, '#ffd500');
                }
                setCaptainAtPickup(false);
              }
            },
            (err) => console.error(err),
            { enableHighAccuracy: true }
          );
        }
      });
    };

    initMap();

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [pickup, destination]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {distance !== null && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-md font-semibold z-10">
          Distance: {distance} km
        </div>
      )}
      <div
        ref={(node) => {
          mapElement.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
});

export default LiveTracking;