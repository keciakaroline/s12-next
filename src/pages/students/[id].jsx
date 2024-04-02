import { useReservations } from "../../application/hooks/useReservations";
import { Calendar } from "../../ui/components/Calendar";
import cx from "./index.module.scss";
import { filterReservationsByStudent } from "../../domain/filterReservationsByStudent";
import { useParams, useRouter } from "next/navigation";

const Student = () => {
  const { reservations, students } = useReservations();
  const router = useRouter();
  const params = useParams();

  if (!reservations || !students) {
    return <>Loading...</>;
  }

  const [firstStudent] = students;
  if (!students.some((student) => student.id.toString() === params.id)) {
    router.replace(`/students/${firstStudent.id}`);
    return;
  }

  const selectedStudent = students.find(
    (courseTaker) => courseTaker.id === params.id
  );
  const selectedStudentReservations = filterReservationsByStudent(
    reservations,
    selectedStudent
  );

  const entries = selectedStudentReservations.map((reservation) => ({
    id: reservation.id,
    title: `${reservation.room.number} - ${reservation.room.name}`,
    dateStart: reservation.startDate,
    dateEnd: reservation.endDate,
    group: reservation.id,
  }));

  return (
    <>
      <div className={cx.placeSelectContainer}>
        <select
          value={params.id}
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
