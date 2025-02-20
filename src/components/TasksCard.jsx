/* eslint-disable react/prop-types */
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import socket from "./Socket";
import UpdateTask from "./UpdateTask";
import { useState } from "react";

const TasksCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task._id });

  // Delete Task
  const deleteTask = (taskId) => {
    if (!taskId) return console.error("Invalid Task ID");
    socket.emit("delete_task", taskId.toString());
  };

  // Modal and Task Update
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    marginBottom: "5px",
    border: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
    position: "relative", // Added for handle positioning
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {/* Dedicated drag handle */}
      <div
        className="drag-handle"
        {...listeners}
        style={{
          cursor: "grab",
          position: "absolute",
          top: "5px",
          right: "5px",
          padding: "5px",
        }}
      >
        🟰
      </div>

      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <small>📅 {new Date(task.timestamp).toLocaleString()}</small>
      <br />

      <button
        className="btn"
        onClick={(e) => {
          e.stopPropagation();
          deleteTask(task._id);
        }}
        style={{ marginRight: "8px", marginTop: "8px" }}
      >
        🗑 Delete
      </button>

      <button
        className="btn"
        onClick={(e) => {
          e.stopPropagation();
          openModal(task);
        }}
        style={{ marginTop: "8px" }}
      >
        📝 Update
      </button>

      {isModalOpen && selectedTask && (
        <UpdateTask task={selectedTask} closeModal={closeModal} />
      )}
    </div>
  );
};

export default TasksCard;
