import { useContext } from "react";
import { CourseTakersContext } from "../context/CourseTakersProvider";

export const useCourseTakers = () => {
  const value = useContext(CourseTakersContext);

  if (value === undefined) {
    throw new Error("You forgot ReservationsProvider!");
  }

  const { courseTakers } = value;

  const isLoading = courseTakers === undefined;

  return {
    courseTakers,
    isLoading,
  };
};
