import { Task } from "@/types/calendar.types";
import { supabase } from "@/utils/supabase";
import dayjs from "dayjs";
import { useEffect, useState } from "react";


export const useTaskCalendar = () => {
     const [currentMonth, setCurrentMonth] = useState(dayjs());
      const [tasks, setTasks] = useState<Task[]>([]);
      const [markedDates, setMarkedDates] = useState<any>({});
      const [selectedDate, setSelectedDate] = useState<string>(
        dayjs().format("YYYY-MM-DD")
      );
      const [view, setView] = useState<"calendar" | "agenda">("calendar");
    
      async function load(month: dayjs.Dayjs) {
        const start = month.startOf("month").format("YYYY-MM-DD");
        const end = month.endOf("month").format("YYYY-MM-DD");
    
        const { data } = await supabase
          .from("tasks")
          .select("*")
          .gte("due_date", start)
          .lte("due_date", end);
    
        setTasks(data || []);
      }
    
      useEffect(() => {
        load(currentMonth);
      }, [currentMonth]);
    
      useEffect(() => {
        const marks: any = {};
    
        tasks.forEach((task) => {
          marks[task.due_date] = {
            marked: true,
            dotColor: "#16a34a",
          };
        });
    
        marks[selectedDate] = {
          ...(marks[selectedDate] || {}),
          selected: true,
          selectedColor: "#16a34a",
        };
    
        setMarkedDates(marks);
      }, [tasks, selectedDate]);
    
      const tasksForSelectedDay = tasks.filter(
        (t) => t.due_date === selectedDate
      );
    
      /* Convert tasks → Agenda format */
      const agendaItems: Record<string, Task[]> = tasks.reduce(
        (acc: Record<string, Task[]>, task: Task) => {
          if (!acc[task.due_date]) acc[task.due_date] = [];
          acc[task.due_date].push(task);
          return acc;
        },
        {}
      );

    return {
        currentMonth,
        setCurrentMonth,
        tasks,
        markedDates,
        selectedDate,
        setSelectedDate,
        view,
        setView,
        tasksForSelectedDay,
        agendaItems,
    };
    
}