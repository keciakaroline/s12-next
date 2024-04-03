export type RoomType = {
  id: string | number;
  name: string;
  number: string;
};

export type Reservation = {
  id: string | number;
  startDate: string;
  endDate: string;
  student: {
    name: string;
  };
  group: string;
  title: string;
};
