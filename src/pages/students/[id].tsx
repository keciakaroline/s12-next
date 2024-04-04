import { Calendar } from "../../ui/components/Calendar";
import cx from "./Students.module.scss";
import { filterReservationsByStudent } from "../../domain/filterReservationsByStudent";
import { useParams, useRouter } from "next/navigation";
import type {
  Reservation,
  SerializedReservation,
  Student,
} from "@/types/types";
import { GetServerSideProps } from "next";
import { getStudentsFromReservations } from "@/utils/getStudentsFromReservations";
import { fetchReservations } from "@/infrastructure/inner/fetchReservations";

export const getServerSideProps: GetServerSideProps = async () => {
  const reservations: Reservation[] = await fetchReservations();
  const students = getStudentsFromReservations(reservations);
  const serializedReservations: SerializedReservation[] = reservations.map(
    (reservation) => ({
      ...reservation,
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
    })
  );

  return {
    props: { students, serializedReservations },
  };
};

type StudentProps = {
  serializedReservations: SerializedReservation[];
  students: Student[];
};

const Student = ({ students, serializedReservations }: StudentProps) => {
  const router = useRouter();
  const params = useParams();

  const reservations = serializedReservations.map((reservation) => ({
    ...reservation,
    startDate: new Date(reservation.startDate),
    endDate: new Date(reservation.endDate),
  }));

  const [firstStudent] = students;

  if (!firstStudent) {
    return <>No students available</>;
  }

  if (!students.some((student) => student.id.toString() === params.id)) {
    router.replace(`/students/${firstStudent.id}`);
    return;
  }

  const selectedStudentId = params.id;
  const selectedStudent = students.find(
    (courseTaker) => courseTaker.id.toString() === params.id
  );
  const selectedStudentReservations: Reservation[] =
    filterReservationsByStudent(reservations, selectedStudent);

  const entries = selectedStudentReservations.map((reservation) => ({
    id: reservation.id.toString(),
    title: `${reservation.room.number} - ${reservation.room.name}`,
    dateStart: reservation.startDate,
    dateEnd: reservation.endDate,
    group: reservation.id.toString(),
  }));

  return (
    <>
      <div className={cx.placeSelectContainer}>
        <select
          value={selectedStudentId}
          onChange={(event) =>
            router.push(`/students/${Number(event.target.value)}`)
          }
        >
          {students.map((student) => (
            <option
              key={student.id}
              value={student.id}
            >
              {student.name}
            </option>
          ))}
        </select>
      </div>

      <div className={cx.calendarContainer}>
        <Calendar entries={entries} />
      </div>
    </>
  );
};

export default Student;
