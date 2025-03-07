import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Modal from "../components/modal";
import { useAppContext } from "../context/homeContext";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function HomePage() {
  const { upload, setUpload } = useAppContext();
  
  
  return (
    <>
      <div className="w-[100%] h-auto  ">
        <Header></Header>
        <Outlet/>
        
      </div>
      {upload&&<Modal/>
    
      }
    </>
  );
}

export default HomePage;
