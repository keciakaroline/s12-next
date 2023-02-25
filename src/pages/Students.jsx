import { useCourseTakers } from "../hooks/useCourseTakers";
import { useViewState } from "../hooks/useViewState";
import { useEffect } from "react";
import { Calendar } from "../components/Calendar";
import cx from "./Students.module.scss";
import { addMinutes } from "date-fns";

export const Students = () => {
  const { courseTakers, isLoading } = useCourseTakers();

  const { viewState, goToStudents } = useViewState();

  const hasSelectedCourseTaker = viewState.id !== undefined;
  useEffect(() => {
    if (isLoading || hasSelectedCourseTaker) {
      return;
    }

    goToStudents(courseTakers[0].id);
  }, [courseTakers, isLoading]);

  if (!hasSelectedCourseTaker) {
    return <>Loading...</>;
  }

  const selectedCourseTaker = courseTakers.find(
    (courseTaker) => courseTaker.id === viewState.id
  );
  const allocations = selectedCourseTaker.allocs;
  const entries = allocations.map((alloc) => ({
    id: alloc.id,
    title: `${alloc.place.num} - ${alloc.place.name}`,
    dateStart: new Date(alloc.date),
    dateEnd: addMinutes(new Date(alloc.date), alloc.type === 0 ? 30 : 60),
    group: alloc.id,
  }));

  return (
    <>
      <div className={cx.placeSelectContainer}>
        <select
          value={viewState.id}
          onChange={(event) => goToStudents(Number(event.target.value))}
        >
          {courseTakers.map((courseTaker) => (
            <option key={courseTaker.id} value={courseTaker.id}>
              {courseTaker.name}
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
