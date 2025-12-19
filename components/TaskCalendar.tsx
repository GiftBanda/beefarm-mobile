import { useTaskCalendar } from "@/hooks/useTaskCalendar";
import dayjs from "dayjs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";

type Task = {
  id: string;
  title: string;
  due_date: string;
};

export default function TaskCalendar() {
    const {
    currentMonth,
    setCurrentMonth,
    tasks,
    markedDates,
    selectedDate,
    setSelectedDate,
    view,
    setView,
    agendaItems,
    tasksForSelectedDay,
  } = useTaskCalendar();

  return (
    <View style={styles.container}>
      {/* View Toggle */}
      <View style={styles.toggle}>
        <TouchableOpacity onPress={() => setView("calendar")}>
          <Text style={[styles.toggleBtn, view === "calendar" && styles.active]}>
            Calendar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setView("agenda")}>
          <Text style={[styles.toggleBtn, view === "agenda" && styles.active]}>
            Agenda
          </Text>
        </TouchableOpacity>
      </View>

      {/* CALENDAR VIEW */}
      {view === "calendar" && (
        <>
          <Calendar
            current={currentMonth.format("YYYY-MM-DD")}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            onMonthChange={(month) =>
              setCurrentMonth(dayjs(`${month.year}-${month.month + 1}-01`))
            }
            markedDates={markedDates}
            theme={{
              todayTextColor: "#16a34a",
              arrowColor: "#16a34a",
              selectedDayBackgroundColor: "#16a34a",
            }}
          />

          {/* 🔘 Task Preview */}
          <View style={styles.preview}>
            <Text style={styles.heading}>
              Tasks on {dayjs(selectedDate).format("DD MMM YYYY")}
            </Text>

            {tasksForSelectedDay.length === 0 && (
              <Text style={styles.empty}>No tasks</Text>
            )}

            {tasksForSelectedDay.map((task) => (
              <View key={task.id} style={styles.task}>
                <Text style={styles.taskTitle}>{task.title}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {/* 📆 AGENDA VIEW */}
      {view === "agenda" && (
        <View style={{ flex: 1, padding: 16 }}>
            {Object.entries(agendaItems).map(([date, items]: [string, Task[]]) => (
              <View key={date}>
                <Text style={styles.heading}>
                  {dayjs(date).format("DD MMM YYYY")}
                </Text>
                {items.map((task) => (
                  <View key={task.id} style={styles.agendaItem}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                  </View>
                ))}
              </View>
            ))}
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
  },

  toggle: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 8,
  },
  toggleBtn: {
    marginHorizontal: 16,
    fontSize: 16,
    color: "#6b7280",
  },
  active: {
    color: "#16a34a",
    fontWeight: "600",
  },

  preview: {
    padding: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  task: {
    padding: 12,
    backgroundColor: "#dcfce7",
    borderRadius: 8,
    marginBottom: 8,
  },
  taskTitle: {
    color: "#166534",
    fontSize: 14,
  },
  empty: {
    color: "#9ca3af",
  },

  agendaItem: {
    backgroundColor: "#dcfce7",
    padding: 12,
    marginRight: 16,
    marginTop: 8,
    borderRadius: 8,
  },
  emptyAgenda: {
    padding: 16,
  },
});
