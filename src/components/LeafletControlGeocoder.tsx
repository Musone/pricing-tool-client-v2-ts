import {useMap} from "react-leaflet";
import {FunctionComponent, useEffect, useState} from "react";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import * as L from "leaflet";
import GeocoderControl from "leaflet-control-geocoder";

const LeafletControlGeocoder: FunctionComponent<{
    setGeo: CallableFunction
}> = ({setGeo}) => {
    const [loaded, setLoaded] = useState(false);
    const geocoderControl = new GeocoderControl({ placeholder: 'Search for address...'});
    const map = useMap();

    useEffect(() => {

        if (!loaded) {
            geocoderControl.addTo(map);
            geocoderControl.addThrobberClass();
            geocoderControl.setPosition('topleft');
            geocoderControl.on('markgeocode', function (e) {
                console.log(e)
                setGeo({
                    longitude: e.geocode.center.lng,
                    latitude: e.geocode.center.lat,
                    name: e.geocode.name
                })
            });
            setLoaded(true);
        }

        // return geocoderControl.clearAllEventListeners;
    }, []);

    return null;
}

export default LeafletControlGeocoder;
//
// export default function LeafletControlGeocoder() {
//     const map = useMap();
//
//     useEffect(() => {
//         let geocoder = L.Control.Geocoder.nominatim();
//         if (typeof URLSearchParams !== "undefined" && location.search) {
//             // parse /?geocoder=nominatim from URL
//             var params = new URLSearchParams(location.search);
//             var geocoderString = params.get("geocoder");
//             if (geocoderString && L.Control.Geocoder[geocoderString]) {
//                 geocoder = L.Control.Geocoder[geocoderString]();
//             } else if (geocoderString) {
//                 console.warn("Unsupported geocoder", geocoderString);
//             }
//         }
//
//         L.Control.geocoder({
//             query: "",
//             placeholder: "Search here...",
//             defaultMarkGeocode: false,
//             geocoder
//         })
//             .on("markgeocode", function (e: any) {
//                 var latlng = e.geocode.center;
//                 L.marker(latlng, { icon: L.icon })
//                     .addTo(map)
//                     .bindPopup(e.geocode.name)
//                     .openPopup();
//                 map.fitBounds(e.geocode.bbox);
//             })
//             .addTo(map);
//     }, []);
//
//     return null;
// }