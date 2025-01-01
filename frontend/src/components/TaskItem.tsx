import React, {useState} from "react";
import type { Task } from "src/api/tasks";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";
import { updateTask } from "src/api/tasks"; 

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task: initialTask }: TaskItemProps) {
    const [task, setTask] = useState<Task>(initialTask);
    const [isLoading, setLoading] = useState<boolean>(false);
    const textContainerClass = task.isChecked
    ? `${styles.textContainer} ${styles.checked}`
    : styles.textContainer;
    const handleToggleCheck = async () => {
        setLoading(true); 
        try {
          const updatedTask = await updateTask({
            _id: task._id,
            title: task.title,
            description: task.description,
            isChecked: !task.isChecked, 
            dateCreated: task.dateCreated,
          });
          if (updatedTask.success) {
            setTask(updatedTask.data); 
          } else {
            throw new Error(updatedTask.error || "Unknown error");
          }
        } catch (error) {
          alert("Failed to update the task. Please try again.");
        } finally {
          setLoading(false); 
        }
      };
  return (
    <div className={styles.item}>
      <div className={styles.checked}>
        <CheckButton checked={task.isChecked} onPress={handleToggleCheck} disabled={isLoading} />
      </div>
      <div className={textContainerClass}>
        <span className={styles.title}>{task.title}</span>
        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>
    </div>
  );
}