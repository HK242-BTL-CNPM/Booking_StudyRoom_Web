import { rooms } from "./const_room";

export const csOptions = [
  { label: "CS1", value: "CS1" },
  { label: "CS2", value: "CS2" },
];

export const toaOptionsByCs: Record<
  string,
  { label: string; value: string }[]
> = {
  CS1: [
    { label: "B1", value: "B1" },
    { label: "B3", value: "B3" },
  ],
  CS2: [
    { label: "H1", value: "H1" },
    { label: "H3", value: "H3" },
  ],
};

// export const phongOptionsByCs: Record<
//   string,
//   { label: string; value: string }[]
// > = {
//   B1: [
//     { label: "B1-02", value: "B1-02" },
//     { label: "B1-03", value: "B1-03" },
//     { label: "B1-04", value: "B1-04" },
//     { label: "B1-05", value: "B1-05" },
//     { label: "B1-06", value: "B1-06" },
//     { label: "B1-07", value: "B1-07" },
//     { label: "B1-08", value: "B1-08" },
//     { label: "B1-09", value: "B1-09" },
//   ],
//   B3: [
//     { label: "B3-02", value: "B3-02" },
//     { label: "B3-03", value: "B3-03" },
//     { label: "B3-04", value: "B3-04" },
//     { label: "B3-05", value: "B3-05" },
//     { label: "B3-06", value: "B3-06" },
//     { label: "B3-07", value: "B3-07" },
//     { label: "B3-08", value: "B3-08" },
//     { label: "B3-09", value: "B3-09" },
//   ],
//   H1: [
//     { label: "H1-02", value: "H1-02" },
//     { label: "H1-03", value: "H1-03" },
//     { label: "H1-04", value: "H1-04" },
//     { label: "H1-05", value: "H1-05" },
//     { label: "H1-06", value: "H1-06" },
//     { label: "H1-07", value: "H1-07" },
//     { label: "H1-08", value: "H1-08" },
//     { label: "H1-09", value: "H1-09" },
//   ],
//   H3: [
//     { label: "H3-02", value: "H3-02" },
//     { label: "H3-03", value: "H3-03" },
//     { label: "H3-04", value: "H3-04" },
//     { label: "H3-05", value: "H3-05" },
//     { label: "H3-06", value: "H3-06" },
//     { label: "H3-07", value: "H3-07" },
//     { label: "H3-08", value: "H3-08" },
//     { label: "H3-09", value: "H3-09" },
//   ],
// };
export const phongOptionsByCs: Record<string, { label: string; value: string }[]> = {
  B1: rooms
    .filter((room) => room.roomNumber.startsWith("B1"))
    .map((room) => ({
      label: room.roomNumber,
      value: room.roomNumber,
    })),
  B3: rooms
    .filter((room) => room.roomNumber.startsWith("B3"))
    .map((room) => ({
      label: room.roomNumber,
      value: room.roomNumber,
    })),
  H1: rooms
    .filter((room) => room.roomNumber.startsWith("H1"))
    .map((room) => ({
      label: room.roomNumber,
      value: room.roomNumber,
    })),
  H3: rooms
    .filter((room) => room.roomNumber.startsWith("H3"))
    .map((room) => ({
      label: room.roomNumber,
      value: room.roomNumber,
    })),
};