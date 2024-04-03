import { useReservations } from "@/application/hooks/useReservations";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const Students = () => {
  const { students, isLoading } = useReservations();
  const router = useRouter();

  const initialize = (isLoading: boolean) => {
    if (isLoading || !students) {
      return;
    }

    const [firstStudent] = students;
    router.replace(`/students/${firstStudent.id}`);
  };

  const initializeRef = useRef(initialize);
  initializeRef.current = initialize;

  useEffect(() => {
    initializeRef.current(isLoading);
  }, [isLoading]);
};

export default Students;
