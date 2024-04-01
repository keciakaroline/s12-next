import { useEffect } from "react";
import { useReservations } from "../../application/hooks/useReservations";
import { useViewState } from "../../application/hooks/useViewState";
import { Calendar } from "../../ui/components/Calendar";
import cx from "./Rooms.module.scss";
import { filterReservationsByRoom } from "../../domain/filterReservationsByRoom";

export const Rooms = () => {
  const { reservations, rooms, isLoading } = useReservations();
  const { viewState, goToRooms } = useViewState();

  const hasSelectedRoom = viewState.id !== undefined;

  useEffect(() => {
    if (isLoading || hasSelectedRoom) {
      return;
    }

    const [firstRoom] = rooms;
    goToRooms(firstRoom.id);
  }, [reservations, isLoading, hasSelectedRoom]);

  if (!hasSelectedRoom) {
    return <>Loading...</>;
  }

  const selectedRoomId = viewState.id;
  const selectedRoom = rooms.find((room) => room.id === selectedRoomId);
  const selectedRoomReservations = filterReservationsByRoom(
    reservations,
    selectedRoom
  );

  const calendarEntries = selectedRoomReservations.map((reservation) => ({
    id: reservation.id,
    title: reservation.student.name,
    dateStart: reservation.startDate,
    dateEnd: reservation.endDate,
    group: reservation.id,
  }));

  return (
    <>
      <div className={cx.placeSelectContainer}>
        <select
          value={viewState.id}
          onChange={(event) => goToRooms(Number(event.target.value))}
        >
          {rooms.map((room) => (
            <option
              key={room.id}
              value={room.id}
            >
              {room.number} - {room.name}
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
