import React, { useState, ReactNode, useEffect } from "react";
import { privateAxios } from "../api/api";

const SharedDataContext = React.createContext<{
  programs: any[];
  residents: any[];
  appendResident: (value: any) => null | void;
  appendProgram: (value: any) => null | void;
  updateAttendance: (
    programId: number | undefined,
    residentId: number | undefined,
    status: string | undefined
  ) => null | void;
}>({
  programs: [],
  residents: [],
  appendResident: () => null,
  appendProgram: () => null,
  updateAttendance: () => null,
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

  const updateAttendance = (
    programId: number | undefined,
    residentId: number | undefined,
    status: string | undefined
  ) => {
    const updatedResidents = residents.map((resident: any) => {
      if (resident.id === residentId) {
        return {
          ...resident,
          attendance: [
            ...resident.attendance,
            {
              programId,
              residentId,
              status,
            },
          ],
        };
      }

      return resident;
    });

    const updatedPrograms = programs.map((program: any) => {
      if (program.id === programId) {
        return {
          ...program,
          attendance: [
            ...program.attendance,
            {
              programId,
              residentId,
              status,
            },
          ],
        };
      }

      return program;
    });

    setResidents(updatedResidents);
    setPrograms(updatedPrograms);
  };

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
      value={{
        residents,
        programs,
        appendResident,
        appendProgram,
        updateAttendance,
      }}
    >
      {children}
    </SharedDataContext.Provider>
  );
};

export default SharedDataContext;
export { SharedDataProvider };
