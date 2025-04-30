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

export function calculateTimeDifference(dateString?: string) {
  if (!dateString) return undefined;

  const currentTime = DateTime.utc();
  const targetTime = DateTime.fromISO(dateString);
  const diff = targetTime
    .diff(currentTime, ["days", "hours", "minutes"])
    .toObject();

  return {
    days: Math.max(0, Math.floor(diff.days || 0)),
    hours: Math.max(0, Math.floor(diff.hours || 0)),
    minutes: Math.max(0, Math.floor(diff.minutes || 0)),
  };
}
