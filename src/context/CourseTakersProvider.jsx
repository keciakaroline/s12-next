import { createContext, useMemo } from "react";
import { useEffect, useState } from "react";
import { getAllocations } from "../api/getAllocations";

export const CourseTakersContext = createContext(undefined);

export const CourseTakersProvider = ({ children }) => {
  const [courseTakers, setCourseTakers] = useState(undefined);

  useEffect(() => {
    getAllocations().then((data) => setCourseTakers(data.data.data));
  }, []);

  const value = useMemo(
    () => ({
      courseTakers,
    }),
    [courseTakers]
  );

  return (
    <CourseTakersContext.Provider value={value}>
      {children}
    </CourseTakersContext.Provider>
  );
};
