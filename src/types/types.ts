export type Room = {
  id: number;
  name: string;
  number: number;
};

export type Student = {
  id: number;
  name: string;
};

export type Reservation = {
  id: number;
  startDate: Date;
  endDate: Date;
  room: Room;
  student: Student;
};

export type SerializedReservation = Omit<
  Reservation,
  "startDate" | "endDate"
> & {
  startDate: string;
  endDate: string;
};

export type FragilityLevel = 1 | 2 | 3 | 4 | 5;

export type InventoryItem = {
  id: number;
  type: string;
  brand: string;
  model: string;
  fragility: FragilityLevel;
  lastMaintenance: Date;
  sector: string;
};

export type SerializedInventoryItem = Omit<InventoryItem, "lastMaintenance"> & {
  lastMaintenance: string;
};
