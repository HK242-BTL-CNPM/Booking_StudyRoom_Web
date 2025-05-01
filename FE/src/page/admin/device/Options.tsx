import { devices } from "./const_device";

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


export const phongOptionsByCs: Record<string, { label: string; value: string }[]> = {
  B1: devices
    .filter((room) => room.roomNumber.startsWith("B1"))
    .map((room) => ({
      label: room.roomNumber,
      value: room.roomNumber,
    })),
  B3: devices
    .filter((room) => room.roomNumber.startsWith("B3"))
    .map((room) => ({
      label: room.roomNumber,
      value: room.roomNumber,
    })),
  H1: devices
    .filter((room) => room.roomNumber.startsWith("H1"))
    .map((room) => ({
      label: room.roomNumber,
      value: room.roomNumber,
    })),
  H3: devices
    .filter((room) => room.roomNumber.startsWith("H3"))
    .map((room) => ({
      label: room.roomNumber,
      value: room.roomNumber,
    })),
};
export const deviceOptionsByToa: Record<string, { label: string; value: string }[]> = {
  B1: devices
    .filter((device) => device.toa === "B1")
    .map((device) => ({
      label: `${device.roomNumber} - ${device.devices}`,
      value: device.roomNumber,
    })),
  B3: devices
    .filter((device) => device.toa === "B3")
    .map((device) => ({
      label: `${device.roomNumber} - ${device.devices}`,
      value: device.roomNumber,
    })),
  H1: devices
    .filter((device) => device.toa === "H1")
    .map((device) => ({
      label: `${device.roomNumber} - ${device.devices}`,
      value: device.roomNumber,
    })),
  H3: devices
    .filter((device) => device.toa === "H3")
    .map((device) => ({
      label: `${device.roomNumber} - ${device.devices}`,
      value: device.roomNumber,
    })),
};
export const phongOptionsByToa: Record<string, { label: string; value: string }[]> = {
  B1: devices
    .filter((device) => device.toa === "B1")
    .map((device) => ({
      label: device.roomNumber,
      value: device.roomNumber,
    })),
  B3: devices
    .filter((device) => device.toa === "B3")
    .map((device) => ({
      label: device.roomNumber,
      value: device.roomNumber,
    })),
  H1: devices
    .filter((device) => device.toa === "H1")
    .map((device) => ({
      label: device.roomNumber,
      value: device.roomNumber,
    })),
  H3: devices
    .filter((device) => device.toa === "H3")
    .map((device) => ({
      label: device.roomNumber,
      value: device.roomNumber,
    })),
};