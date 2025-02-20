/* eslint-disable react/prop-types */
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import socket from "./Socket";
import UpdateTask from "./UpdateTask";
import { useState } from "react";

const TasksCard = ({ task }) => {
  //   console.log(task);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    marginBottom: "5px",
    border: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
  };

  // Delete Task
  const deleteTask = (taskId) => {
    // console.log(`Deleting task: ${taskId}`);
    if (!taskId) return console.error("Invalid Task ID");
    socket.emit("delete_task", taskId.toString()); // Ensure taskId is a string
  };

  // Modal and Task Update
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Open the modal and pass the task to be updated
  const openModal = (task) => {
    setSelectedTask(task); // Set the task data to be updated
    setIsModalOpen(true); // Open the modal
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedTask(null); // Reset selected task
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <small>📅 {new Date(task.timestamp).toLocaleString()}</small>
      <br />
      <button className="btn" onClick={() => deleteTask(task._id)}>
        🗑 Delete
      </button>
      <button className="btn" onClick={() => openModal(task)}>
        🗑 Update
      </button>

      {/* Show the modal if open */}
      {isModalOpen && (
        <UpdateTask task={selectedTask} closeModal={closeModal} />
      )}
    </div>
  );
};

export default TasksCard;
