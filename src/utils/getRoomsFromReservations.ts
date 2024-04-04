import { uniqBy } from "lodash";
import type { Room, Reservation } from "../types/types";

export const getRoomsFromReservations = (
  reservations: Reservation[]
): Room[] => {
  return uniqBy(
    reservations.map((reservation) => reservation.room),
    "id"
  );
};
