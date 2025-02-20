import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import { useAppContext } from "../context/homeContext";
import vector from "../assets/Vector.png";
import group from '../assets/Group.png'
import group1 from '../assets/Group1.png'
import loc from '../assets/mdi_map-marker-distance.png'
import Group3 from '../assets/Group3.png'
import { useEffect } from "react";


function ViewDetail() {
  const navigate = useNavigate();
  const { trips } = useAppContext();
  const geojsonData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Location 1" },
        geometry: {
          type: "Point",
          coordinates: [-0.09, 51.505],
        },
      },
     
    ],
  };

  
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
        <div className="w-[80%] h-[450px] bg-red-500 overflow-hidden">
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            className="w-full h-full rounded-md"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <GeoJSON data={geojsonData} />
          </MapContainer>
        </div>
        <div className="w-[80%] h-[40px] flex border-b-2 border-b-gray-300  justify-start items-end space-x-3 ">
          <div className="w-[3%] h-[30px] border-2 border-gray-300  text-center rounded-sm  flex justify-center items-center mb-1">
            <h1 className="text-xl text-gray-500 font-medium">{"<"}</h1>
          </div>
          <div className="w-[50%] flex h-full space-x-4 items-end">
            {trips.map((data, index) => (
              <h1
                className={`text-sm    font-medium mb-0 ${
                  index === 2
                    ? "border-b-2 border-blue-600 text-blue-500"
                    : " text-gray-400 "
                }`}
              >
                {data}
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
              <h1 className="text-2xl font-semibold text-center">63 KM</h1>
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
              <h1 className="text-2xl font-semibold text-center">1Hr 36 Mins</h1>
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
              <h1 className="text-2xl font-semibold text-center">41 Mins</h1>
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
              <h1 className="text-2xl font-semibold text-center">20.3 KM</h1>
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
              <h1 className="text-2xl font-semibold text-center">41 Mins</h1>
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
