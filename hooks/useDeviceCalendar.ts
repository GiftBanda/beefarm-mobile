import dayjs from "dayjs";
import * as Calendar from "expo-calendar";

export async function getCalendarEventsForMonth(month: dayjs.Dayjs) {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  if (status !== "granted") return [];

  const calendars = await Calendar.getCalendarsAsync(
    Calendar.EntityTypes.EVENT
  );

  const defaultCalendar =
    calendars.find((c) => c.allowsModifications) || calendars[0];

  if (!defaultCalendar) return [];

  const start = month.startOf("month").toDate();
  const end = month.endOf("month").toDate();

  const events = await Calendar.getEventsAsync(
    [defaultCalendar.id],
    start,
    end
  );

  return events.map((e) => ({
    id: e.id,
    title: e.title,
    date: dayjs(e.startDate).format("YYYY-MM-DD"),
  }));
}
