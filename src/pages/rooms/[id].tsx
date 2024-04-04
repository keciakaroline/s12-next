import { useReservations } from "../../application/hooks/useReservations";
import { Calendar } from "../../ui/components/Calendar";
import cx from "./Rooms.module.scss";
import { filterReservationsByRoom } from "../../domain/filterReservationsByRoom";
import { useParams, useRouter } from "next/navigation";
import { Reservation, SerializedReservation, Room } from "@/types/types";
import { GetServerSideProps } from "next";
import { fetchReservations } from "@/infrastructure/inner/fetchReservations";
import { getRoomsFromReservations } from "@/utils/getRoomsFromReservations";

export const getServerSideProps: GetServerSideProps = async () => {
  const reservations: Reservation[] = await fetchReservations();
  const rooms = getRoomsFromReservations(reservations);
  const serializedReservations: SerializedReservation[] = reservations.map(
    (reservation) => ({
      ...reservation,
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
    })
  );

  return {
    props: { rooms, serializedReservations },
  };
};

type RoomProps = {
  serializedReservations: SerializedReservation[];
  rooms: Room[];
};

const Room = ({ serializedReservations, rooms }: RoomProps) => {
  const router = useRouter();
  const params = useParams();

  const reservations = serializedReservations.map((reservation) => ({
    ...reservation,
    startDate: new Date(reservation.startDate),
    endDate: new Date(reservation.endDate),
  }));

  if (!reservations || !rooms || rooms.length === 0) {
    return <>Loading...</>;
  }

  const [firstRoom] = rooms;

  if (!firstRoom) {
    return <>No rooms available</>;
  }

  if (!rooms.some((room) => room.id.toString() === params.id)) {
    router.replace(`/rooms/${firstRoom.id}`);
    return;
  }

  const selectedRoomId = params.id as string;
  const selectedRoom = rooms.find(
    (room) => room.id.toString() === selectedRoomId
  );
  const selectedRoomReservations: Reservation[] = filterReservationsByRoom(
    reservations,
    selectedRoom
  );

  const calendarEntries = selectedRoomReservations.map((reservation) => ({
    id: reservation.id.toString(),
    title: reservation.student.name,
    dateStart: reservation.startDate,
    dateEnd: reservation.endDate,
    group: reservation.id.toString(),
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
