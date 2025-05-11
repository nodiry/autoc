import { useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { siteConfig } from "@/config/site";

const uzbekistanCenter = { lat: 41.3775, lng: 64.5853 }; // center of Uzbekistan

type RegionData = {
  region: string;
  count: number;
  lat: number;
  lng: number;
};

const DealersMap = () => {
  const [regions, setRegions] = useState<RegionData[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDsrzoNNBOrN2rjU_NlIkEakkQ6XF0E2EM",
  });

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await fetch(siteConfig.links.dashboard + "map", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setRegions(data.dealers);
        } else {
          console.error("Failed to fetch region data");
        }
      } catch (error) {
        console.error("Error fetching dealer regions:", error);
      }
    };

    fetchRegions();
  }, []);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden">
      <GoogleMap
        center={uzbekistanCenter}
        zoom={6.2}
        mapContainerStyle={{ width: "100%", height: "100%" }}
      >
        {regions.map((region) => (
          <MarkerF
            key={region.region}
            position={{ lat: region.lat, lng: region.lng }}
            onClick={() => setSelectedRegion(region)}
            label={{
              text: String(region.count),
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
            }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />
        ))}

        {selectedRegion && (
          <InfoWindowF
            position={{ lat: selectedRegion.lat, lng: selectedRegion.lng }}
            onCloseClick={() => setSelectedRegion(null)}
          >
            <div>
              <strong>{selectedRegion.region}</strong>
              <br />
              Dealers: {selectedRegion.count}
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  );
};

export default DealersMap;
