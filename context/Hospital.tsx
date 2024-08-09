import { IHospital } from "@/interface/hospital";
import fetch from "@/utils/fetch";
import React from "react";

interface HospitalContextProps {
  listHospital: IHospital[] | null;
  setListHospital: React.Dispatch<React.SetStateAction<IHospital[] | null>>;
  loadingListHospital: boolean;
  setLoadingListHospital: React.Dispatch<React.SetStateAction<boolean>>;
  fetchListHospital: () => {};
  findHospitalByName: (name: string) => IHospital | null;
}

const HospitalContext = React.createContext<HospitalContextProps | undefined>(
  undefined
);

export const useHospitalContext = () => {
  const context = React.useContext(HospitalContext);
  if (!context) {
    throw new Error(
      "useHospitalContext must be used within a HospitalProvider"
    );
  }
  return context;
};

const HospitalProvider = ({ children }: { children: React.ReactNode }) => {
  const [listHospital, setListHospital] = React.useState<IHospital[] | null>(
    null
  );
  const [loadingListHospital, setLoadingListHospital] =
    React.useState<boolean>(false);

  const fetchListHospital = async () => {
    if (!loadingListHospital) {
      setLoadingListHospital(true);

      try {
        const res = await fetch<IHospital[]>({
          url: `/api/id/covid19/hospitals`,
          method: "GET",
        });
        setListHospital(res);
      } catch (error) {
        setListHospital(null);
      } finally {
        setLoadingListHospital(false);
      }
    }
  };

  const findHospitalByName = (name: string): IHospital | null => {
    if (listHospital && listHospital?.length > 0) {
      return listHospital.find((hospital) => hospital.name === name) || null;
    }
    return null;
  };

  return (
    <HospitalContext.Provider
      value={{
        listHospital,
        setListHospital,
        loadingListHospital,
        setLoadingListHospital,
        fetchListHospital,
        findHospitalByName,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export default HospitalProvider;
