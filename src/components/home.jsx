import { data, useNavigate } from "react-router-dom";
import hai from "../assets/cc0de79f0e3bb67e5550f2ef527dd83b.png";
import user from "../assets/image 1.png";
import { useAppContext } from "../context/homeContext.jsx";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import { toast } from "sonner";
import { useEffect } from "react";


function Home() {
  const { trips, setUpload, setSelectedTrips, selectedTrips, setTripCaluclations } = useAppContext()
  const navigate = useNavigate()
  useEffect(() => {
    const storedTrips = JSON.parse(localStorage.getItem("selectedTrips"));
    if (storedTrips) {
      setSelectedTrips(storedTrips);
    } else {
      setSelectedTrips([])
    }
  }, []);



  const goToViewDetail = () => {
    if (selectedTrips.length > 0) {
      navigate(`/view`)
    } else {
      toast.warning("Select Trips")
    }
  }

  const onClickAddTrips = (data) => {
    if (selectedTrips.some((d) => d._id === data._id)) {
      const updatedData = selectedTrips.filter((d) => {
        if (d._id !== data._id) {
          return d
        }
      })

      setSelectedTrips(updatedData)
      localStorage.setItem("selectedTrips", JSON.stringify(updatedData));

      return
    }

    localStorage.setItem("selectedTrips", JSON.stringify([...selectedTrips, data]));

    setSelectedTrips((prev) => [...prev, data])
  }

  return (
    <div className="w-[100%] h-[652px] flex flex-col justify-start pt-5 items-center   ">
      <div className="w-[80%] h-[640px] flex flex-col justify-start items-center space-y-3  ">
        <div className={`w-[100%] h-[80px] ${trips.length > 0 ? "rounded-2xl" : "rounded-4xl"} border-2 border-gray-400 flex`}>
          <img
            src={hai}
            className="w-[9%] h-[70px] object-scale-down pt-4"
            alt=""
          />
          <h1 className="pt-6 text-2xl font-semibold">Welcome, User</h1>
        </div>
        <div className={`w-[100%] ${trips.length > 0 ? "h-[80px] rounded-2xl" : "h-[400px] rounded-4xl"}  border-2 space-y-3 flex flex-col border-gray-400 cursor-pointer`}>
          <div className={`w-[100%] h-[250px] ${trips.length > 0 ? "hidden" : "flex justify-center"}`}>
            <img
              src={user}
              className={`w-[20%] h-[250px] object-scale-down pt-5 ${trips.length > 0 && "hidden"}`}
              alt=""
            />
          </div>
          <div className={`w-[100%] h-[130px] flex ${!trips.length && "flex-col"} space-y-2 ${!trips.length ? "justify-center items-center" : "justify-start items-center space-x-5 "}`}>
            <button className={`${trips.length > 0 ? "h-[45px]" : "h-[50px]"} bg-blue-950 w-[15%] cursor-pointer text-white font-semibold text-md rounded-lg ${trips.length > 0 && "ml-3 "}`} onClick={() => {
              setUpload(true)
            }}>
              Upload Trip
            </button>
            <p className="text-sm text-gray-500">
              Upload the <strong className="underline">Excel</strong> sheet of
              your trip
            </p>
          </div>
        </div>
        <div className={`${!trips.length ? "hidden" : "h-[500px] w-[100%] space-y-2  flex flex-col"}`}>
          <div className={`w-[100%] flex justify-between items-center h-[40px] `}>
            <div className="w-[40%] h-full ">
              <h1 className="text-2xl font-semibold">Your Trips</h1>
            </div>
            <div className="w-[40%] h-full flex justify-end space-x-3 cursor-pointer">
              <button className="w-[25%] h-[35px] bg-white  text-gray-500 border-2 border-gray-400 rounded-md text-lg">Delete</button>
              <button className="w-[25%] h-[35px]   text-white bg-gray-500 border-2 border-gray-400 rounded-md text-lg  cursor-pointer" onClick={goToViewDetail} >Open</button>
            </div>
          </div>
          <div className="w-[100%] h-[370px]  flex flex-col  overflow-hidden ">
            {trips.length && trips.map((data, index) => (
              <>
                <div className="h-[100px] w-[100%] border-b-2 border-gray-300 flex  space-x-5 hover:bg-gray-100  ">
                  <div className="w-[2%] h-full flex justify-center items-center ">
                    <input type="checkbox" checked={selectedTrips.some((t) => t._id === data._id)} className=" w-full h-[20px]" onClick={() => {
                      onClickAddTrips(data)
                    }} />
                  </div>
                  <div className="h-full w-[90%] flex items-center space-x-1 text-start text-sm font-semibold ">
                    <h1> {data.tripName} </h1>

                  </div>
                </div>
              </>
            ))
            }

          </div>
          <div className="w-[100%] h-[30px]  flex justify-center space-x-2 cursor-pointer">
            <FaCaretLeft className="text-3xl text-gray-400 border-2 " />
            <h1 className="font-semibold w-[3%] text-center border-2 border-gray-500">{1}</h1>
            <FaCaretRight className="text-3xl border-2 text-gray-500" />

          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
