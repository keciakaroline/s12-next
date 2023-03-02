import { createContext, useMemo } from "react";
import { useEffect, useState } from "react";
import { fetchReservations } from "../../infrastructure/inner/fetchReservations";

export const ReservationsContext = createContext(undefined);

export const ReservationsProvider = ({ children }) => {
  const [reservations, setReservations] = useState(undefined);

  useEffect(() => {
    fetchReservations().then((data) => setReservations(data));
  }, []);

  const value = useMemo(
    () => ({
      reservations,
    }),
    [reservations]
  );

  return (
    <ReservationsContext.Provider value={value}>
      {children}
    </ReservationsContext.Provider>
  );
};
