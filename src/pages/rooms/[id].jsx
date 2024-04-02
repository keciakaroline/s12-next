import { useEffect } from "react";
import { useReservations } from "../../application/hooks/useReservations";
import { Calendar } from "../../ui/components/Calendar";
import cx from "./index.module.scss";
import { filterReservationsByRoom } from "../../domain/filterReservationsByRoom";
import { useParams, useRouter } from "next/navigation";

const Rooms = () => {
  const { reservations, rooms, isLoading } = useReservations();
  const router = useRouter();
  const params = useParams();

  const hasSelectedRoom = params.id !== undefined;

  // let hasSelectedRoom = false;
  // if (params) {
  //   hasSelectedRoom = params.id !== undefined;
  // }

  useEffect(() => {
    if (isLoading || hasSelectedRoom) {
      return;
    }

    const [firstRoom] = rooms;

    router.replace(`/rooms/${firstRoom.id}`);
  }, [reservations, isLoading, hasSelectedRoom]);

  if (!hasSelectedRoom) {
    return <>Loading...</>;
  }

  const selectedRoomId = params.id;
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
          value={selectedRoomId}
          onChange={(event) =>
            router.push(`/rooms/${Number(event.target.value)}`)
          }
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

export default Rooms;
