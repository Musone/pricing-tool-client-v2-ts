import {FunctionComponent, useEffect, useState} from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import {LatLngExpression} from "leaflet";
import LeafletControlGeocoder from "../LeafletControlGeocoder";
import PrimaryButton_1 from "../buttons/PrimaryButton_1";
import ICounselor from "../lists/interfaces/ICounselor";
import capitalize from "../../utils/capitalize";
import Spinner from "../Spinner";


const GeoMap: FunctionComponent<{
    setSearch?: (s: string) => void,
    counselors: ICounselor[],
    enableSearch?: boolean,
    userPos: LatLngExpression | null,
    setUserPos: (value: LatLngExpression) => void,
    setGeo?: CallableFunction,
    noGps?: boolean,
}> = ({
          enableSearch,
          counselors,
          setSearch,
          userPos,
          setUserPos,
          noGps,
          setGeo
      }) => {
    const [loading, setLoading] = useState(false);

    const getGeoLoc = () => {
        setLoading(true);
        window.navigator.geolocation.getCurrentPosition(
            (result) => {
                setUserPos([result.coords.latitude, result.coords.longitude])
                setLoading(false);
            },
            (err) => {
                console.log({err})
                setLoading(false);
            })
    }


    if (loading) return <div className={'px-10'}><Spinner/></div>
    if (!userPos && !noGps) return <PrimaryButton_1 text={'Enable GPS to access the map'} callBack={getGeoLoc}/>;

    return (
        <>
            {/*<MapContainer >*/}
            {/*    <TileLayer className={'w-96 h-96'}  />*/}

            {/*    <Marker position={[49.22923, -123.00462]} zoom={13} scrollWheelZoom={true}/>*/}
            {/*</MapContainer>*/}


            <MapContainer className={'w-screen h-96 z-0'} center={userPos ?? [0, 0]} zoom={userPos ? 15 : 1}
                          scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

                {userPos && (
                    <Marker position={userPos}>
                        <Popup>
                            Your location
                        </Popup>
                    </Marker>
                )}

                {counselors.map((counselor: ICounselor, i: number) => {
                    if (counselor.geolocation) return (
                        <Marker key={i}
                                position={[counselor.geolocation.latitude, counselor.geolocation.longitude]}>
                            <Popup>
                                <span
                                    className={'font-semibold'}>{`${capitalize(counselor.firstName)} ${capitalize(counselor.lastName)}`}
                                </span>
                                <br/>
                                <span>{counselor.geolocation.name}</span>
                                <br/>
                                <a className={'hover:cursor-pointer hover:underline'}
                                   onClick={setSearch ? () => setSearch(`${counselor.firstName} ${counselor.lastName}`)
                                       : () => null}
                                >view profile</a>
                            </Popup>
                        </Marker>
                    )
                })
                }

                {enableSearch && <LeafletControlGeocoder setGeo={setGeo ?? (() => null)}/>}
            </MapContainer>
        </>
    )
}

export default GeoMap;