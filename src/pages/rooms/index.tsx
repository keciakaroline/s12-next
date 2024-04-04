import { GetServerSideProps } from "next";
import type { Reservation } from "@/types/types";
import { fetchReservations } from "@/infrastructure/inner/fetchReservations";
import { getRoomsFromReservations } from "@/utils/getRoomsFromReservations";

export const getServerSideProps: GetServerSideProps = async () => {
  const reservations: Reservation[] = await fetchReservations();
  const [firstRoom] = getRoomsFromReservations(reservations);

  return {
    redirect: {
      destination: `/rooms/${firstRoom.id}`,
      permanent: false,
    },
  };
};

const Rooms = () => {
  return <></>;
};

export default Rooms;
