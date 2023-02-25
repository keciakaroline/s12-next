import { wait } from "../utils/wait";
import { random, sample } from "lodash";
import { faker } from "@faker-js/faker";
import {
  addHours,
  format,
  subYears,
  setYear,
  setMinutes,
  setSeconds,
  setMilliseconds,
  setHours,
  getHours,
} from "date-fns";
import RandExp from "randexp";

export const getAllocations = async () => {
  await wait(1000);

  return {
    status: 200,
    statusText: "Ok",
    redirected: false,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      data: Array.from({ length: 10 }).map(createCourseTaker),
    },
  };
};

const specialties = [
  {
    id: 1,
    name: "Piano Popular",
  },
  {
    id: 2,
    name: "Violino",
  },
  {
    id: 3,
    name: "Canto Erudito",
  },
  {
    id: 4,
    name: "Canto Popular",
  },
  {
    id: 5,
    name: "Piano Erudito",
  },
  {
    id: 6,
    name: "Violão Popular",
  },
  {
    id: 7,
    name: "Violão Erudito",
  },
  {
    id: 8,
    name: "Violoncelo",
  },
];

const places = [
  {
    id: 1,
    num: 13,
    name: "Sala 13",
    cap: 5,
    created_at: "1996-07-11T20:51:00.220Z",
    updated_at: "1996-07-11T20:51:00.220Z",
    deleted_at: null,
  },
  {
    id: 2,
    num: 25,
    name: "Paes Nunes",
    cap: 60,
    created_at: "1996-07-11T20:51:00.220Z",
    updated_at: "1996-07-11T20:51:00.220Z",
    deleted_at: null,
  },
  {
    id: 3,
    num: 30,
    name: "Estúdio",
    cap: 5,
    created_at: "1996-07-11T20:51:00.220Z",
    updated_at: "1996-07-11T20:51:00.220Z",
    deleted_at: null,
  },
  {
    id: 4,
    num: 41,
    name: "Sala 41",
    cap: 30,
    created_at: "1996-07-11T20:51:00.220Z",
    updated_at: "1996-07-11T20:51:00.220Z",
    deleted_at: null,
  },
  {
    id: 5,
    num: 33,
    name: "Sala 33",
    cap: 10,
    created_at: "1996-07-11T20:51:00.220Z",
    updated_at: "1996-07-11T20:51:00.220Z",
    deleted_at: null,
  },
  {
    id: 6,
    num: 14,
    name: "Sala 14",
    cap: 12,
    created_at: "1996-07-11T20:51:00.220Z",
    updated_at: "1996-07-11T20:51:00.220Z",
    deleted_at: null,
  },
];

const createAllocation = () => {
  const creationDate = addHours(new Date(), random(0, 15 * 24));
  const bookingDate = addHours(
    setHours(setMinutes(setSeconds(setMilliseconds(new Date(), 0), 0), 0), 0),
    random(2 * 7 * 24) / 2
  );

  return {
    id: random(1, 100000000),
    system: sample(["website", "app"]),
    date: bookingDate.toISOString(),
    type: sample([0, 1]),
    place: sample(places),
    created_at: creationDate.toISOString(),
    updated_at: creationDate.toISOString(),
    deleted_at: null,
  };
};

const createCourseTaker = () => {
  const age = random(20, 30);
  const enrollmentYear = random(2013, 2022);

  return {
    id: random(1, 100000),
    course_taker_id: random(100000, 500000).toString(),
    name: faker.name.fullName(),
    age: random(20, 30),
    extended_hours_permission: sample(["yes", "no"]),
    address: {
      state: faker.address.state(),
      city: faker.address.city(),
      zip_code: faker.address.zipCode(),
      number: faker.address.buildingNumber(),
    },
    phone_number: faker.phone.number(),
    birth_date: format(subYears(new Date(), age), "d/MM/yyyy"),
    rg: new RandExp(/\d\d.\d\d\d.\d\d\d-\d\d/).gen(),
    courses: [
      {
        id: 55,
        name: "Music",
        catalogue: 70,
        specialties: [sample(specialties)],
        created_at: "1995-02-11T20:51:00.220Z",
        updated_at: "1995-02-11T20:51:00.220Z",
        deleted_at: null,
      },
    ],
    allocs: Array.from({ length: random(10, 100) })
      .map(createAllocation)
      .filter((e) => {
        return getHours(new Date(e.date)) < 23;
      }),
    enrollment_year: enrollmentYear,
    created_at: setYear(new Date(), enrollmentYear).toISOString(),
    updated_at: setYear(new Date(), enrollmentYear).toISOString(),
    deleted_at: null,
  };
};
