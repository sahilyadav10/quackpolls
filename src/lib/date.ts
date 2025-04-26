import { DateTime } from "luxon";

export function convertLocalToUtcString(dateString: Date) {
  return DateTime.fromJSDate(dateString)
    .setZone("local")
    .toUTC()
    .toFormat("yyyy-MM-dd'T'HH:mm:ss");
}

export const isPollActive = (closesAt: string): boolean => {
  const currentTime = DateTime.utc();
  const closeTime = DateTime.fromISO(closesAt);
  return currentTime < closeTime;
};
