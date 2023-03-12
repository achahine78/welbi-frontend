import React, { useState, ReactNode, useEffect } from "react";
import { privateAxios } from "../api/api";

const SharedDataContext = React.createContext<{
  programs: any[];
  residents: any[];
  appendResident: (value: any) => null | void;
  appendProgram: (value: any) => null | void;
}>({
  programs: [],
  residents: [],
  appendResident: () => null,
  appendProgram: () => null,
});

type Props = {
  children: ReactNode;
};

const SharedDataProvider = ({ children }: Props) => {
  const [residents, setResidents] = useState<any>([]);
  const [programs, setPrograms] = useState<any>([]);

  const appendResident = (newResident: any) =>
    setResidents([...residents, newResident]);
  const appendProgram = (newProgram: any) =>
    setPrograms([...programs, newProgram]);

  useEffect(() => {
    privateAxios.get("/residents").then(({ data }) => {
      setResidents(data);
    });
    privateAxios.get("/programs").then(({ data }) => {
      setPrograms(data);
    });
  }, []);

  return (
    <SharedDataContext.Provider
      value={{ residents, programs, appendResident, appendProgram }}
    >
      {children}
    </SharedDataContext.Provider>
  );
};

export default SharedDataContext;
export { SharedDataProvider };
