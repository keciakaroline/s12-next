import { createContext, useMemo } from "react";
import { useEffect, useState } from "react";
import { fetchReservations } from "../../infrastructure/inner/fetchReservations";
import { ReactNode } from "react";
import type { Reservation } from "../../types/types";

export const ReservationsContext = createContext<
  { reservations: Reservation[] } | undefined
>(undefined);

export const ReservationsProvider = ({ children }: { children: ReactNode }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

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
