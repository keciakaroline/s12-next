import { GetServerSideProps } from "next";
import type { Reservation } from "@/types/types";
import { fetchReservations } from "@/infrastructure/inner/fetchReservations";
import { getStudentsFromReservations } from "@/utils/getStudentsFromReservations";

export const getServerSideProps: GetServerSideProps = async () => {
  const reservations: Reservation[] = await fetchReservations();
  const [firstStudent] = getStudentsFromReservations(reservations);

  return {
    redirect: {
      destination: `/students/${firstStudent.id}`,
      permanent: false,
    },
  };
};

const Students = () => {
  return <> </>;
};

export default Students;
