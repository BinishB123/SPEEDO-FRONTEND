import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const HomeContext = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [upload, setUpload] = useState(false);

  return (
    <AppContext.Provider value={{ trips, setTrips, upload, setUpload }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
