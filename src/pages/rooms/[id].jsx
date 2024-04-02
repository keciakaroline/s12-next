import { useReservations } from "../../application/hooks/useReservations";
import { Calendar } from "../../ui/components/Calendar";
import cx from "./index.module.scss";
import { filterReservationsByRoom } from "../../domain/filterReservationsByRoom";
import { useParams, useRouter } from "next/navigation";

const Room = () => {
  const { reservations, rooms } = useReservations();
  const router = useRouter();
  const params = useParams();

  if (!reservations || !rooms) {
    return <>Loading...</>;
  }

  const [firstRoom] = rooms;

  if (!rooms.some((room) => room.id.toString() === params.id)) {
    router.replace(`/rooms/${firstRoom.id}`);
    return;
  }

  const selectedRoomId = params.id;
  const selectedRoom = rooms.find(
    (room) => room.id.toString() === selectedRoomId
  );
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

export default Room;
