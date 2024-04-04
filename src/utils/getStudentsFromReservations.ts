import type { Student, Reservation } from "../types/types";
import { uniqBy } from "lodash";

export const getStudentsFromReservations = (
  reservations: Reservation[]
): Student[] => {
  return uniqBy(
    reservations.map((reservation) => reservation.student),
    "id"
  );
};
