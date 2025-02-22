import { createContext, useContext, useEffect, useState } from "react";
import { fetchTrips } from "../service/user.jsx";
import { useSelector } from "react-redux";

const AppContext = createContext();

export const HomeContext = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [upload, setUpload] = useState(false);
  const [selectedTrips,setSelectedTrips] = useState([])
  const [tripCalculations,setTripCaluclations] = useState()
  const {userInfo} = useSelector((state)=>state.user)
  useEffect(()=>{
    fetchTrips(userInfo.id).then((response)=>{
      setTrips(response.data)
    })
   
  },[])

  return (
    <AppContext.Provider value={{ trips, setTrips, upload, setUpload ,selectedTrips ,setSelectedTrips,tripCalculations,setTripCaluclations }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
