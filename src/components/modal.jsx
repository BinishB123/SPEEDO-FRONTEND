import React, { useState ,useRef} from "react";
import { useAppContext } from "../context/homeContext";
import { BsUpload } from "react-icons/bs";
import { uploadFile } from "../service/fileUpload";
import { toast } from "sonner";
import {  useSelector } from "react-redux";

function Modal() {
  const { setUpload } = useAppContext();
  const {userInfo} = useSelector((state)=>state.user)
  const fileRef = useRef()
  const [data,setData] = useState(null)
  const [tripName,setTripName] = useState("")


  const onClickFile = () => {
    if (fileRef.current) {
      fileRef.current.value = ""
      fileRef.current.click();
    }
  };
  

  const onFileChange = (e)=>{
    const file = e.target.files[0]; 
    setData(file)
  }
 
  const onClickSave = ()=>{
   if (!data) {
    return toast.warning("Upload Your Trip ")
   }
   if (tripName.trim==="") {
    return toast.warning("Add a trip name")
   }
   console.log(userInfo);
   
  if (!userInfo.id) {
    return 
  }

    const formData = new FormData()
    formData.append("file",data)
    formData.append("name",tripName)
    formData.append("id",userInfo.id)
    uploadFile(formData)
  }


  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur flex items-center justify-center transition-opacity ">
      <div className="w-[40%] h-[400px] rounded-md bg-white flex flex-col space-y-4 justify-center items-center cursor-pointer">
        <div
          className="w-[90%] h-[30px]  text-3xl text-end"
          onClick={() => setUpload(false)}
        >
          x
        </div>
        <div className="w-[80%] h-[40px] ">
          <input
            value={tripName+""}
            onChange={(e)=>setTripName(e.target.value)}
            type="text"
            placeholder="Trip Name*"
            className="w-full h-full pl-5 rounded-md border-2 border-gray-400"
          />
        </div>
        <div className="w-[80%] h-[150px] border-2 border-blue-500 flex flex-col rounded-md justify-center items-center" onClick={onClickFile}>
        <input type="file" accept=".csv, .txt" ref={fileRef} className="hidden"  onChange={onFileChange}/>         
         <BsUpload className="text-4xl text-blue-500"></BsUpload>

          <h1 className="text-blue-600">
            {" "}
            Click here to upload the{" "}
            <strong className="underline ">Excel</strong> sheet of your trip{" "}
          </h1>
        </div>
        <div className="w-[80%] h-[80px]  flex justify-between">
            <button className="w-[45%] rounded-md h-[50px] border-2 border-gray-600 text-gray-600  ">Cancel</button>
            <button className="w-[45%] h-[50px] bg-blue-950  rounded-md text-white " onClick={onClickSave}>Save</button>

        </div>
      </div>
    </div>
  );
}

export default Modal;
