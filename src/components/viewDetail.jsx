import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L, { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useAppContext } from "../context/homeContext";
import vector from "../assets/Vector.png";
import group from '../assets/Group.png'
import group1 from '../assets/Group1.png'
import loc from '../assets/mdi_map-marker-distance.png'
import Group3 from '../assets/Group3.png'
import { useEffect, useReducer, useRef, useState } from "react";
import {  fetchTripDataWithrequiredData } from "../service/user.jsx";
import { current } from "@reduxjs/toolkit";
import coordinates from "../api/axios.jsx";


function ViewDetail() {
  const navigate = useNavigate();
  const params = useParams()
   const mapRef = useRef()
   const mapInstance = useRef(null);
  const [selectedTripId, setSelectedTripId] = useState(params.id);

  const { trips ,setTripCaluclations ,tripCalculations={},selectedTrips,setSelectedTrips} = useAppContext();
  useEffect(() => {
    if (!selectedTrips.length) {
      navigate(-1)
      return
    }
   console.log("selectedTrips[0]._id",selectedTrips[0]._id);
   
    setSelectedTripId(selectedTrips[0]._id)    
   
  }, []);


  useEffect(() => {
    console.log("tr",selectedTripId);
    
    if (selectedTripId) {
      fetchTripDataWithrequiredData(selectedTripId)
        .then((response) => {
          console.log("tripdata",response.data);
          
          setTripCaluclations(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedTripId]);
  useEffect(() => {
    if (tripCalculations) {
     mapInstance.current = L.map(mapRef.current).setView([52.505175214638, 13.33630812096193], 9);
    // Load OpenStreetMap tiles
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapInstance.current);

    const redIcon = L.icon({
      iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png', // Red marker image
      iconSize: [32, 32], // Size of the icon
      iconAnchor: [16, 32], // Anchor point
      popupAnchor: [0, -32] // Popup position
    });
    const idleIcon = L.icon({
      iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', // Orange marker for idle points
      iconSize: [32, 32], 
      iconAnchor: [16, 32], 
      popupAnchor: [0, -32] 
    });
    const startIcon = L.icon({
      iconUrl: 'https://maps.google.com/mapfiles/ms/icons/black-dot.png', // Orange marker for idle points
      iconSize: [32, 32], 
      iconAnchor: [16, 32], 
      popupAnchor: [0, -32] 
    });
    
    const wayPoints = tripCalculations?.tripData?.gpsData.map((p)=>L.latLng(p.latitude,p.longitude))
    const stopPoint = tripCalculations?.tripData?.gpsData.find((p, i) => p.ignition === "off" && tripCalculations?.tripData?.gpsData[i - 1]?.ignition === "on");
    const idlePoints = tripCalculations?.tripData?.gpsData.filter((p, index, arr) => {
      if (index === 0) return false; 
      const prev = arr[index - 1];
      return p.ignition === 'on' && p.latitude === prev.latitude && p.longitude === prev.longitude;
    });
    L.Routing.control({
      waypoints:wayPoints ,
      routeWhileDragging: true,
      createMarker: function(i, waypoint, n) {
        // Show marker only for first and last points
        if (i === 0 || i === n - 1) {
            let marker = L.marker(waypoint.latLng,{icon:startIcon})
                .bindPopup(i === 0 ? "Start" : "End")
                .addTo(mapInstance.current); // Explicitly add marker to the map
            marker.openPopup();
            return marker;
        }
        return null;
    }
    
    }).addTo(mapInstance.current);
    if (stopPoint) {
      L.marker([stopPoint.latitude, stopPoint.longitude], {icon:redIcon })
        .addTo(mapInstance.current)
        .bindPopup("Stopped Here")
        .openPopup();
    }
    console.log(idlePoints);
    
    // idlePoints.forEach(idlePoint => {
    //   L.marker([idlePoint.latitude, idlePoint.longitude], { icon: idleIcon })
    //     .addTo(mapInstance.current)
    //     .bindPopup("Idle Here")
    //     .openPopup();
    // });
    }
    
    

    return () => mapInstance.current.remove(); // Cleanup on unmount
  }, [tripCalculations]);
  
  



 

  
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
            <div className="w-[10%] h-full rounded-full bg-rose-600"></div>
            <h1 className="text-sm font-semibold">Idle</h1>
          </div>
          <div className="w-[15%] h-[20px] flex space-x-1 ">
            <div className="w-[10%] h-full rounded-full bg-green-500"></div>
            <h1 className="text-sm font-semibold">Over speeding</h1>
          </div>
        </div>
        <div className="w-[80%] h-[450px] bg-red-500 overflow-hidden"  ref={mapRef}>
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
          <div className="w-[50%] flex h-full space-x-4 items-end cursor-pointer" >
            {selectedTrips.map((data, index) => (
              <h1
                className={`text-sm    font-medium mb-0 ${
                  data._id === selectedTripId
                    ? "border-b-2 border-blue-600 text-blue-500"
                    : " text-gray-400 "
                }`}  onClick={() => setSelectedTripId(data._id)}

              >
                {data.tripName
                }
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
              <h1 className="text-2xl font-semibold text-center">{(tripCalculations.distance/1000).toFixed(2) }Km</h1>
              <h1 className="text-lg text-center">
                Total Distanced Travelled 
              </h1>
            </div>
          </div>
          <div className="w-[20%] h-[120px] border-2 space-y-1 border-gray-400 rounded-md  flex flex-col justify-center items-center">
            <div className="w-[100%] h-[30px]">
              <img src={group} alt="" className="pl-6 pt-3" />
            </div>
            <div className="w-[100%] h-[70px] ">
              <h1 className="text-2xl font-semibold text-center">{tripCalculations.travelDuration}</h1>
              <h1 className="text-lg text-center">
              Total Travelled Duration               
              </h1>
            </div>
          </div>
          <div className="w-[20%] h-[120px] border-2 space-y-1 border-gray-400 rounded-md  flex flex-col justify-center items-center">
            <div className="w-[100%] h-[30px]">
              <img src={group1} alt="" className="pl-6 pt-3" />
            </div>
            <div className="w-[100%] h-[70px] ">
              <h1 className="text-2xl font-semibold text-center">{tripCalculations.overSpeedDuration}</h1>
              <h1 className="text-lg text-center">
              Over Speeding Duration 
              </h1>
            </div>
          </div>
          <div className="w-[20%] h-[120px] border-2 space-y-1 border-gray-400 rounded-md  flex flex-col justify-center items-center">
            <div className="w-[100%] h-[30px]">
              <img src={loc} alt="" className="pl-6 pt-3" />
            </div>
            <div className="w-[100%] h-[70px] ">
              <h1 className="text-2xl font-semibold text-center">{(tripCalculations.overSpeedingDistance/1000).toFixed(2)}KM</h1>
              <h1 className="text-lg text-center">
              Over Speeding Distance 
              </h1>
            </div>
          </div>
          <div className="w-[20%] h-[120px] border-2 space-y-1 border-gray-400 rounded-md  flex flex-col justify-center items-center">
            <div className="w-[100%] h-[30px]">
              <img src={Group3} alt="" className="pl-6 pt-3" />
            </div>
            <div className="w-[100%] h-[70px] ">
              <h1 className="text-2xl font-semibold text-center">{tripCalculations.stoppedDuration}</h1>
              <h1 className="text-lg text-center">
              Stopped Duration              
               </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewDetail;
