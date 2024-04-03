import { uniqBy } from "lodash";
import { useContext } from "react";
import { ReservationsContext } from "../providers/ReservationsProvider";
import type { Student, Room, Reservation } from "../../types/types.ts";

export const useReservations = () => {
  const value = useContext(ReservationsContext);

  if (value === undefined) {
    throw new Error("You forgot ReservationsProvider!");
  }

  const { reservations } = value;

  const students: Student[] | undefined = reservations
    ? uniqBy(
        reservations.map((reservation: Reservation) => reservation.student),
        "id"
      )
    : undefined;
  const rooms: Room[] | undefined = reservations
    ? uniqBy(
        reservations.map((reservation: Reservation) => reservation.room),
        "id"
      )
    : undefined;

  const isLoading = reservations === undefined;

  return {
    reservations,
    students,
    rooms,
    isLoading,
  };
};
