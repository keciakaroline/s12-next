import { useReservations } from "@/application/hooks/useReservations";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const Rooms = () => {
  const { rooms, isLoading } = useReservations();
  const router = useRouter();

  const initialize = (isLoading: boolean) => {
    if (isLoading || !rooms) {
      return;
    }

    const [firstRoom] = rooms;
    router.replace(`/rooms/${firstRoom.id}`);
  };

  const initializeRef = useRef(initialize);
  initializeRef.current = initialize;

  useEffect(() => {
    initializeRef.current(isLoading);
  }, [isLoading]);
};

export default Rooms;
