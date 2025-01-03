import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Page, TaskForm } from "src/components";
import { TaskItem } from "src/components";
import { TaskList } from "src/components";
import React, { useState, useEffect } from "react";
import type { Task } from "src/api/tasks";
import { getTask } from "src/api/tasks";
import { useParams } from "react-router-dom";
import styles from "./TaskDetail.module.css";
import type { User } from "src/api/users";

export function TaskDetail() {
    const [task, setTask] = useState<Task | null>(null); 
    const { id } = useParams<{ id: string }>();
    const [error, setError] = useState<string | null>(null); // State for error handling

    useEffect(() => {
      const fetchTask = async () => {
        if (id) {
          const result = await getTask(id);
          if (result.success) {
            setTask(result.data);
            setError(null);
          } else {
            setTask(null);
            setError("Task not found.");
          }
        }
      };
      fetchTask();
    }, [id]);
  
    if (error) {
      return (
        <div className={styles.container}>
          <Helmet>
            <title>Task not found | TSE Todos</title>
          </Helmet>
          <h1>Task not found</h1>
          <Link to="/">Back to home</Link>
        </div>
      );
    }
  
    if (!task) {
      return (
        <div className={styles.container}>
          <h1>Loading...</h1>
        </div>
      );
    }
  
    return (
      <div className={styles.container}>
        <Helmet>
          <title>{task.title} | TSE Todos</title>
        </Helmet>
        <Link to="/" className={styles.homeLink}>Back to home</Link>
        <h1 className={styles.title}>{task.title}</h1>
        <p className={styles.description}>{task.description || "No description provided."}</p>
        <div className={styles.details}>
          <p>
            <strong>Status:</strong> {task.isChecked ? "Done" : "Not done"}
          </p>
          <p>
            <strong>Date created:</strong> {task.dateCreated.toLocaleString()}
          </p>
        </div>
        <button className={styles.editButton}>Edit task</button>
      </div>
    );
}
