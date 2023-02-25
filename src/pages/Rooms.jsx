import { useEffect } from "react";
import { useCourseTakers } from "../hooks/useCourseTakers";
import { useViewState } from "../hooks/useViewState";
import { addMinutes } from "date-fns";
import { Calendar } from "../components/Calendar";
import cx from "./Rooms.module.scss";

export const Rooms = () => {
  const { courseTakers, isLoading } = useCourseTakers();
  const { viewState, goToRooms } = useViewState();

  const hasSelectedRoom = viewState.id !== undefined;

  useEffect(() => {
    if (isLoading || hasSelectedRoom) {
      return;
    }

    const firstAllocation = findFirstAllocation(courseTakers);

    goToRooms(firstAllocation.place.id);
  }, [courseTakers, isLoading, hasSelectedRoom]);

  if (!hasSelectedRoom) {
    return <>Loading...</>;
  }

  const selectedPlaceId = viewState.id;
  const selectedPlace = findPlace(courseTakers, selectedPlaceId);
  const selectedPlaceAllocations = aggregateSelectedPlaceAllocations(
    courseTakers,
    selectedPlaceId
  );
  const calendarEntries = selectedPlaceAllocations.map((alloc) => ({
    id: alloc.id,
    title: findStudent(courseTakers, alloc.id).name,
    dateStart: new Date(alloc.date),
    dateEnd: addMinutes(new Date(alloc.date), alloc.type === 0 ? 30 : 60),
    group: alloc.id,
  }));
  const places = getPlaces(courseTakers);

  return (
    <>
      <div className={cx.placeSelectContainer}>
        <select
          value={viewState.id}
          onChange={(event) => goToRooms(Number(event.target.value))}
        >
          {places.map((place) => (
            <option key={place.id} value={place.id}>
              {place.num} - {place.name}
            </option>
          ))}
        </select>
      </div>

      <div className={cx.calendarContainer}>
        <Calendar entries={calendarEntries} />
      </div>
    </>
  );
};

const findFirstAllocation = (courseTakers) => {
  for (const courseTaker of courseTakers) {
    if (courseTaker.allocs[0]) {
      return courseTaker.allocs[0];
    }
  }
};

const findPlace = (courseTakers, placeId) => {
  for (const courseTaker of courseTakers) {
    const allocation = courseTaker.allocs.find(
      (alloc) => alloc.place.id === placeId
    );

    if (allocation) {
      return allocation.place;
    }
  }
};

const aggregateSelectedPlaceAllocations = (courseTakers, placeId) => {
  const actualReservations = [];

  for (const courseTaker of courseTakers) {
    for (const allocation of courseTaker.allocs) {
      if (allocation.place.id === placeId) {
        actualReservations.push(allocation);
      }
    }
  }

  return actualReservations;
};

const getPlaces = (courseTakers) => {
  const places = {};

  for (const courseTaker of courseTakers) {
    for (const alloc of courseTaker.allocs) {
      if (!places[alloc.place.id]) {
        places[alloc.place.id] = alloc.place;
      }
    }
  }

  return Object.values(places);
};

const findStudent = (courseTakers, reservationId) => {
  return courseTakers.find((courseTaker) =>
    courseTaker.allocs.some((allocation) => allocation.id === reservationId)
  );
};
