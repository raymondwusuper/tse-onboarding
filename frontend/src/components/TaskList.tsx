import React, { useEffect, useState } from "react";
import { getAllTasks, type Task } from "src/api/tasks";
import { TaskItem } from "src/components";
import styles from "src/components/TaskList.module.css";

export interface TaskListProps {
  title: string;
}

export function TaskList({ title }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
        try {
          const response = await getAllTasks();
          if (response.success) {
            setTasks(response.data); 
          } else {
            alert("Failed to load tasks.");
          }
        } catch (error) {
          alert("Error fetching tasks: " + error); 
        }
      };
  
      fetchTasks();
  }, []);

  return (
    <div className={styles.listContainer}>
      <span className={styles.title}>{title}</span>
      <div className={styles.itemContainer}>
        {tasks.length === 0 ? (
          <p className={styles.emptyMessage}>No tasks yet. Add one above to get started.</p>
        ) : (tasks.map((task) => ( <li key={task._id} className={styles.taskItem}>
            <TaskItem task={task} />
          </li>
        )))}
      </div>
    </div>
  );
}