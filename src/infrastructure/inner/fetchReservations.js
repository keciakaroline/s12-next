import { addMinutes } from "date-fns";
import { getAllocations } from "../outer/api/getAllocations";

export const fetchReservations = async () => {
  const response = await getAllocations();

  const courseTakers = response.data.data;
  const allocations = courseTakers.flatMap((courseTaker) => courseTaker.allocs);

  return mapAllocationsToReservations(allocations, courseTakers);
};

const mapAllocationsToReservations = (allocations, courseTakers) =>
  allocations.map((alloc) => ({
    id: alloc.id,
    startDate: new Date(alloc.date),
    endDate: addMinutes(new Date(alloc.date), alloc.type === 0 ? 30 : 60),
    room: mapPlaceToRoom(alloc.place),
    student: mapCourseTakerToStudent(
      courseTakers.find((courseTaker) =>
        courseTaker.allocs.some(
          (courseTakerAlloc) => courseTakerAlloc.id === alloc.id
        )
      )
    ),
  }));

const mapPlaceToRoom = (place) => ({
  id: place.id,
  name: place.name,
  number: place.num,
});

const mapCourseTakerToStudent = (courseTaker) => ({
  id: courseTaker.id,
  name: courseTaker.name,
});
