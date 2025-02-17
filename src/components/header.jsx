import { IoMdSpeedometer } from "react-icons/io";

function Header() {
  return (
    <>
      <div className="w-[100%]  h-[80px] shadow-md flex justify-center">
        <div className="w-[95%] flex pt-3">
          <IoMdSpeedometer className="text-6xl"></IoMdSpeedometer>
          <h1 className="font-squad text-xl pt-5">Speedo</h1>
        </div>
      </div>
    </>
  );
}

export default Header;
