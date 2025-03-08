import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L, { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useAppContext } from "../context/homeContext";
import vector from "../assets/Vector.png";
import group from "../assets/Group.png";
import group1 from "../assets/Group1.png";
import loc from "../assets/mdi_map-marker-distance.png";
import Group3 from "../assets/Group3.png";
import { useEffect, useReducer, useRef, useState } from "react";
import { fetchTripDataWithrequiredData } from "../service/user.jsx";
import { current } from "@reduxjs/toolkit";
import coordinates from "../api/axios.jsx";
import { useDispatch } from "react-redux";
import { reset } from "../redux/slice/user.jsx";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

function ViewDetail() {
  const navigate = useNavigate();
  const [paginate, setPaginate] = useState({
    page: 1,
    firstIndex: 0,
    lastIndex: 4,
  });
  const params = useParams();
  const mapRef = useRef();
  const mapInstance = useRef(null);
  const dispatch = useDispatch();
  const [selectedTripId, setSelectedTripId] = useState(params.id);
  const [TableData, setTableData] = useState();

  const {
    trips,
    setTripCaluclations,
    tripCalculations = {},
    selectedTrips,
    setSelectedTrips,
  } = useAppContext();
  useEffect(() => {
    if (!selectedTrips.length) {
      navigate(-1);
      return;
    }

    setSelectedTripId(selectedTrips[0]._id);
  }, []);

  useEffect(() => {
    if (selectedTripId) {
      fetchTripDataWithrequiredData(selectedTripId)
        .then((response) => {
          setTripCaluclations(response.data);
        })
        .catch((error) => {
          if (error.status === 401) {
            dispatch(reset());
            navigate("/login", { replace: true });
          }
        });
    }
  }, [selectedTripId]);

  useEffect(() => {
    if (tripCalculations) {
      
      mapInstance.current = L.map(mapRef.current).setView(
        [52.505175214638, 13.33630812096193],
        14
      );

      // Load OpenStreetMap tiles
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapInstance.current);

      // Define marker icons
      const startEndIcon = L.icon({
        iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const stoppedIcon = L.icon({
        iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const idleIcon = L.icon({
        iconUrl: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const gpsData = tripCalculations?.tripData?.gpsData || [];

      const stopPoints = gpsData.filter(
        (p, i) => p.ignition === "off" && gpsData[i - 1]?.ignition === "on"
      );

      const overSpeedingPoints = new Set(
        tripCalculations?.overSpeedingPoints?.map(
          (p) => `${p.latitude},${p.longitude}`
        ) || []
      );
      const wayPoints = gpsData
        .filter(
          (p) =>
            !stopPoints.some(
              (stop) =>
                stop.latitude === p.latitude && stop.longitude === p.longitude
            )
        )
        .map((p) => L.latLng(p.latitude, p.longitude));

      for (let i = 0; i < wayPoints.length - 1; i++) {
        const segmentStart = wayPoints[i];
        const segmentEnd = wayPoints[i + 1];

        const isOverSpeeding = overSpeedingPoints.has(
          `${segmentStart.lat},${segmentStart.lng}`
        );

        L.polyline([segmentStart, segmentEnd], {
          color: isOverSpeeding ? "green" : "red",
          weight: 5,
        }).addTo(mapInstance.current);
      }

      if (wayPoints.length > 0) {
        L.marker(wayPoints[0], { icon: startEndIcon })
          .addTo(mapInstance.current)
          .bindPopup("Start")
          .openPopup();

        L.marker(wayPoints[wayPoints.length - 1], { icon: startEndIcon })
          .addTo(mapInstance.current)
          .bindPopup("End")
          .openPopup();
      }

      stopPoints.forEach((stopPoint) => {
        L.marker([stopPoint.latitude, stopPoint.longitude], {
          icon: stoppedIcon,
        })
          .addTo(mapInstance.current)
          .bindPopup("Stopped Here")
          .openPopup();
      });

      const idlePoints = gpsData.filter((p, index, arr) => {
        if (index === 0) return false;
        const prev = arr[index - 1];
        return (
          p.ignition === "on" &&
          p.latitude === prev.latitude &&
          p.longitude === prev.longitude
        );
      });

      idlePoints.forEach((idlePoint) => {
        L.marker([idlePoint.latitude, idlePoint.longitude], { icon: idleIcon })
          .addTo(mapInstance.current)
          .bindPopup("Idle Here")
          .openPopup();
      });

      return () => mapInstance.current.remove();
    }
  }, [tripCalculations]);

  useEffect(() => {
    if (tripCalculations.trip) {
      const data = tripCalculations.trip.slice(
        paginate.firstIndex,
        paginate.lastIndex + 1
      );

      setTableData(data);
    }
  }, [tripCalculations, paginate.page]);

  console.log(tripCalculations);

  return (
    <>
      <div className="w-[100%] h-auto  flex flex-col mt-5 space-y-2 justify-start items-center">
        <div className="w-[80%] h-[42px] place-content-center cursor-pointer ">
          <FaArrowLeft
            className="text-2xl"
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
        <div className="w-[80%] h-[70px] rounded-md border-2 border-gray-500 flex justify-evenly">
          <div className="w-[50%] h-full flex items-center pl-6 ">
            <h1 className="text-xl font-semibold">Colaba</h1>
          </div>
          <div className="w-[50%] h-full flex justify-end items-center pr-10">
            <button className="text-white bg-blue-950 w-[20%] h-[40px] rounded-md">
              New
            </button>
          </div>
        </div>
        <div className="w-[80%] h-[40px]  flex pt-4">
          <div className="w-[15%] h-[20px] flex space-x-1 ">
            <div className="w-[10%] h-full rounded-full bg-blue-600"></div>
            <h1 className="text-sm font-semibold">Stopped</h1>
          </div>
          <div className="w-[15%] h-[20px] flex space-x-1 ">
            <div className="w-[10%] h-full rounded-full bg-orange-600"></div>
            <h1 className="text-sm font-semibold">Idle</h1>
          </div>
          <div className="w-[15%] h-[20px] flex space-x-1 ">
            <div className="w-[10%] h-full rounded-full bg-green-500"></div>
            <h1 className="text-sm font-semibold">Over speeding</h1>
          </div>
        </div>
        <div
          className="w-[80%] h-[450px] bg-red-500 overflow-hidden"
          ref={mapRef}
        >
          {/* <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            className="w-full h-full rounded-md"
            whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </MapContainer> */}
        </div>
        <div className="w-[80%] h-[40px] flex border-b-2 border-b-gray-300  justify-start items-end space-x-3 ">
          <div className="w-[3%] h-[30px] border-2 border-gray-300  text-center rounded-sm  flex justify-center items-center mb-1">
            <h1 className="text-xl text-gray-500 font-medium">{"<"}</h1>
          </div>
          <div className="w-[50%] flex h-full space-x-4 items-end cursor-pointer">
            {selectedTrips.map((data, index) => (
              <h1
                className={`text-sm    font-medium mb-0 ${
                  data._id === selectedTripId
                    ? "border-b-2 border-blue-600 text-blue-500"
                    : " text-gray-400 "
                }`}
                onClick={() => setSelectedTripId(data._id)}
              >
                {data.tripName}
              </h1>
            ))}
          </div>
          <div className="w-[47%] h-[30px] rounded-md text-center flex justify-end items-center mb-1">
            <div className="w-[6%] h-[30px] border-2 border-gray-300  text-center rounded-sm  flex justify-center items-center mb-1">
              <h1 className="text-xl text-gray-500 font-medium">{">"}</h1>
            </div>
          </div>
        </div>
        <div className="w-[80%] h-[150px] flex border-b-2 justify-between space-x-3 items-center  ">
          <div className="w-[20%] h-[120px] border-2 space-y-1 border-gray-400 rounded-md  flex flex-col justify-center items-center">
            <div className="w-[100%] h-[30px]">
              <img src={vector} alt="" className="pl-6 pt-3" />
            </div>
            <div className="w-[100%] h-[70px] ">
              <h1 className="text-2xl font-semibold text-center">
                {(tripCalculations.distance / 1000).toFixed(2)}Km
              </h1>
              <h1 className="text-lg text-center">Total Distanced Travelled</h1>
            </div>
          </div>
          <div className="w-[20%] h-[120px] border-2 space-y-1 border-gray-400 rounded-md  flex flex-col justify-center items-center">
            <div className="w-[100%] h-[30px]">
              <img src={group} alt="" className="pl-6 pt-3" />
            </div>
            <div className="w-[100%] h-[70px] ">
              <h1 className="text-2xl font-semibold text-center">
                {tripCalculations.travelDuration}
              </h1>
              <h1 className="text-lg text-center">Total Travelled Duration</h1>
            </div>
          </div>
          <div className="w-[20%] h-[120px] border-2 space-y-1 border-gray-400 rounded-md  flex flex-col justify-center items-center">
            <div className="w-[100%] h-[30px]">
              <img src={group1} alt="" className="pl-6 pt-3" />
            </div>
            <div className="w-[100%] h-[70px] ">
              <h1 className="text-2xl font-semibold text-center">
                {tripCalculations.overSpeedDuration}
              </h1>
              <h1 className="text-lg text-center">Over Speeding Duration</h1>
            </div>
          </div>
          <div className="w-[20%] h-[120px] border-2 space-y-1 border-gray-400 rounded-md  flex flex-col justify-center items-center">
            <div className="w-[100%] h-[30px]">
              <img src={loc} alt="" className="pl-6 pt-3" />
            </div>
            <div className="w-[100%] h-[70px] ">
              <h1 className="text-2xl font-semibold text-center">
                {(tripCalculations.overSpeedingDistance / 1000).toFixed(2)}KM
              </h1>
              <h1 className="text-lg text-center">Over Speeding Distance</h1>
            </div>
          </div>
          <div className="w-[20%] h-[120px] border-2 space-y-1 border-gray-400 rounded-md  flex flex-col justify-center items-center">
            <div className="w-[100%] h-[30px]">
              <img src={Group3} alt="" className="pl-6 pt-3" />
            </div>
            <div className="w-[100%] h-[70px] ">
              <h1 className="text-2xl font-semibold text-center">
                {tripCalculations.stoppedDuration}
              </h1>
              <h1 className="text-lg text-center">Stopped Duration</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[400px] mt-3 flex justify-center  ">
        <div className="w-[80%] h-full flex ">
          <div className="w-[60%] h-full ">
            <table className="w-[100%] h-full border-2 border-gray-300 text-center">
              <thead className="border-b-gray-300 border-2">
                <tr className="border-2 border-gray-300 bg-gray-100 font-medium">
                  <th className="border-2 border-gray-300 p-2">Time</th>
                  <th className="border-2 border-gray-300 p-2">Point</th>
                  <th className="border-2 border-gray-300 p-2">Ignition</th>
                  <th className="border-2 border-gray-300 p-2">Speed</th>
                </tr>
              </thead>
              <tbody>
                {TableData &&
                  TableData.map((row, index, arr) => (
                    <tr key={index} className="border-2">
                      {/* latitude: 52.505175214638, longitude: 13.33630812096193, timestamp */}
                      <td className="border-2 border-gray-300  p-2">
                        {new Date(row.timestamp).toTimeString()}
                      </td>
                      <td className="border-2 border-gray-300 p-2">
                        {row.latitude + " - " + row.longitude}
                      </td>
                      <td
                        className={`border-2 border-gray-300 p-2 ${
                          row.ignition == "on"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {row.ignition == "on" ? "ON" : "OFF"}
                      </td>
                      <td className="border-2 border-gray-300 p-2">
                        {index > 0 && arr[index - 1].speed === row.speed
                          ? "''"
                          : row.speed + "KM/H"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="w-[40%] h-full  border-2 border-gray-300 flex flex-col">
            <div className="w-[100%] h-[42px] bg-gray-100"></div>
            <div className="flex flex-col justify-center h-[300px] items-center space-y-5">
              <div className="w-[80%] h-[20px] flex space-x-3"><h1>Travel Duration</h1> <h1>{tripCalculations.
travelDuration
}</h1></div>
              <div className="w-[80%] h-[20px] flex space-x-3"><h1>Stopped Duration </h1> <h1>{tripCalculations.stoppedDuration}</h1></div>
              <div className="w-[80%] h-[20px] flex space-x-3"><h1>Distance</h1> <h1> {(tripCalculations.distance / 1000).toFixed(2)}Km</h1></div>
              <div className="w-[80%] h-[20px] flex space-x-3"><h1>Overspeeding Duration</h1> <h1> {tripCalculations.overSpeedDuration}</h1></div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[30px]  flex justify-center space-x-2 cursor-pointer mt-5">
        <FaCaretLeft
          className="text-3xl text-gray-400 border-2 "
          onClick={() => {
            setPaginate({
              firstIndex:
                paginate.firstIndex === 0 ? 0 : paginate.firstIndex - 4,
              page: paginate.page > 1 ? paginate.page - 1 : 1,
              lastIndex: paginate.lastIndex - 4,
            });
          }}
        />
        <h1 className="font-semibold w-[3%] text-center border-2 border-gray-500">
          {paginate.page}
        </h1>
        <FaCaretRight
          className="text-3xl border-2 text-gray-500"
          onClick={() => {
            setPaginate((prev) => ({
              firstIndex: prev.lastIndex,
              page: prev.page + 1,
              lastIndex: prev.lastIndex + 4,
            }));
          }}
        />
      </div>
      <div className="h-[100px] w-[100%]"></div>
    </>
  );
}

export default ViewDetail;
